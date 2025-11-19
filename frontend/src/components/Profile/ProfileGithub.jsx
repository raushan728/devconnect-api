import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitBranch, Eye } from 'lucide-react';
import api from '../../utils/api';

const ProfileGithub = ({ username }) => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await api.get(`/profile/github/${username}`);
                setRepos(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRepos();
    }, [username]);

    return (
        <div className="bg-dark-light p-8 rounded-2xl border border-white/5 shadow-lg mt-4">
            <h2 className="text-2xl font-bold text-primary mb-6">Github Repos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo, index) => (
                    <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-dark p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-white truncate pr-2">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    {repo.name}
                                </a>
                            </h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
                            {repo.description}
                        </p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <Star size={14} className="text-yellow-500" />
                                <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye size={14} className="text-blue-500" />
                                <span>{repo.watchers_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <GitBranch size={14} className="text-green-500" />
                                <span>{repo.forks_count}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProfileGithub;
