import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { Check } from 'lucide-react';

const Profiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const res = await api.get('/profile');
                setProfiles(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-primary mb-2">Developers</h1>
                <p className="text-xl text-gray-400">Browse and connect with developers</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.length > 0 ? (
                        profiles.map((profile, index) => (
                            <motion.div
                                key={profile._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-dark-light p-6 rounded-xl border border-white/5 shadow-lg hover:border-primary/50 transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={profile.user.avatar}
                                        alt=""
                                        className="w-16 h-16 rounded-full border-2 border-primary object-cover mr-4"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{profile.user.name}</h2>
                                        <p className="text-sm text-gray-400">
                                            {profile.status} {profile.company && <span>at {profile.company}</span>}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{profile.location && <span>{profile.location}</span>}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.slice(0, 4).map((skill, index) => (
                                            <span key={index} className="text-xs bg-dark px-2 py-1 rounded text-primary flex items-center">
                                                <Check size={10} className="mr-1" /> {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    to={`/profile/${profile.user._id}`}
                                    className="block w-full text-center bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                                >
                                    View Profile
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <h4 className="text-gray-500">No profiles found...</h4>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profiles;
