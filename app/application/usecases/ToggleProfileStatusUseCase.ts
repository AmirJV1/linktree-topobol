import { Profile } from '../../domain/entities/Profile';
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class ToggleProfileStatusUseCase {
    constructor(private repository: ProfileRepository) { }

    async execute(id: string): Promise<Profile> {
        return this.repository.toggleProfileStatus(id);
    }
}
