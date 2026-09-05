import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">WanderWise</h3>
                        <p className="text-sm leading-relaxed">
                            Making travel planning effortless, one trip at a time.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
                    <p>© {new Date().getFullYear()} WanderWise. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
