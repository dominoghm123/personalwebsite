'use client';
// 🎓 这里的设计决策：必须标记 'use client'，因为 Canvas 需要浏览器 DOM API (useRef, useEffect)，
// 而 Server Components 无法访问 window/document 对象。

import { useRef, useEffect, useCallback } from 'react';
import styles from './SandCanvas.module.css';

// ────────────────────────────────────────────────────────
// 🎓 Particle 类
// 来源：design-preview.html 第 1246-1313 行，1:1 迁移
// 核心特性：
//   1. 每个粒子有 weight 属性模拟「深层沙 vs 表面沙」
//   2. 鼠标靠近时推开粒子，weight 低的（深层沙）几乎不动
//   3. 布朗运动 (Brownian motion) 让空白区域缓慢自愈
// ────────────────────────────────────────────────────────
class Particle {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    size: number = 0;
    color: string = '';
    alpha: number = 0;
    originAlpha: number = 0;
    weight: number = 0;

    constructor(private canvasWidth: number, private canvasHeight: number) {
        this.init();
    }

    init() {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.0005;
        this.vy = (Math.random() - 0.5) * 0.0005;
        this.size = Math.random() * 1.5 + 0.5;

        // 🎓 这里的设计决策：颜色取自 design-preview.html，淡绿/淡蓝色系
        // 与 --color-accent (#B8D4B8) 同色域，保持视觉统一
        const colors = ['#B5EAD7', '#BDE0FE', '#9ED2C6', '#A2D2FF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // 🎓 这里的设计决策：alpha 0.35~0.75 范围，既不透明到抢眼，也不至于看不见
        this.alpha = Math.random() * 0.4 + 0.35;
        this.originAlpha = this.alpha;

        // 🎓 这里的设计决策：weight 使用 random² 分布，让大部分粒子偏「深层」
        // 这样鼠标推开表面沙时，底层沙仍然可见，不会出现空洞
        this.weight = Math.random() * Math.random();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update(mouse: { x: number; y: number }, time: number) {
        // 🎓 缓慢的波动运动，让沙面有「呼吸感」
        const wave = Math.sin(this.x * 0.003 + time * 0.2) * 0.015;
        this.vx += wave;
        this.vy += Math.cos(this.y * 0.003 + time * 0.2) * 0.015;

        // 🎓 鼠标推力：150px 半径内的粒子被推开，force 与距离成反比
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150;
            // 🎓 weight 确保深层沙几乎不受影响
            this.vx -= (dx / dist) * force * 1.15 * this.weight;
            this.vy -= (dy / dist) * force * 1.15 * this.weight;
            // 🎓 碰撞处透明度提升 (PRD 3.1 要求)
            this.alpha = Math.min(1.0, this.alpha + 0.1);
        } else {
            this.alpha = Math.max(this.originAlpha, this.alpha - 0.05);
        }

        // 🎓 布朗运动：随机微扰让空白区域缓慢自愈
        this.vx += (Math.random() - 0.5) * 0.05;
        this.vy += (Math.random() - 0.5) * 0.05;

        this.x += this.vx;
        this.y += this.vy;

        // 🎓 高摩擦力，模拟沙子的黏滞感
        this.vx *= 0.8;
        this.vy *= 0.8;

        // 🎓 环绕边界，模拟无限沙面
        if (this.x < -20) this.x = this.canvasWidth + 20;
        if (this.x > this.canvasWidth + 20) this.x = -20;
        if (this.y < -20) this.y = this.canvasHeight + 20;
        if (this.y > this.canvasHeight + 20) this.y = -20;
    }
}

// ────────────────────────────────────────────────────────
// 🎓 CanvasButterfly 类 (尾迹蝴蝶，非首页 SVG 蝴蝶)
// 来源：design-preview.html 第 1315-1352 行
// 注意：这是鼠标移动时产生的「碎蝶尾迹」效果，
// 与首页的两只大 SVG 蝴蝶是完全不同的组件。
// ────────────────────────────────────────────────────────
class CanvasButterfly {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    wingSpeed: number;
    wingPhase: number;

    constructor(x: number, y: number, mouseVx: number, mouseVy: number) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 2 + mouseVx * 0.1;
        this.vy = (Math.random() - 0.5) * 2 + mouseVy * 0.1 - 1; // slight upward drift
        this.size = Math.random() * 3 + 3;
        this.life = 1.0;
        this.wingSpeed = Math.random() * 0.3 + 0.2;
        this.wingPhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.015;
        this.wingPhase += this.wingSpeed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = '#C8C2E7'; // 🎓 --color-primary，保持品牌色统一

