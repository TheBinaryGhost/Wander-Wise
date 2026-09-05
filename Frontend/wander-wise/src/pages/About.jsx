import { Link } from "react-router-dom";
import { CheckCircle, Globe, Heart, Shield, Users } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            {/* Hero */}
            <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        Our Story
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                        About <span className="text-amber-500">WanderWise</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        We believe travel should be about the experience, not the stress of planning.
                        WanderWise was born from a simple idea: make trip planning effortless.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            WanderWise was built by travelers, for travelers. We understand the
                            overwhelm of planning trips, managing budgets, and keeping track of
                            every detail. Our mission is to give you one beautiful platform where
                            everything just works.
                        </p>
                        <div className="space-y-3">
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
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: Globe, label: "Explore", desc: "Discover new places", color: "bg-amber-50 text-amber-600" },
                            { icon: Shield, label: "Track", desc: "Monitor budgets", color: "bg-orange-50 text-orange-600" },
                            { icon: Heart, label: "Organize", desc: "Plan everything", color: "bg-red-50 text-red-600" },
                            { icon: Users, label: "Share", desc: "Travel together", color: "bg-green-50 text-green-600" },
                        ].map((item) => (
                            <div key={item.label} className={`${item.color} rounded-2xl p-6 text-center`}>
                                <item.icon className="w-8 h-8 mx-auto mb-3" />
                                <p className="font-bold text-slate-800">{item.label}</p>
                                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
                        Why Choose <span className="text-amber-500">WanderWise</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Simple & Beautiful", desc: "A clean, intuitive interface that makes planning feel like part of the adventure, not a chore." },
                            { title: "All-in-One", desc: "Itineraries, budgets, packing lists, and more — everything you need in a single platform." },
                            { title: "Built for Travelers", desc: "We travel too. Every feature is designed from real travel experience and genuine need." },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-slate-600 mb-8">
                        Join thousands of travelers who plan smarter with WanderWise.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                    >
                        Get Started Free
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default About;
