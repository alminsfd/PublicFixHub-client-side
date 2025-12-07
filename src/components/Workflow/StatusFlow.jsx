import { Link } from "react-router";

export default function StatusFlow() {
    return (
        <div>
            <section className="   bg-linear-to-r from-indigo-100 via-indigo-100 to-indigo-200  py-20 px-6 text-center mt-15 transition-colors duration-500">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-indigo-800 dark:text-indigo-400 mb-4">
                        Get Started with Public Infrastructure Issue Reporting System
                    </h2>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                        To begin, create an account and log in to access the full reporting dashboard. Users can file detailed reports, attach photos, and specify locations. The system ensures seamless communication between citizens, staff, and admins, enabling quick assignment, verification, and resolution of public issues.
                    </p>

                    <div className="flex justify-center gap-6">
                        <Link
                            to="/register"
                            className="button px-4 py-2"
                        >
                            Register
                        </Link>

                        <Link
                            to="/login"
                            className="button px-5 py-2"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
