import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                    Start Planning Your Next Adventure
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-6 tracking-tight">
                    Your Journey, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                        Expertly Planned
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Create detailed itineraries, track your budget, and manage every detail of your trip — all in one beautiful platform.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/register">
                        <Button
                            size="lg"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
                        >
                            Start Planning Free
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 py-6 text-lg rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                            Learn More
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                    {[
                        { value: "10K+", label: "Trips Planned" },
                        { value: "50+", label: "Countries" },
                        { value: "4.9", label: "User Rating" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-amber-500">{stat.value}</div>
                            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
