import { DollarSign, Map, Package } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Map,
        title: "Smart Itineraries",
        description:
            "Plan every day of your trip with detailed schedules, activities, and notes. Keep everything organized in one place.",
        color: "bg-amber-100 text-amber-600",
        hover: "group-hover:bg-amber-500",
    },
    {
        icon: DollarSign,
        title: "Budget Tracking",
        description:
            "Monitor your spending in real-time. Set budgets, log expenses, and never overspend on your journey.",
        color: "bg-orange-100 text-orange-600",
        hover: "group-hover:bg-orange-500",
    },
    {
        icon: Package,
        title: "Smart Packing",
        description:
            "Never forget essentials. Our intelligent packing lists adapt to your destination, weather, and trip duration.",
        color: "bg-red-100 text-red-600",
        hover: "group-hover:bg-red-500",
    },
];

const Features = () => {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Everything You Need to <span className="text-amber-500">Travel Smart</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Powerful tools designed to make every trip seamless from departure to return.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            className="group p-8 rounded-2xl border border-slate-200 hover:border-amber-200 hover:shadow-xl transition-all duration-300 bg-white"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <motion.div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${feature.color} ${feature.hover}`}
                                whileHover={{ rotate: 10, scale: 1.1 }}
                            >
                                <feature.icon className="w-7 h-7 text-current" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
