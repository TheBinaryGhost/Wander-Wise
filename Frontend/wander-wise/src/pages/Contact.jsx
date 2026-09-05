import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            {/* Hero */}
            <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                        Contact <span className="text-amber-500">Us</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Have questions about WanderWise? Want to share feedback or need support?
                        We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="max-w-6xl mx-auto px-4 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Mail, label: "Email", value: "hello@wanderwise.com", color: "bg-amber-500" },
                        { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "bg-orange-500" },
                        { icon: MapPin, label: "Office", value: "San Francisco, CA", color: "bg-red-500" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                            <div className={`${item.color} text-white p-3 rounded-xl`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                                <p className="text-slate-800 font-semibold">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Form + Map placeholder */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Send a Message</h2>
                        <p className="text-slate-500 mb-8">Fill out the form below and we'll respond within 24 hours.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help?"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell us more about your inquiry..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Side panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                            <ul className="space-y-3">
                                {[
                                    "Trip planning assistance",
                                    "Technical support",
                                    "Partnership inquiries",
                                    "Bug reports & feedback",
                                    "Account issues",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                                        <span className="text-amber-50">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Quick Support</h3>
                            <p className="text-slate-500 text-sm mb-4">
                                For urgent issues, check our FAQ section or reach out on social media for faster response times.
                            </p>
                            <div className="flex gap-3">
                                {["Twitter", "Discord", "GitHub"].map((platform) => (
                                    <span key={platform} className="bg-white border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:border-amber-300 hover:text-amber-600 transition cursor-pointer">
                                        {platform}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;
