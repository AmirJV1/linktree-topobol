import { Link } from './Link';

export interface Profile {
    id: string;
    slug: string;
    fullName: string;
    position: string;
    bio: string;
    photoUrl: string;
    email: string;
    phone: string;
    isActive: boolean;
    createdAt: Date;
    links: Link[];
}
