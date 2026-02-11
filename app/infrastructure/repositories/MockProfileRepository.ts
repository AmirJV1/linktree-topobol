import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';
import { MOCK_PROFILES } from '../mock/mockData';

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
        return new Promise((resolve, reject) => {
            const index = this.profiles.findIndex((p) => p.id === id);
            if (index === -1) return reject(new Error('Perfil no encontrado'));
            this.profiles[index].isActive = !this.profiles[index].isActive;
            setTimeout(() => resolve({ ...this.profiles[index] }), 300);
        });
    }

    async incrementLinkClick(profileId: string, linkId: string): Promise<void> {
        return new Promise((resolve) => {
            const pIndex = this.profiles.findIndex((p) => p.id === profileId);
            if (pIndex !== -1) {
                const lIndex = this.profiles[pIndex].links.findIndex((l) => l.id === linkId);
                if (lIndex !== -1) this.profiles[pIndex].links[lIndex].clickCount++;
            }
            resolve();
        });
    }
}
