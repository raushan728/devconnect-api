import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';
import api from '../../utils/api';

const PostItem = ({ post, showActions = true, onPostDeleted }) => {
    const { user } = useAuth();
    const { _id, text, name, avatar, user: postUser, likes, comments, date } = post;

    const handleLike = async () => {
        try {
            await api.put(`/posts/like/${_id}`);
            // In a real app, you'd update the local state or refetch posts
            // For now, we'll just let the parent component handle refetching if needed
            // or implement a more complex state management (Redux/Context)
            if (onPostDeleted) onPostDeleted(); // Trigger refresh
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${_id}`);
            if (onPostDeleted) onPostDeleted();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' }}
            transition={{ duration: 0.3 }}
            className="bg-dark-light p-6 rounded-xl border border-white/10 shadow-lg mb-6 hover:shadow-2xl hover:shadow-primary/20"
        >
            <div className="flex items-center mb-4">
                <Link to={`/profile/${postUser}`}>
                    <img
                        src={avatar}
                        alt={name}
                        className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                    />
                </Link>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <Link to={`/profile/${postUser}`}>
                            <h4 className="text-lg font-semibold text-white hover:text-primary transition-colors">
                                {name}
                            </h4>
                        </Link>
                        <span className="text-xs text-gray-500">
                            {new Date(date).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="text-gray-300 my-4 leading-relaxed">
                        {text}
                    </p>

                    {showActions && (
                        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-white/5">
                            <button
                                onClick={handleLike}
                                className="flex items-center space-x-1 text-gray-400 hover:text-pink-500 transition-colors group"
                            >
                                <Heart
                                    size={18}
                                    className={`group-hover:fill-current ${likes.some(like => like.user === user?._id) ? 'fill-pink-500 text-pink-500' : ''
                                        }`}
                                />
                                <span>{likes.length > 0 && likes.length}</span>
                            </button>

                            <Link
                                to={`/posts/${_id}`}
                                className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors"
                            >
                                <MessageSquare size={18} />
                                <span>{comments.length > 0 && comments.length}</span>
                            </Link>

                            {!user.loading && postUser === user._id && (
                                <button
                                    onClick={handleDelete}
                                    className="ml-auto text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PostItem;
