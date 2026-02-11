import React, { useEffect, useState } from 'react';
import { Profile } from '../../domain/entities/Profile';
import { GetProfilesUseCase } from '../../application/usecases/GetProfilesUseCase';
import { ToggleProfileStatusUseCase } from '../../application/usecases/ToggleProfileStatusUseCase';
import { MockProfileRepository } from '../../infrastructure/repositories/MockProfileRepository';
import { Button } from '../components/Button';

const repository = new MockProfileRepository();
const getProfiles = new GetProfilesUseCase(repository);
const toggleStatus = new ToggleProfileStatusUseCase(repository);

export const AdminDashboardPage: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        setLoading(true);
        getProfiles.execute().then(setProfiles).finally(() => setLoading(false));
    };

    useEffect(() => { loadData(); }, []);

    const handleToggle = async (id: string) => {
        await toggleStatus.execute(id);
        loadData();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">TopoBol Admin</h1>
                <Button variant="secondary">Salir</Button>
            </nav>
            <main className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Perfiles</h2>
                    <Button>+ Nuevo Perfil</Button>
                </div>
                {loading ? <div>Cargando...</div> : (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {profiles.map((p) => (
                                <li key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={p.photoUrl} alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{p.fullName}</div>
                                            <div className="text-sm text-gray-500">/{p.slug}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-2 text-xs font-semibold rounded-full ${p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {p.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                        <Button variant="secondary" className="text-xs" onClick={() => handleToggle(p.id)}>
                                            {p.isActive ? 'Desactivar' : 'Activar'}
                                        </Button>
                                        <Button variant="outline" className="text-xs">Editar</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
};
