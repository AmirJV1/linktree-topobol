import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class GetProfileBySlugUseCase {
    constructor(private repository: ProfileRepository) { }

    async execute(slug: string): Promise<Profile | null> {
        return this.repository.getProfileBySlug(slug);
    }
}
