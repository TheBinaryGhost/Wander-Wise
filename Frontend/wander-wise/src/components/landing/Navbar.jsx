import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-amber-500">
                            WanderWise
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {["Home", "About", "Contact"].map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-amber-600 hover:bg-amber-50 cursor-pointer">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100">
                    <div className="px-4 py-4 space-y-3">
                        {["Home", "About", "Contact"].map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="block text-sm font-medium text-slate-600 hover:text-amber-600 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}>
                                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white cursor-pointer">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
