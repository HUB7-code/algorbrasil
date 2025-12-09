export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-brand-navy">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-brand-navy/50 backdrop-blur-2xl pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    ALGOR &nbsp;
                    <code className="font-mono font-bold">Front-end V1</code>
                </p>
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-brand-green/20 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-brand-blue/20 after:via-brand-blue/20 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <h1 className="font-display text-5xl md:text-7xl font-bold text-center tracking-tight text-white mb-4">
                    INTELIGÊNCIA <span className="text-brand-green text-glow">VIVA</span>
                </h1>
            </div>
            <p className="text-center text-brand-blue font-mono mb-8 max-w-2xl">
                [SYSTEM STATUS: ONLINE] <br />
                Governança de IA . ISO 42001 . Bio-Digital Convergence
            </p>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-4">
                {["Estrategista", "Guardião", "Construtor", "Protetor"].map((persona) => (
                    <div key={persona} className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-brand-green/30 hover:bg-brand-navy/50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 glass-card cursor-pointer">
                        <h2 className={`mb-3 text-2xl font-semibold font-display text-white group-hover:text-brand-green transition-colors`}>
                            {persona}{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50 font-mono text-brand-blue`}>
                            Acesso ao Console.
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
