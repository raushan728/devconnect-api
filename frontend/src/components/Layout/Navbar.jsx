import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Code2, User, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Code2 className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            DevConnect
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/profiles" className="text-gray-300 hover:text-white transition-colors">
                                    Developers
                                </Link>
                                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    {user?.avatar && (
                                        <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full border border-primary" />
                                    )}
                                    <span>{user?.name}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/profiles" className="text-gray-300 hover:text-white transition-colors">
                                    Developers
                                </Link>
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center space-x-1 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <LogIn size={18} />
                                        <span>Login</span>
                                    </motion.button>
                                </Link>
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center space-x-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                    >
                                        <UserPlus size={18} />
                                        <span>Register</span>
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
