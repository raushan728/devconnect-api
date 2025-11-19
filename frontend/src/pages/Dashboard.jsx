import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import PostItem from '../components/Posts/PostItem';
import PostForm from '../components/Posts/PostForm';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Float } from '@react-three/drei';

import TrendingSidebar from '../components/Layout/TrendingSidebar';
import WhoToFollow from '../components/Layout/WhoToFollow';

const Sidebar3D = () => {
    return (
        <div className="h-[250px] w-full hidden lg:block relative z-0 mb-6">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <TorusKnot args={[1, 0.3, 100, 16]} scale={1.3}>
                        <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} />
                    </TorusKnot>
                </Float>
                <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
        </div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar (Profile Summary - Optional, or just spacing) */}
                <div className="hidden lg:block lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-dark-light/50 backdrop-blur-md p-6 rounded-xl border border-white/5 sticky top-24"
                    >
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={user?.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                alt={user?.name}
                                className="w-20 h-20 rounded-full border-2 border-primary mb-4 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"; }}
                            />
                            <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">Full Stack Developer</p>
                            <div className="flex justify-between w-full text-sm text-gray-400 border-t border-white/10 pt-4">
                                <div className="text-center">
                                    <span className="block font-bold text-white">120</span>
                                    <span>Following</span>
                                </div>
                                <div className="text-center">
                                    <span className="block font-bold text-white">1.5K</span>
                                    <span>Followers</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Feed */}
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-6 rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-white/10 backdrop-blur-md"
                    >
                        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, {user && user.name.split(' ')[0]}! 👋</h1>
                        <p className="text-gray-300 text-sm">Here's what's happening in your developer network today.</p>
                    </motion.div>

                    <PostForm onPostCreated={fetchPosts} />

                    <div className="space-y-4 pb-10">
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            posts.map(post => (
                                <PostItem key={post._id} post={post} onPostDeleted={fetchPosts} />
                            ))
                        )}
                        {!loading && posts.length === 0 && (
                            <div className="text-center py-16 bg-dark-light/30 rounded-xl border border-white/5 border-dashed">
                                <p className="text-gray-400 text-lg mb-2">It's quiet here...</p>
                                <p className="text-gray-500 text-sm">Be the first to share something amazing!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <Sidebar3D />
                    <TrendingSidebar />
                    <WhoToFollow />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
