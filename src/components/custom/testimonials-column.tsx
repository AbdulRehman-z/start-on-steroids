interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        quote:
            "This platform completely transformed how we handle our backend infrastructure. It's simply the best.",
        author: "Sarah Chen",
        role: "CTO at TechFlow",
    },
    {
        quote:
            "The ease of use and the modern UI are unmatched. I can't imagine going back to our old tools.",
        author: "Alex Morgan",
        role: "Product Manager",
    },
    {
        quote:
            "Incredible performance and reliability. It scales effortlessly with our growing user base.",
        author: "James Wilson",
        role: "Lead Engineer",
    },
    {
        quote:
            "Support is top-notch, and the community is super helpful. Highly recommended for any startup.",
        author: "Emily Davis",
        role: "Founder at StartupX",
    },
    {
        quote:
            "A game-changer for our development workflow. We've cut our deployment time by half.",
        author: "Michael Brown",
        role: "DevOps Engineer",
    },
];

export function TestimonialsColumn() {
    return (
        <div className="relative hidden h-full flex-col justify-center overflow-hidden bg-zinc-900 p-10 text-white lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black opacity-80" />
            <div className="absolute inset-0 bg-[url('/assets/auth-image.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />

            <div className="relative z-20 mb-10 flex items-center text-lg font-medium tracking-tight">
                <GalleryVerticalEndIcon className="mr-2 h-6 w-6" />
                Acme Inc
            </div>

            <div className="relative z-20 h-[500px] overflow-hidden mask-image-gradient">
                <div className="animate-marquee-vertical flex flex-col gap-6 py-4">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="group relative rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10"
                        >
                            <p className="mb-4 text-xl font-light leading-relaxed tracking-wide text-zinc-100/90 font-serif italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <footer className="flex flex-col gap-1">
                                <cite className="not-italic text-sm font-medium text-white tracking-wide uppercase opacity-80">
                                    {t.author}
                                </cite>
                                <span className="text-xs text-zinc-400 font-mono tracking-tighter uppercase">{t.role}</span>
                            </footer>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
				.mask-image-gradient {
					mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
				}
				@keyframes marquee-vertical {
					from { transform: translateY(0); }
					to { transform: translateY(-50%); }
				}
				.animate-marquee-vertical {
					animation: marquee-vertical 60s linear infinite;
				}
				.animate-marquee-vertical:hover {
					animation-play-state: paused;
				}
			`}</style>
        </div>
    );
}

import { GalleryVerticalEndIcon } from "lucide-react";
