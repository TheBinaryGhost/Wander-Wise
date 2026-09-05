import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const floatingAnimation = {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
};

const glowPulse = {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-amber-300/40 rounded-full blur-3xl"
                    animate={glowPulse}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"
                    animate={{ ...glowPulse, transition: { ...glowPulse.transition, delay: 1 } }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl"
                    animate={{ ...glowPulse, transition: { ...glowPulse.transition, delay: 2 } }}
                />
                {/* Floating orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
                    animate={floatingAnimation}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 3 } }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    className="inline-block bg-amber-100/80 backdrop-blur-sm text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-amber-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Start Planning Your Next Adventure
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    Your Journey, <br />
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Expertly Planned
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Create detailed itineraries, track your budget, and manage every detail of your trip — all in one beautiful platform.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                >
                    <Link to="/register">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all cursor-pointer"
                            >
                                Start Planning Free
                            </Button>
                        </motion.div>
                    </Link>
                    <Link to="/about">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-6 text-lg rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                                Learn More
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {[
                        { value: "10K+", label: "Trips Planned" },
                        { value: "50+", label: "Countries" },
                        { value: "4.9", label: "User Rating" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                        >
                            <div className="text-3xl md:text-4xl font-bold text-amber-500">{stat.value}</div>
                            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
