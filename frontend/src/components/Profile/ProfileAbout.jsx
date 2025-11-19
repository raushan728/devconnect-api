import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ProfileAbout = ({ profile }) => {
    const {
        bio,
        skills,
        user: { name }
    } = profile;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-light p-8 border border-white/5 shadow-lg text-center"
        >
            {bio && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">{name.trim().split(' ')[0]}'s Bio</h2>
                    <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">{bio}</p>
                    <div className="w-full h-px bg-white/10 my-6"></div>
                </div>
            )}

            <h2 className="text-2xl font-bold text-primary mb-6">Skill Set</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 bg-dark p-3 rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
                    >
                        <Check size={16} className="text-secondary" />
                        <span className="text-white font-medium">{skill}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProfileAbout;
