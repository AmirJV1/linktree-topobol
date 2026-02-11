import React, { useEffect, useState } from 'react';
import { Profile } from '../../domain/entities/Profile';
import { GetProfilesUseCase } from '../../application/usecases/GetProfilesUseCase';
import { ToggleProfileStatusUseCase } from '../../application/usecases/ToggleProfileStatusUseCase';
import { CreateProfileUseCase } from '../../application/usecases/CreateProfileUseCase';
import { UpdateProfileUseCase } from '../../application/usecases/UpdateProfileUseCase';
import { DeleteProfileUseCase } from '../../application/usecases/DeleteProfileUseCase';
import { MockProfileRepository } from '../../infrastructure/repositories/MockProfileRepository';
import { Button } from '../components/Button';
import { ProfileForm } from '../components/ProfileForm';

const repository = new MockProfileRepository();
const getProfiles = new GetProfilesUseCase(repository);
const toggleStatus = new ToggleProfileStatusUseCase(repository);
const createProfile = new CreateProfileUseCase(repository);
const updateProfile = new UpdateProfileUseCase(repository);
const deleteProfile = new DeleteProfileUseCase(repository);

export const AdminDashboardPage: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

    const loadData = () => {
        setLoading(true);
        getProfiles.execute().then(setProfiles).finally(() => setLoading(false));
    };

    useEffect(() => { loadData(); }, []);

    const handleToggle = async (id: string) => {
        await toggleStatus.execute(id);
        loadData();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este perfil?')) {
            await deleteProfile.execute(id);
            loadData();
        }
    };

    const handleSave = async (data: any) => {
        if (editingProfile) {
            await updateProfile.execute({ ...editingProfile, ...data });
        } else {
            await createProfile.execute(data);
        }
        setIsModalOpen(false);
        setEditingProfile(null);
        loadData();
    };

    const openCreateModal = () => {
        setEditingProfile(null);
        setIsModalOpen(true);
    };

    const openEditModal = (profile: Profile) => {
        setEditingProfile(profile);
        setIsModalOpen(true);
    };

    const filteredProfiles = profiles.filter(p => {
        const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all'
            ? true
            : filterStatus === 'active'
                ? p.isActive
                : !p.isActive;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-background">
            <nav className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-foreground">TopoBol Admin</h1>
                <Button variant="secondary">Salir</Button>
            </nav>
            <main className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Perfiles</h2>
                    <Button onClick={openCreateModal}>+ Nuevo Perfil</Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o slug..."
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                    </select>
                </div>
                {loading ? <div>Cargando...</div> : (
                    <div className="bg-card shadow rounded-lg overflow-hidden border border-border">
                        <ul className="divide-y divide-border">
                            {filteredProfiles.map((p) => (
                                <li key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={p.photoUrl} alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-foreground">{p.fullName}</div>
                                            <div className="text-sm text-muted-foreground">/{p.slug}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
                                            {p.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                        <Button variant="secondary" className="text-xs" onClick={() => handleToggle(p.id)}>
                                            {p.isActive ? 'Desactivar' : 'Activar'}
                                        </Button>
                                        <Button variant="outline" className="text-xs bg-yellow-300 border-black" onClick={() => openEditModal(p)}>Editar</Button>
                                        <Button variant="danger" className="text-xs bg-red-600 border-black" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-white flex items-center justify-center p-4 z-50">
                    <div className="bg-card rounded-lg shadow-xl max-w-lg w-full p-6 border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-4">
                            {editingProfile ? 'Editar Perfil' : 'Nuevo Perfil'}
                        </h3>
                        <ProfileForm
                            initialData={editingProfile}
                            onSubmit={handleSave}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
