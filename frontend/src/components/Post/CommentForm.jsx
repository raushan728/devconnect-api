import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../UI/Button';
import api from '../../utils/api';

const CommentForm = ({ postId, onCommentAdded }) => {
    const [text, setText] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await api.post(`/posts/comment/${postId}`, { text });
            setText('');
            if (onCommentAdded) onCommentAdded();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-dark-light p-6 rounded-xl border border-white/10 shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Leave a Comment</h3>
            <form onSubmit={onSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="3"
                    placeholder="Comment on this post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                    className="w-full bg-dark border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none mb-4"
                ></textarea>
                <div className="flex justify-end">
                    <Button type="submit" variant="secondary">
                        <Send size={16} />
                        <span>Submit</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;
