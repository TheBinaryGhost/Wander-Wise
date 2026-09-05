import { DollarSign, Map, Package } from "lucide-react";

const Features = () => {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Everything You Need to <span className="text-amber-500">Travel Smart</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Powerful tools designed to make every trip seamless from departure to return.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
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
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="group p-8 rounded-2xl border border-slate-200 hover:border-amber-200 hover:shadow-xl transition-all duration-300 bg-white"
                        >
                            <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${feature.color} ${feature.hover}`}
                            >
                                <feature.icon className="w-7 h-7 text-current" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
