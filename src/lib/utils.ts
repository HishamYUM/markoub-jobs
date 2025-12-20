import {  clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type {ClassValue} from 'clsx';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function capitalize(workMode: string): React.ReactNode {
    return workMode.charAt(0).toUpperCase() + workMode.slice(1).toLowerCase();
  }