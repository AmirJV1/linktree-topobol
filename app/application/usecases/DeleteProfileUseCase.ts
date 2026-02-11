import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class DeleteProfileUseCase {
    constructor(private repository: ProfileRepository) { }

    async execute(id: string): Promise<void> {
        return this.repository.deleteProfile(id);
    }
}