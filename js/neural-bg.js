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
    particleCount: 60, // Quantidade de pontos
    connectionDistance: 150, // Distância para conectar
    mouseDistance: 200, // Raio de interação do mouse
    baseSpeed: 0.3, // Velocidade de movimento
    colors: ['rgba(184, 115, 51, 0.7)', 'rgba(229, 193, 133, 0.7)'] // Copper & Gold
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
        this.size = Math.random() * 2 + 1;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (Repell slightly)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.mouseDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (config.mouseDistance - distance) / config.mouseDistance;
                const directionX = forceDirectionX * force * 0.5; // Smooth repel
                const directionY = forceDirectionY * force * 0.5;

                this.vx -= directionX;
                this.vy -= directionY;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function init() {
    resize();
    particles = [];
    // Adjust particle count based on screen size
    const count = window.innerWidth < 768 ? 30 : config.particleCount;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
    animate();
}

function resize() {
    // Canvas deve ocupar o container pai (Hero Section)
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
                // Opacidade baseada na distância (mais perto = mais visível)
                const opacity = 1 - (distance / config.connectionDistance);
                ctx.strokeStyle = `rgba(184, 115, 51, ${opacity * 0.4})`; // Copper lines
                ctx.lineWidth = 1;
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
