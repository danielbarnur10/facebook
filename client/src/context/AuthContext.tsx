import type { AuthContextType } from '@/types/IAuthContext';
import {createContext} from 'react'

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
