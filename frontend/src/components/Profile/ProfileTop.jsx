import { motion } from 'framer-motion';
import { Globe, Twitter, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const ProfileTop = ({ profile }) => {
    const {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar }
    } = profile;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-secondary p-10 rounded-t-2xl text-center text-white shadow-lg relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    src={avatar}
                    alt=""
                    className="rounded-full w-32 h-32 border-4 border-white shadow-xl mb-4 object-cover"
                />
                <h1 className="text-4xl font-bold mb-2">{name}</h1>
                <p className="text-xl font-medium mb-1">
                    {status} {company && <span>at {company}</span>}
                </p>
                <p className="text-white/80 mb-6">{location && <span>{location}</span>}</p>

                <div className="flex space-x-4">
                    {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer" className="text-white hover:text-dark transition-colors">
                            <Globe size={24} />
                        </a>
                    )}
                    {social?.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-dark transition-colors">
                            <Twitter size={24} />
                        </a>
                    )}
                    {social?.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-dark transition-colors">
                            <Facebook size={24} />
                        </a>
                    )}
                    {social?.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-dark transition-colors">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {social?.youtube && (
                        <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-dark transition-colors">
                            <Youtube size={24} />
                        </a>
                    )}
                    {social?.instagram && (
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-dark transition-colors">
                            <Instagram size={24} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileTop;
