// Grounded Production Datasets straight from your Resume
const productionBuildMatrix = {
    government: {
        title: "Administrative Systems & Public Sector Nodes",
        colorHex: 0x22d3ee, // Cyan
        projects: [
            { name: "Qatar Land Portal (QREC)", link: "https://qrec.gov.qa", desc: "Architected user panel, admin engine panel, and resilient operational APIs. Secured automated deployment architecture via streamlined GitHub CI/CD workflows." },
            { name: "Rytu Setu Infrastructure", link: "https://rytusetu.in", desc: "Engineered performant backend framework leveraging Node.js/Express mixed with a PostgreSQL structural architecture, backed by a cutting-edge Next.js 16 control terminal dashboard." },
            { name: "BBMP Lakes & Parks Integration", link: "https://bbmpgov.org", desc: "Successfully mapped local infrastructure modules utilizing robust Google Maps integration architectures for public asset visualization." }
        ]
    },
    ecommerce: {
        title: "Enterprise E-Commerce & Financial Gateways",
        colorHex: 0x10b981, // Emerald Green
        projects: [
            { name: "Jawata Tech Marketplace", link: "https://scriblette.com", desc: "Assembled a full-stack platform processing accessories rental with core structural parameters: custom deposit vaults, digital contracts, and complex installment checkout engines." },
            { name: "Dance Beat Academy Portal", link: "https://dancebeatacademy.com", desc: "Configured an elegant booking engine containing checkout flows, dynamic calendar scheduler slots, and customized item gifting pipelines." },
            { name: "Nearshack Ecosystem", link: "N/A", desc: "Constructed comprehensive cross-functional architectures comprising specialized Buyer, Seller, and automated Delivery apps tied back to a central master administrative dashboard." }
        ]
    },
    healthcare: {
        title: "Medical Architectures & Artificial Intelligence Control Blocks",
        colorHex: 0xa855f7, // Deep Purple
        projects: [
            { name: "ComplyAssist Tax Engine", link: "https://complyassist.io", desc: "Built an AI-driven automated Virtual CA workspace. Programmed parsing intelligence engines that instantly identify upcoming tax liabilities from standard raw business asset logs." },
            { name: "Medikonet Architecture", link: "N/A", desc: "Assembled custom Hospital Management Systems containing modules running Pharmacy automation workflows, real-time diagnostic logs, and patient records data stores." },
            { name: "PrismH & Tree Canopy (ARTPARK)", link: "https://artpark.ai", desc: "Shipped highly resilient PWA solutions targeting field employees for offline-capable task synchronization, backed by robust map tracing networks." }
        ]
    },
    events: {
        title: "Mass Scale Event Networks & Identity Scanner Automations",
        colorHex: 0xf59e0b, // Amber
        projects: [
            { name: "BIFFES Film Festival, Bengaluru", link: "https://biffes.org", desc: "Engineered critical high-traffic framework handles thousands of user registrations, secure payments processing, digital QR identification card generation, and low-latency hardware QR scanner APIs." },
            { name: "Awwsummm Platform", link: "https://awwsummm.com", desc: "Developed microservice structures handling immediate seat processing, concurrent transactional lock loops, and rapid barcode tickets distribution." },
            { name: "Kannada Sahithya Parishattu", link: "N/A", desc: "Deployed integrated portal controlling regional member registrations, active meeting scheduler slots, and structured fee collection architectures." }
        ]
    }
};

// Tactical Sector Data Query Processor
function querySector(sectorKey) {
    const viewer = document.getElementById('terminal-content');
    const data = productionBuildMatrix[sectorKey];

    if (!data || !viewer) return;

    // Shift 3D Core Viewport Depth parameters dynamically on every select
    const targetZDepth = sectorKey === 'government' ? 5.8 : sectorKey === 'ecommerce' ? 5.0 : sectorKey === 'healthcare' ? 4.5 : 6.2;
    if (camera) camera.position.z = targetZDepth;

    // Shift 3D Core Color Properties based on the active structural focus
    if (systemCoreParticleOrb) systemCoreParticleOrb.material.color.setHex(data.colorHex);

    // Build Project Cluster HTML Cards dynamically
    let projectCardsHTML = "";
    data.projects.forEach(proj => {
        const functionalLink = proj.link !== "N/A" ? `<a href="${proj.link}" target="_blank" class="text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors">${proj.name} ↗</a>` : `<span class="text-slate-400 font-bold">${proj.name} [Internal Secure Node]</span>`;
        
        projectCardsHTML += `
            <div class="bg-slate-950/90 border border-slate-800/80 p-3 rounded-md space-y-1">
                <div class="flex justify-between items-center text-[11px]">
                    ${functionalLink}
                    <span class="text-[9px] uppercase px-1 bg-slate-900 border border-slate-700 text-slate-400 rounded">ENV: Production</span>
                </div>
                <p class="text-slate-400 text-[11px] leading-relaxed">${proj.desc}</p>
            </div>
        `;
    });

    // Populate Viewer Console using strict scannable structural frames
    viewer.innerHTML = `
        <div class="animate-scanline space-y-3">
            <div>
                <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wide flex justify-between">
                    <span>${data.title}</span>
                    <span class="text-emerald-400 text-[9px] bg-emerald-500/10 px-1.5 rounded py-0.5 border border-emerald-500/20">SYSTEM QUERY COMPLETE</span>
                </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                ${projectCardsHTML}
            </div>
        </div>
    `;
}

// Keep static overlay clock processing in real-time UTC standard
setInterval(() => {
    const clock = document.getElementById('live-clock');
    if (clock) {
        const timeInstance = new Date();
        clock.innerText = `TIMESTAMP: ${timeInstance.getUTCFullYear()}-${String(timeInstance.getUTCMonth()+1).padStart(2,'0')}-${String(timeInstance.getUTCDate()).padStart(2,'0')} ${String(timeInstance.getUTCHours()).padStart(2,'0')}:${String(timeInstance.getUTCMinutes()).padStart(2,'0')}:${String(timeInstance.getUTCSeconds()).padStart(2,'0')} UTC`;
    }
}, 1000);
