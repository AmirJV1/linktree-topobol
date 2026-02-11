import { Profile } from '../../domain/entities/Profile';

export const MOCK_PROFILES: Profile[] = [
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
    {
        id: '3',
        slug: 'carlos-mamani',
        fullName: 'Carlos Mamani',
        position: 'Desarrollador Senior',
        bio: 'Construyendo el futuro digital.',
        photoUrl: 'https://ui-avatars.com/api/?name=Carlos+Mamani&background=4CAF50&color=fff',
        email: 'carlos@topobol.com',
        phone: '+591 70000003',
        isActive: false,
        createdAt: new Date('2023-03-10'),
        links: [],
    },
];
