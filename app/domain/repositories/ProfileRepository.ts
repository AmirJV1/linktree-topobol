import { Profile } from '../entities/Profile';

export interface ProfileRepository {
    getAllProfiles(): Promise<Profile[]>;
    getProfileById(id: string): Promise<Profile | null>;
    getProfileBySlug(slug: string): Promise<Profile | null>;
    createProfile(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile>;
    updateProfile(profile: Profile): Promise<Profile>;
    deleteProfile(id: string): Promise<void>;
    toggleProfileStatus(id: string): Promise<Profile>;
    incrementLinkClick(profileId: string, linkId: string): Promise<void>;
}