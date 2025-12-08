/**
 * Algor Brasil - Neural Network Background Effect
 * Draws connecting particles simulating AI Synapses using HTML5 Canvas.
 */

const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const config = {
    particleCount: 140, // Dobrado para mais densidade
    connectionDistance: 160, // Alcance maior das conexões
    mouseDistance: 250,
    baseSpeed: 0.6, // Mais rápido (atividade cerebral intensa)
    colors: ['rgba(184, 115, 51, 1)', 'rgba(229, 193, 133, 1)', 'rgba(255, 255, 255, 0.8)'] // Mais opacidade e pontos brancos (sparks)
};

// Mouse State
const mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.baseSpeed;
        this.vy = (Math.random() - 0.5) * config.baseSpeed;
        this.size = Math.random() * 2.5 + 1.5; // Pontos maiores
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];

        // Pulso
        this.pulseSpeed = 0.05;
        this.pulseDir = 1;
        this.baseSize = this.size;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Pulse Effect (Sinapse disparando)
        this.size += this.pulseSpeed * this.pulseDir;
        if (this.size > this.baseSize + 1 || this.size < this.baseSize - 0.5) {
            this.pulseDir *= -1;
        }

        // Mouse interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.mouseDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (config.mouseDistance - distance) / config.mouseDistance;

                // Atração sutil em vez de repulsão (foco de atenção)
                const directionX = forceDirectionX * force * 0.8;
                const directionY = forceDirectionY * force * 0.8;

                this.x += directionX; // Move em direção ao mouse
                this.y += directionY;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
    }
}

function init() {
    resize();
    particles = [];
    // Adjust count - Mais denso em desktop
    const count = window.innerWidth < 768 ? 60 : config.particleCount;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
    animate();
}

function resize() {
    const parent = canvas.parentElement;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.connectionDistance) {
                ctx.beginPath();
                const opacity = 1 - (distance / config.connectionDistance);
                ctx.strokeStyle = `rgba(229, 193, 133, ${opacity * 0.6})`; // Gold lines mais fortes
                ctx.lineWidth = 1.2; // Linhas mais grossas
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    // Re-init particles on drastic resize to prevent clustering
    if (Math.abs(canvas.width - width) > 100) init();
});

// Start
document.addEventListener('DOMContentLoaded', init);
