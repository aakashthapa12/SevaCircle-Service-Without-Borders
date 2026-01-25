import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class FirebaseService implements OnModuleInit {
    private auth;
    onModuleInit(): void;
    getAuth(): admin.auth.Auth;
}
