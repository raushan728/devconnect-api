import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero3D from '../components/UI/Hero3D';

const Landing = () => {
    return (
        <div className="min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-64px)]">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 space-y-6 z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Connect with <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Developers
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-lg">
                        Create your developer profile, share your posts, and connect with other developers in a 3D immersive environment.
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
                            >
                                Get Started
                            </motion.button>
                        </Link>
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
                            >
                                Login
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="md:w-1/2 h-full flex items-center justify-center"
                >
                    <Hero3D />
                </motion.div>

            </div>
        </div>
    );
};

export default Landing;
