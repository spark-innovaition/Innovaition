document.addEventListener("DOMContentLoaded", () => {
    function createFloatingPaths(containerId, position) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Container needs relative context without disrupting GSAP
        if (window.getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }

        // Hardware-accelerated background wrapper
        const bgContainer = document.createElement("div");
        bgContainer.className = "floating-paths-container";
        bgContainer.style.position = "absolute";
        bgContainer.style.inset = "0";
        bgContainer.style.width = "100%";
        bgContainer.style.height = "100%";
        bgContainer.style.pointerEvents = "none";
        bgContainer.style.overflow = "hidden";
        bgContainer.style.zIndex = "0";
        bgContainer.style.transform = "translateZ(0)"; // Prevents UI stutter and repaints
        
        // Ensure the grid sits immediately above the paths securely
        const grid = container.querySelector('.contact-grid');
        if (grid) {
            grid.style.position = "relative";
            grid.style.zIndex = "10";
        }

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 696 316");
        svg.setAttribute("fill", "none");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svg.style.width = "100%";
        svg.style.height = "100%";

        for (let i = 0; i < 36; i++) {
            const path = document.createElementNS(svgNS, "path");
            const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;

            path.setAttribute("d", d);
            path.setAttribute("stroke", "currentColor");
            path.style.color = "rgba(255, 255, 255, 1)";
            path.setAttribute("stroke-width", 0.5 + i * 0.03);
            path.setAttribute("stroke-opacity", 0.1 + i * 0.03);
            
            // Normalize path length for highly performant CSS/GSAP dashoffset manipulation
            path.setAttribute("pathLength", "1");
            
            // Replicate the framer motion path drawing logic smoothly
            path.style.strokeDasharray = "1 1";
            
            svg.appendChild(path);

            // Animate using GSAP for buttery smooth cross-browser SVG animation 
            // bypassing standard CSS repaint bottlenecks
            if (typeof gsap !== "undefined") {
                const duration = 20 + Math.random() * 10;
                
                // Set initial framer motion state (drastically reduced opacity for readability)
                gsap.set(path, { opacity: 0.2, strokeDashoffset: 0.7 });

                // Flow the offset and gently pulse the opacity mimicking the array configuration 
                gsap.to(path, {
                    strokeDashoffset: "-1.3", // Flow over a full cycle seamlessly
                    duration: duration,
                    repeat: -1,
                    ease: "none"
                });

                gsap.to(path, {
                    opacity: 0.05,
                    duration: duration / 2, // F-Motion pulses twice per full loop
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"   // Smooth out the pulse
                });
            }
        }

        bgContainer.appendChild(svg);
        container.insertBefore(bgContainer, container.firstChild);
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
        createFloatingPaths("contact", 1);
        createFloatingPaths("contact", -1);
    }
});
