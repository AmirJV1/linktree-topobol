import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class GetProfilesUseCase {
    constructor(private repository: ProfileRepository) { }

    async execute(): Promise<Profile[]> {
        return this.repository.getAllProfiles();
    }
}
