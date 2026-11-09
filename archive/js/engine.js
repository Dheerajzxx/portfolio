let scene, camera, renderer, systemCoreParticleOrb;

function init3DEnvironment() {
    const canvasContainer = document.getElementById('webgl-canvas');
    if (!canvasContainer) return;

    // Create Scene with exponential fog depth
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.02);

    // Camera Configuration 
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7.5;

    // High Performance WebGL Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvasContainer, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Mathematical Generation of Futuristic Vector Points Grid
    const pointCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount * 3; i += 3) {
        const phi = Math.acos(2.0 * Math.random() - 1.0);
        const theta = Math.sqrt(pointCount * Math.PI) * phi;
        const radius = 2.8 + (Math.random() * 0.5);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material Styling for Core Glowing Spatial Vectors
    const material = new THREE.PointsMaterial({
        color: 0x06b6d4, // Cyan Default Core
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    systemCoreParticleOrb = new THREE.Points(geometry, material);
    scene.add(systemCoreParticleOrb);

    // Resize Listeners & Animation Frame Loops
    window.addEventListener('resize', handleViewportResize);
    executeFrameRenderLoop();
}

function executeFrameRenderLoop() {
    requestAnimationFrame(executeFrameRenderLoop);

    if (systemCoreParticleOrb) {
        // Continuous organic axis movements
        systemCoreParticleOrb.rotation.y += 0.0012;
        systemCoreParticleOrb.rotation.x += 0.0004;

        // Oscillate geometry size via sine wave vectors for a pulsing engine appearance
        const elapsedSecs = Date.now() * 0.0015;
        const uniformPulse = 1.0 + Math.sin(elapsedSecs) * 0.04;
        systemCoreParticleOrb.scale.set(uniformPulse, uniformPulse, uniformPulse);
    }

    renderer.render(scene, camera);
}

function handleViewportResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialise on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DEnvironment);
} else {
    init3DEnvironment();
}
