const testimonials = [
    {
        name: "Sarah Chen",
        role: "Solo Traveler",
        content:
            "WanderWise completely changed how I plan my trips. The budget tracking alone saved me hundreds on my last Europe trip!",
        rating: 5,
        avatar: "SC",
    },
    {
        name: "Marcus Johnson",
        role: "Family Vacation Planner",
        content:
            "Planning trips for a family of five used to be a nightmare. Now everything is organized in one place. Absolute lifesaver.",
        rating: 5,
        avatar: "MJ",
    },
    {
        name: "Priya Sharma",
        role: "Digital Nomad",
        content:
            "As someone who's constantly traveling, having smart packing lists and itinerary management is invaluable. Highly recommended!",
        rating: 5,
        avatar: "PS",
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Loved by <span className="text-amber-500">Travelers</span>
                    </h2>
                    <p className="text-lg text-slate-500">
                        See what fellow adventurers have to say about WanderWise.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <span key={i} className="text-amber-400 text-lg">
                                        ★
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-600 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
