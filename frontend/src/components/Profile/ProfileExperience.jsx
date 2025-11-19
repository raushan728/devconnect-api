import { motion } from 'framer-motion';

const ProfileExperience = ({ experience }) => {
    return (
        <div className="bg-dark-light p-8 rounded-bl-2xl border border-white/5 shadow-lg h-full">
            <h2 className="text-2xl font-bold text-primary mb-6">Experience</h2>
            {experience.length > 0 ? (
                <div className="space-y-6">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-l-2 border-secondary pl-4 relative"
                        >
                            <div className="absolute w-3 h-3 bg-secondary rounded-full -left-[7px] top-1.5"></div>
                            <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                            <p className="text-gray-300 mb-1">
                                {new Date(exp.from).toLocaleDateString()} -{' '}
                                {exp.to ? new Date(exp.to).toLocaleDateString() : 'Now'}
                            </p>
                            <p className="text-lg font-medium text-white/90 mb-2">{exp.title}</p>
                            {exp.description && (
                                <p className="text-gray-400 text-sm">{exp.description}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No experience credentials listed</p>
            )}
        </div>
    );
};

export default ProfileExperience;
