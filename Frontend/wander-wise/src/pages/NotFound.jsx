import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-amber-500">404</h1>
                <p className="text-2xl font-semibold text-slate-800 mt-4">Page Not Found</p>
                <p className="text-slate-500 mt-2 mb-8">
                    Looks like you've wandered off the beaten path.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
