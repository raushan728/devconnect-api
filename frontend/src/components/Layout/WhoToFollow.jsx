import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import Button from '../UI/Button';

const WhoToFollow = () => {
    const users = [
        { name: 'Sarah Drasner', handle: '@sarah_edo', avatar: 'https://i.pravatar.cc/150?u=sarah' },
        { name: 'Dan Abramov', handle: '@dan_abramov', avatar: 'https://i.pravatar.cc/150?u=dan' },
        { name: 'Evan You', handle: '@youyuxi', avatar: 'https://i.pravatar.cc/150?u=evan' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-light/50 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-lg"
        >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <UserPlus size={20} className="mr-2 text-secondary" />
                Who to Follow
            </h3>
            <div className="space-y-4">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <div className="flex items-center cursor-pointer">
                            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="text-sm font-bold text-white hover:text-primary transition-colors">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.handle}</p>
                            </div>
                        </div>
                        <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                            <UserPlus size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default WhoToFollow;
