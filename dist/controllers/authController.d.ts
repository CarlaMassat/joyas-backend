import { Request, Response } from "express";
export declare const createAccount: (req: Request, res: Response) => Promise<any>;
export declare const confirmAccount: (req: Request, res: Response) => Promise<any>;
export declare const login: (req: Request, res: Response) => Promise<any>;
export declare const requestConfirmationCode: (req: Request, res: Response) => Promise<any>;
export declare const forgotPassword: (req: Request, res: Response) => Promise<any>;
export declare const validateToken: (req: Request, res: Response) => Promise<any>;
export declare const updatePasswordWithToken: (req: Request, res: Response) => Promise<any>;
export declare const user: (req: Request, res: Response) => Promise<any>;
