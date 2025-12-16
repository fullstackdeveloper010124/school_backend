import { IUser } from '../models/User';
interface JwtPayload {
    id: string;
    email?: string;
    role?: string;
}
export declare const generateToken: (user: IUser) => string;
export declare const verifyToken: (token: string) => JwtPayload;
export {};
//# sourceMappingURL=auth.d.ts.map