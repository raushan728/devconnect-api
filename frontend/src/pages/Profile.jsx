import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProfileTop from '../components/Profile/ProfileTop';
import ProfileAbout from '../components/Profile/ProfileAbout';
import ProfileExperience from '../components/Profile/ProfileExperience';
import ProfileEducation from '../components/Profile/ProfileEducation';
import ProfileGithub from '../components/Profile/ProfileGithub';
import Button from '../components/UI/Button';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const { user: authUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = id
                    ? await api.get(`/profile/user/${id}`)
                    : await api.get('/profile/me');

                setProfile(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen pt-24 px-4 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Profile not found</h2>
                <p className="text-gray-400 mb-6">You haven't created a profile yet.</p>
                <Link to="/create-profile">
                    <Button>Create Profile</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Link to="/profiles" className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={20} className="mr-1" /> Back to Profiles
            </Link>

            <div className="space-y-4">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileExperience experience={profile.experience} />
                    <ProfileEducation education={profile.education} />
                </div>

                {profile.githubusername && (
                    <ProfileGithub username={profile.githubusername} />
                )}
            </div>
        </div>
    );
};

export default Profile;
