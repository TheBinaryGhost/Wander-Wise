import { CheckCircle } from "lucide-react";

const About = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-amber-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
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
                            {[
                                "Intuitive trip planning interface",
                                "Real-time budget management",
                                "Smart packing recommendations",
                                "Collaborative trip sharing",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Visual */}
                    <div className="relative">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-amber-50 rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-amber-500 mb-1">🌍</div>
                                    <p className="text-sm font-semibold text-slate-700">Explore</p>
                                    <p className="text-xs text-slate-500 mt-1">Discover new places</p>
                                </div>
                                <div className="bg-orange-50 rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-orange-500 mb-1">📊</div>
                                    <p className="text-sm font-semibold text-slate-700">Track</p>
                                    <p className="text-xs text-slate-500 mt-1">Monitor budgets</p>
                                </div>
                                <div className="bg-red-50 rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-red-500 mb-1">📋</div>
                                    <p className="text-sm font-semibold text-slate-700">Organize</p>
                                    <p className="text-xs text-slate-500 mt-1">Plan everything</p>
                                </div>
                                <div className="bg-green-50 rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-green-500 mb-1">✈️</div>
                                    <p className="text-sm font-semibold text-slate-700">Travel</p>
                                    <p className="text-xs text-slate-500 mt-1">Enjoy your trip</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl" />
                        <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
