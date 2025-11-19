import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Trash2 } from 'lucide-react';
import api from '../../utils/api';

const CommentItem = ({ postId, comment, onCommentDeleted }) => {
    const { _id, text, name, avatar, user, date } = comment;
    const { user: authUser } = useAuth();

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/comment/${postId}/${_id}`);
            if (onCommentDeleted) onCommentDeleted();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-dark p-4 rounded-lg border border-white/5 mb-4 flex space-x-4">
            <Link to={`/profile/${user}`}>
                <img
                    className="w-10 h-10 rounded-full border border-primary object-cover"
                    src={avatar}
                    alt=""
                />
            </Link>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white">{name}</h4>
                    <span className="text-xs text-gray-500">
                        {new Date(date).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-gray-300 mt-1 text-sm">{text}</p>
            </div>
            {!authUser.loading && user === authUser._id && (
                <button
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            )}
        </div>
    );
};

export default CommentItem;
