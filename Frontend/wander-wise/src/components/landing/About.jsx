import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const checkItems = [
    "Intuitive trip planning interface",
    "Real-time budget management",
    "Smart packing recommendations",
    "Collaborative trip sharing",
];

const cards = [
    { emoji: "🌍", title: "Explore", desc: "Discover new places", bg: "bg-amber-50" },
    { emoji: "📊", title: "Track", desc: "Monitor budgets", bg: "bg-orange-50" },
    { emoji: "📋", title: "Organize", desc: "Plan everything", bg: "bg-red-50" },
    { emoji: "✈️", title: "Travel", desc: "Enjoy your trip", bg: "bg-green-50" },
];

const About = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-amber-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block bg-amber-100/80 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-amber-200/50">
                            About WanderWise
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                            Travel with <span className="text-amber-500">Confidence</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            WanderWise was built by travelers, for travelers. We understand the
                            stress of planning trips, managing budgets, and keeping track of
                            every detail. Our mission is to make travel planning effortless.
                        </p>

                        <div className="space-y-4">
                            {checkItems.map((item, i) => (
                                <motion.div
                                    key={item}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                >
                                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Visual */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                            <div className="grid grid-cols-2 gap-4">
                                {cards.map((card, i) => (
                                    <motion.div
                                        key={card.title}
                                        className={`${card.bg} rounded-2xl p-6 text-center`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -4 }}
                                    >
                                        <div className="text-3xl font-bold mb-1">{card.emoji}</div>
                                        <p className="text-sm font-semibold text-slate-700">{card.title}</p>
                                        <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {/* Decorative blobs */}
                        <motion.div
                            className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
