import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from '../UI/Button';
import api from '../../utils/api';

const PostForm = ({ onPostCreated }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            await api.post('/posts', { text });
            setText('');
            if (onPostCreated) onPostCreated();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-light/50 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-lg mb-6"
        >
            <form onSubmit={onSubmit}>
                <div className="relative">
                    <textarea
                        name="text"
                        cols="30"
                        rows="3"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full bg-dark/50 border border-gray-700/50 rounded-lg p-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none mb-3 placeholder-gray-500 disabled:opacity-50"
                    ></textarea>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <div className="flex space-x-2 text-primary">
                        {/* Dummy icons for future features */}
                        <button type="button" className="p-2 hover:bg-primary/10 rounded-full transition-colors" title="Add Image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </button>
                        <button type="button" className="p-2 hover:bg-primary/10 rounded-full transition-colors" title="Add Emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        </button>
                    </div>
                    <Button type="submit" size="sm" disabled={loading || !text.trim()}>
                        <Send size={16} className={loading ? "animate-spin" : ""} />
                        <span>{loading ? 'Posting...' : 'Post'}</span>
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default PostForm;
