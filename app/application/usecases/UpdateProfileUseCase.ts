import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class UpdateProfileUseCase {
    constructor(private repository: ProfileRepository) { }

    async execute(profile: Profile): Promise<Profile> {
        return this.repository.updateProfile(profile);
    }
}