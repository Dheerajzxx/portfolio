let scene, camera, renderer, systemNebula;
let nodesArray = [];
let raycaster = new THREE.Raycaster();
let mouseVector = new THREE.Vector2();

// Grounded project data from your resume
const experienceMatrix = [
    { key: "gov", label: "GOVERNMENT", color: 0x22d3ee, x: -3.5, y: 1.5, details: "<strong>Qatar Land Portal & Rytu Setu:</strong> Custom Node.js/PostgreSQL platforms, Next.js 16 frameworks, and public dashboard metrics deployed via rigid GitHub Actions CI loops." },
    { key: "ecom", label: "E-COMMERCE", color: 0x10b981, x: 3.5, y: 1.5, details: "<strong>Jawata & Dance Beat:</strong> Scaled digital contract engines, transaction processing pipelines, dynamic rental installment frameworks, and verified payment setups." },
    { key: "health", label: "HEALTH & AI", color: 0xa855f7, x: -2.5, y: -2.0, details: "<strong>ComplyAssist & Medikonet:</strong> AI-powered tax liability automation engines and full-scale hospital management diagnostics panels built alongside offline-first PWAs." },
    { key: "events", label: "MASS EVENTS", color: 0xf59e0b, x: 2.5, y: -2.0, details: "<strong>BIFFES Film Festival & Awwsummm:</strong> Shipped low-latency QR attendance scanning architectures, dynamic ticket generation web engines, and heavy traffic handling platforms." }
];

function initSpatialScene() {
    // 1. Core Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.03);

    // 2. Camera Configuration
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // 3. Renderer Initialisation
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3d-scene'), antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Build Ambient Cosmic Particle Nebula
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 25;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x1e293b,
        size: 0.04,
        transparent: true,
        opacity: 0.6
    });
    systemNebula = new THREE.Points(geometry, particleMaterial);
    scene.add(systemNebula);

    // 5. Build Interactive 3D Mesh Nodes
    experienceMatrix.forEach(nodeData => {
        // Core glowing orb mesh
        const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: nodeData.color,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(nodeData.x, nodeData.y, 0);
        mesh.userData = nodeData; // Bind source context

        // Add subtle accent ring mesh around the node
        const ringGeo = new THREE.RingGeometry(0.65, 0.7, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: nodeData.color, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        mesh.add(ringMesh);

        scene.add(mesh);
        nodesArray.push(mesh);
    });

    // 6. Global Interactive Event Triggers
    window.addEventListener('resize', onViewportResize);
    window.addEventListener('click', handleNodeRaycastClick);
    window.addEventListener('mousemove', handleNodeHoverEffect);

    executeRenderLoop();
}

// Frame Animation Pipeline
function executeRenderLoop() {
    requestAnimationFrame(executeRenderLoop);

    // Smooth ambient system rotation
    if (systemNebula) {
        systemNebula.rotation.y += 0.0003;
    }

    nodesArray.forEach(node => {
        node.rotation.y += 0.005;
        node.rotation.x += 0.002;
    });

    renderer.render(scene, camera);
}

// Raycaster Clicking Logic
function handleNodeRaycastClick(event) {
    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseVector, camera);
    const intersectedObjects = raycaster.intersectObjects(nodesArray);

    const displayContainer = document.getElementById('sector-display');

    if (intersectedObjects.length > 0) {
        const selectedNode = intersectedObjects[0].object;
        const data = selectedNode.userData;

        // Animate 3D Camera Focus position directly toward the selected vector node
        camera.position.set(data.x * 0.7, data.y * 0.7, 4.5);

        // Inject dynamic project metadata directly into the clean HUD layout
        displayContainer.classList.remove('hidden');
        setTimeout(() => displayContainer.classList.add('active-view'), 50);
        
        displayContainer.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <h3 class="text-xs font-bold uppercase tracking-wider" style="color: ${data.color.toString(16).padStart(6, '0')}">${data.label} ARCHITECTURE CORE</h3>
                <button onclick="resetCameraFocus(event)" class="text-slate-500 hover:text-slate-300 text-[10px] tracking-widest uppercase border border-slate-800 px-1.5 py-0.5 rounded bg-black/40">CLOSE ✕</button>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed font-mono">${data.details}</p>
        `;
    }
}

// Reset view controller helper
window.resetCameraFocus = function(event) {
    if(event) event.stopPropagation(); // Avoid triggering raycast click again
    const displayContainer = document.getElementById('sector-display');
    
    displayContainer.classList.remove('active-view');
    setTimeout(() => displayContainer.classList.add('hidden'), 400);

    // Snap back camera system instantly
    camera.position.set(0, 0, 8);
};

// Hover State Interactive Micro-feedbacks
function handleNodeHoverEffect(event) {
    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseVector, camera);
    const intersects = raycaster.intersectObjects(nodesArray);

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        // Subtle wireframe lighting expansion
        intersects[0].object.scale.set(1.15, 1.15, 1.15);
    } else {
        document.body.style.cursor = 'default';
        nodesArray.forEach(node => node.scale.set(1, 1, 1));
    }
}

function onViewportResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Live Real-Time Dynamic Clock Processing
setInterval(() => {
    const element = document.getElementById('utc-clock');
    if (element) {
        const time = new Date();
        element.innerText = `TIMESTAMP: ${time.getUTCFullYear()}-${String(time.getUTCMonth()+1).padStart(2,'0')}-${String(time.getUTCDate()).padStart(2,'0')} ${String(time.getUTCHours()).padStart(2,'0')}:${String(time.getUTCMinutes()).padStart(2,'0')}:${String(time.getUTCSeconds()).padStart(2,'0')} UTC`;
    }
}, 1000);

// Initialize on DOM load completion
document.addEventListener('DOMContentLoaded', initSpatialScene);
