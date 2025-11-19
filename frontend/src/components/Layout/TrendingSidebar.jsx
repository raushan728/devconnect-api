import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const TrendingSidebar = () => {
    const trends = [
        { topic: 'React 19', posts: '12.5K' },
        { topic: 'Tailwind v4', posts: '8.2K' },
        { topic: 'AI Agents', posts: '25K' },
        { topic: '#DevConnect', posts: '5K' },
        { topic: 'Web Assembly', posts: '3.1K' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-light/50 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-lg mb-6"
        >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary" />
                Trending Now
            </h3>
            <div className="space-y-4">
                {trends.map((trend, index) => (
                    <div key={index} className="group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <p className="text-sm text-gray-400 group-hover:text-primary transition-colors font-medium">
                            {trend.topic}
                        </p>
                        <p className="text-xs text-gray-500">{trend.posts} posts</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default TrendingSidebar;
