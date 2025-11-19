import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import PostItem from '../components/Posts/PostItem';
import CommentForm from '../components/Post/CommentForm';
import CommentItem from '../components/Post/CommentItem';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (loading || !post) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-10">
            <Link to="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={20} className="mr-1" /> Back to Feed
            </Link>

            <PostItem post={post} showActions={false} />

            <CommentForm postId={post._id} onCommentAdded={fetchPost} />

            <div className="space-y-4">
                {post.comments.map(comment => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                        onCommentDeleted={fetchPost}
                    />
                ))}
            </div>
        </div>
    );
};

export default Post;
