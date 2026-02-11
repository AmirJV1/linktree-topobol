import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Profile } from '../../domain/entities/Profile';
import { GetProfileBySlugUseCase } from '../../application/usecases/GetProfileBySlugUseCase';
import { MockProfileRepository } from '../../infrastructure/repositories/MockProfileRepository';
import { Button } from '../components/Button';

// Inyección manual para el ejemplo
const repository = new MockProfileRepository();
const getProfileBySlug = new GetProfileBySlugUseCase(repository);

export const PublicProfilePage: React.FC = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getProfileBySlug.execute(slug).then(setProfile).finally(() => setLoading(false));
        }
    }, [slug]);

    const handleLinkClick = async (linkId: string, url: string) => {
        if (profile) {
            await repository.incrementLinkClick(profile.id, linkId);
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    if (!profile || !profile.isActive) return <div className="min-h-screen flex items-center justify-center">Perfil no disponible</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex flex-col items-center">
                    <img className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover" src={profile.photoUrl} alt={profile.fullName} />
                    <h1 className="mt-4 text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                    <p className="text-lg text-blue-600 font-medium">{profile.position}</p>
                    <p className="mt-2 text-gray-600">{profile.bio}</p>
                </div>
                <div className="space-y-4 w-full">
                    {profile.links.filter(l => l.isVisible).sort((a, b) => a.order - b.order).map((link) => (
                        <Button key={link.id} variant="outline" fullWidth onClick={() => handleLinkClick(link.id, link.url)} className="py-4 hover:scale-105">
                            {link.title}
                        </Button>
                    ))}
                </div>
                <footer className="mt-12 text-sm text-gray-400">© 2024 TopoBol</footer>
            </div>
        </div>
    );
};