        const wingStretch = Math.max(0.2, Math.abs(Math.sin(this.wingPhase)));

        // Left wing
        ctx.beginPath();
        ctx.ellipse(-this.size / 2, 0, this.size * wingStretch, this.size, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        // Right wing
        ctx.beginPath();
        ctx.ellipse(this.size / 2, 0, this.size * wingStretch, this.size, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// ────────────────────────────────────────────────────────
// 🎓 Ripple 涟漪效果
// 鼠标移动时随机产生淡紫色扩散圆环
// ────────────────────────────────────────────────────────
interface Ripple {
    x: number;
    y: number;
    r: number;
    o: number;
}

// ============================================================
// 🎓 SandCanvas React Component
// 整个动画引擎封装在一个 Client Component 中
// 核心映射关系：
//   design-preview.html → SandCanvas.tsx
//   <canvas id="ripple-canvas"> → <canvas ref={canvasRef}>
//   window.addEventListener('resize') → useEffect cleanup
//   animate() → requestAnimationFrame loop
// ============================================================
export default function SandCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 🎓 这里的设计决策：使用 useRef 存储动画状态而非 useState
    // 因为 5000+ 粒子每帧更新，如果用 setState 会触发 React 重渲染，
    // 导致严重性能问题。useRef 直接操作内存，不触发虚拟 DOM diff。
    const particlesRef = useRef<Particle[]>([]);
    const butterfliesRef = useRef<CanvasButterfly[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
    const lastMouseRef = useRef({ x: -1000, y: -1000 });
    const timeRef = useRef(0);
    const animIdRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        // 🎓 密度公式来自 design-preview.html 第 1358 行
        // 面积 / 130 = 大约 5000~15000 个粒子（取决于屏幕尺寸）
        const count = (width * height) / 130;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(width, height));
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ── Resize Handler ──
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesRef.current = initParticles(canvas.width, canvas.height);
            butterfliesRef.current = [];
        };

        // ── Mouse Handler ──
        const handleMouseMove = (e: MouseEvent) => {
            const mouse = mouseRef.current;
            const lastMouse = lastMouseRef.current;

            mouse.vx = e.clientX - lastMouse.x;
            mouse.vy = e.clientY - lastMouse.y;
            lastMouse.x = mouse.x = e.clientX;
            lastMouse.y = mouse.y = e.clientY;

            // 🎓 20% 几率产生涟漪，50% 几率产生碎蝶，与原版一致
            if (Math.random() > 0.8) {
                ripplesRef.current.push({ x: e.clientX, y: e.clientY, r: 2, o: 0.3 });
            }
            if (Math.random() > 0.5) {
                butterfliesRef.current.push(
                    new CanvasButterfly(e.clientX, e.clientY, mouse.vx, mouse.vy)
                );
            }
        };

        // ── Animation Loop ──
        const animate = () => {
            timeRef.current += 0.005;
            // 🎓 背景色使用 #FAF9F7 而非纯白，匹配 --color-bg 的暖白色调
            ctx.fillStyle = '#faf9f5';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw particles
            const mouse = mouseRef.current;
            const time = timeRef.current;
            particlesRef.current.forEach(p => {
                p.update(mouse, time);
                p.draw(ctx);
            });

            // Draw ripples
            const ripples = ripplesRef.current;
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.r += 1.2;
                r.o -= 0.005;
                if (r.o <= 0) {
                    ripples.splice(i, 1);
                    continue;
                }
                for (let j = 0; j < 2; j++) {
                    ctx.beginPath();
                    ctx.arc(r.x, r.y, r.r + j * 15, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(200, 194, 231, ${r.o / (j + 1)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Draw butterflies
            const bflies = butterfliesRef.current;
            for (let i = bflies.length - 1; i >= 0; i--) {
                const b = bflies[i];
                b.update();
                b.draw(ctx);
                if (b.life <= 0) {
                    bflies.splice(i, 1);
                }
            }

            ctx.globalAlpha = 1;
            animIdRef.current = requestAnimationFrame(animate);
        };

        // ── Initialize ──
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        // 🎓 这里的设计决策：清理函数，防止路由切换后内存泄漏
        // 如果不取消 requestAnimationFrame，Canvas 会在后台持续渲染
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animIdRef.current);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
        />
    );
}
