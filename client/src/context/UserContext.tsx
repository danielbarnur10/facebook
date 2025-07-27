import {createContext} from 'react'
import {type User} from '../types/IUser'

export const UserContext = createContext<User | undefined>(undefined);