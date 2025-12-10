"use client";

export default function Scene3D() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-brand-navy">
            {/* Fallback Premium: CSS Animated Gradient (Aurora Effect) */}
            {/* Seguro, Performático e Visualmente Incrível sem WebGL */}

            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin-slow opacity-30">
                <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-brand-green mix-blend-screen blur-[100px] animate-pulse-slow will-change-transform" />
                <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-brand-blue mix-blend-screen blur-[100px] animate-pulse will-change-transform" style={{ animationDelay: "2s" }} />
                <div className="absolute bottom-[20%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-brand-navy mix-blend-overlay blur-[80px]" />
            </div>

            {/* Grid Overlay para dar textura técnica */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

            {/* Radial Vignette */}
            <div className="absolute inset-0 bg-radial-gradient-cover opacity-60" />
        </div>
    );
}
