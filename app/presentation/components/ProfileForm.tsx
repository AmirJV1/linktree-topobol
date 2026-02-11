import React, { useState, useEffect } from 'react';
import { Profile, } from '../../domain/entities/Profile';
import { Link } from '../../domain/entities/Link';
import { Button } from './Button';

interface ProfileFormProps {
    initialData?: Profile | null;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<{
        fullName: string,
        slug: string,
        position: string,
        bio: string,
        photoUrl: string,
        email: string,
        phone: string,
        isActive: boolean,
        links: Link[]
    }>({
        fullName: '',
        slug: '',
        position: '',
        bio: '',
        photoUrl: '',
        email: '',
        phone: '',
        isActive: true,
        links: []
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData.fullName,
                slug: initialData.slug,
                position: initialData.position,
                bio: initialData.bio,
                photoUrl: initialData.photoUrl,
                email: initialData.email,
                phone: initialData.phone,
                isActive: initialData.isActive,
                links: initialData.links
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
            <div>
                <label className="block text-sm font-medium text-foreground">Nombre Completo</label>
                <input required name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground">Slug (URL)</label>
                    <input required name="slug" value={formData.slug} onChange={handleChange} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground">Cargo</label>
                    <input required name="position" value={formData.position} onChange={handleChange} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground">Biografía</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground">URL Foto</label>
                <input name="photoUrl" value={formData.photoUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    );
};