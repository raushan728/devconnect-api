import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark-light border-t border-white/10 pt-12 pb-8 mt-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                &lt;/&gt; DevConnect
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A social network for developers to connect, share, and grow together. Built with React, Node.js, and 3D magic.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                            <li><Link to="/profiles" className="hover:text-primary transition-colors">Developers</Link></li>
                            <li><Link to="/register" className="hover:text-primary transition-colors">Join Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Guidelines</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-dark p-2 rounded-full border border-white/5 hover:border-primary/50">
                                <Github size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-dark p-2 rounded-full border border-white/5 hover:border-primary/50">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-dark p-2 rounded-full border border-white/5 hover:border-primary/50">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} DevConnect. All rights reserved.</p>
                    <p className="flex items-center mt-2 md:mt-0">
                        Made with <Heart size={14} className="text-red-500 mx-1 fill-current" /> by Raushan
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
