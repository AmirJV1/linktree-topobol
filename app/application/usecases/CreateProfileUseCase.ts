import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class CreateProfileUseCase {
    constructor(private repository: ProfileRepository) { }

    async execute(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
        return this.repository.createProfile(profile);
    }
}