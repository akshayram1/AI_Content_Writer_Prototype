import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

let app, auth;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
} catch (error) {
    console.warn('Firebase not configured properly. Using mock authentication.');
}

class AuthService {
    constructor() {
        this.auth = auth;
        this.currentUser = null;
        this.listeners = [];

        if (this.auth) {
            onAuthStateChanged(this.auth, (user) => {
                this.currentUser = user;
                this.listeners.forEach(callback => callback(user));
            });
        }
    }

    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        // Return unsubscribe function
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    async signIn(email, password) {
        try {
            if (!this.auth) {
                // Mock authentication for development
                const mockUser = { uid: 'mock-user', email };
                this.currentUser = mockUser;
                this.listeners.forEach(callback => callback(mockUser));
                return { success: true, user: mockUser };
            }

            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async signUp(email, password) {
        try {
            if (!this.auth) {
                // Mock authentication for development
                const mockUser = { uid: 'mock-user-new', email };
                this.currentUser = mockUser;
                this.listeners.forEach(callback => callback(mockUser));
                return { success: true, user: mockUser };
            }

            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async signOut() {
        try {
            if (!this.auth) {
                // Mock sign out
                this.currentUser = null;
                this.listeners.forEach(callback => callback(null));
                return { success: true };
            }

            await signOut(this.auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

export default new AuthService();
