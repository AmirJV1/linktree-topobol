import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

const MOCK_PROFILES: Profile[] = [
    {
        id: '1',
        slug: 'juan-perez',
        fullName: 'Juan Pérez',
        position: 'Director General',
        bio: 'Impulsando la innovación en TopoBol.',
        photoUrl: 'https://ui-avatars.com/api/?name=Juan+Perez&background=0D8ABC&color=fff',
        email: 'juan@topobol.com',
        phone: '+591 70000001',
        isActive: true,
        createdAt: new Date('2023-01-01'),
        links: [
            { id: 'l1', title: 'Sitio Web', url: 'https://topobol.com', icon: 'globe', order: 1, isVisible: true, clickCount: 120 },
            { id: 'l2', title: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', order: 2, isVisible: true, clickCount: 45 },
        ],
    },
    {
        id: '2',
        slug: 'maria-lopez',
        fullName: 'María López',
        position: 'Gerente de Marketing',
        bio: 'Conectando marcas con personas.',
        photoUrl: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=E91E63&color=fff',
        email: 'maria@topobol.com',
        phone: '+591 70000002',
        isActive: true,
        createdAt: new Date('2023-02-15'),
        links: [
            { id: 'l3', title: 'Instagram', url: 'https://instagram.com', icon: 'instagram', order: 1, isVisible: true, clickCount: 200 },
        ],
    },
];

export class MockProfileRepository implements ProfileRepository {
    private profiles: Profile[] = [...MOCK_PROFILES];

    async getAllProfiles(): Promise<Profile[]> {
        return new Promise((resolve) => setTimeout(() => resolve([...this.profiles]), 500));
    }

    async getProfileById(id: string): Promise<Profile | null> {
        return new Promise((resolve) => {
            const profile = this.profiles.find((p) => p.id === id);
            setTimeout(() => resolve(profile ? { ...profile } : null), 300);
        });
    }

    async getProfileBySlug(slug: string): Promise<Profile | null> {
        return new Promise((resolve) => {
            const profile = this.profiles.find((p) => p.slug === slug);
            setTimeout(() => resolve(profile ? { ...profile } : null), 300);
        });
    }

    async createProfile(data: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
        return new Promise((resolve) => {
            const newProfile = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() };
            this.profiles.push(newProfile);
            setTimeout(() => resolve(newProfile), 500);
        });
    }

    async updateProfile(profile: Profile): Promise<Profile> {
        return new Promise((resolve, reject) => {
            const index = this.profiles.findIndex((p) => p.id === profile.id);
            if (index === -1) return reject(new Error('Perfil no encontrado'));
            this.profiles[index] = profile;
            setTimeout(() => resolve(profile), 500);
        });
    }

    async deleteProfile(id: string): Promise<void> {
        return new Promise((resolve) => {
            this.profiles = this.profiles.filter((p) => p.id !== id);
            setTimeout(() => resolve(), 500);
        });
    }

    async toggleProfileStatus(id: string): Promise<Profile> {
        return this.getProfileById(id).then(p => {
            if (!p) throw new Error("Profile not found");
            return this.updateProfile({ ...p, isActive: !p.isActive });
        });
    }

    async incrementLinkClick(profileId: string, linkId: string): Promise<void> {
        // Mock implementation
        return Promise.resolve();
    }
}