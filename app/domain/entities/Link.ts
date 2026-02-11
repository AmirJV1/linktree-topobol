export interface Link {
    id: string;
    title: string;
    url: string;
    icon: string; // nombre del icono (ej. 'instagram', 'web')
    order: number;
    isVisible: boolean;
    clickCount: number;
}
