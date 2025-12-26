import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatOrderId(id) {
    if (!id) return '';
    return String(id).padStart(8, '0');
}
