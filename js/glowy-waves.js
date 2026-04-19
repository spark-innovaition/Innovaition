document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("hero-waves-canvas");
    if (!canvas || window.innerWidth <= 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let time = 0;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const computeThemeColors = () => {
        const rootStyles = getComputedStyle(document.documentElement);
        
        const resolveColor = (vars, alpha = 1) => {
            for (const v of vars) {
                const val = rootStyles.getPropertyValue(v).trim();
                if (val && val !== "transparent") return val.includes('rgba') ? val : hexToRgba(val, alpha);
            }
            return `rgba(255, 255, 255, ${alpha})`; 
        };

        const hexToRgba = (hex, alpha) => {
            if (hex.startsWith('rgba')) return hex;
            if (hex.startsWith('var')) return hex; // Let CSS handle it if it's still a var
            let r=255, g=255, b=255;
            if (hex.startsWith('#')) {
                const h = hex.replace('#', '');
                r = parseInt(h.substring(0, 2), 16);
                g = parseInt(h.substring(2, 4), 16);
                b = parseInt(h.substring(4, 6), 16);
            }
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        return {
            backgroundTop: resolveColor(["--bg-dark"], 1),
            backgroundBottom: "rgba(13, 13, 13, 0.95)", // Subtle gradient match
            wavePalette: [
                { offset: 0, amplitude: 70, frequency: 0.003, color: "rgba(255, 255, 255, 0.8)", opacity: 0.25 },
                { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: "rgba(255, 255, 255, 0.7)", opacity: 0.2 },
                { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: "rgba(255, 255, 255, 0.65)", opacity: 0.15 },
                { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: "rgba(255, 255, 255, 0.25)", opacity: 0.1 },
                { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: "rgba(255, 255, 255, 0.2)", opacity: 0.05 },
            ]
        };
    };

    let themeColors = computeThemeColors();

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse = { x: canvas.width / 2, y: canvas.height / 2 };
        targetMouse = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", (e) => {
        targetMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("mouseleave", () => {
        targetMouse = { x: canvas.width / 2, y: canvas.height / 2 };
    });

    resizeCanvas();

    const drawWave = (wave) => {
        ctx.save();
        ctx.beginPath();

        const influenceRadius = 320;
        const mouseInfluence = 70;
        const smoothing = 0.1;

        for (let x = 0; x <= canvas.width; x += 4) {
            const dx = x - mouse.x;
            const dy = (canvas.height / 2) - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - distance / influenceRadius);
            
            const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

            const y = (canvas.height / 2) +
                Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
                Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
                mouseEffect;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity;
        ctx.stroke();
        ctx.restore();
    };

    const animate = () => {
        time += 1.5;
        mouse.x += (targetMouse.x - mouse.x) * 0.1;
        mouse.y += (targetMouse.y - mouse.y) * 0.1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background gradient to ensure seamless look
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, themeColors.backgroundTop);
        gradient.addColorStop(1, themeColors.backgroundBottom);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        themeColors.wavePalette.forEach(drawWave);
        animationId = requestAnimationFrame(animate);
    };

    animate();

    // GSAP Entry Animations
    if (typeof gsap !== "undefined") {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

        tl.from(".ph-badge", { y: 30, opacity: 0, duration: 1 }, 0.2)
          .from(".ph-title", { y: 40, opacity: 0 }, "-=0.8")
          .from(".ph-desc", { y: 20, opacity: 0 }, "-=1")
          .from(".ph-btn-group .btn-main, .ph-btn-group .btn-outline", { 
              y: 20, opacity: 0, stagger: 0.15 
          }, "-=0.8")
          .from(".ph-highlights li", { 
              y: 15, opacity: 0, stagger: 0.1 
          }, "-=0.6")
          .from(".ph-stats-card", { 
              scale: 0.95, opacity: 0, duration: 1.5
          }, "-=0.5")
          .from(".ph-stat-item", { 
              y: 20, opacity: 0, stagger: 0.1 
          }, "-=1");
    }
});
