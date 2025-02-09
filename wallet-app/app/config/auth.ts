import createNewUser from '@/actions/createNewUser';
import isExistingUser from '@/actions/isExistingUser';
import { verifyUser } from '@/actions/verifyUser';
import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: 'name', type: 'text', placeholder: 'name' },
                password: { label: 'password', type: 'password', placeholder: 'password' },
                email: { label: 'email', type: 'text', placeholder: 'email@example.com' },
                accountNum: {label: 'bank account number', type: "number", placeholder: "bank account number"}
            },
            async authorize(credentials: any) {
                // all checks: verify, then existing user or not, if new user matlab a new entry in wallet db
                const isVerified = await verifyUser(Number(credentials.accountNum));
                if (!isVerified) {
                    return null;
                }

                const isOldUser = await isExistingUser(Number(credentials.accountNum));
                if (!isOldUser) {
                    try {
                        await createNewUser({
                            name: credentials.name,
                            password: credentials.password,
                            email: credentials.email,
                            accountNum: Number(credentials.accountNum),
                        });
                    } catch (err) {
                        console.error("Error creating new user:", err);
                        return null;
                    }
                }
                
                return {
                    id: credentials.accountNum,
                    name: credentials.name,
                    email: credentials.email 
                };
            }
            
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }: any) => {
            token.accountNum = Number(token.sub);
            console.log(token);
            return token;
        },
        session: ({session, token, user}: any)=> {
            if(session && session.user) {
                session.user.accountNum = Number(token.accountNum);
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        }
    }
}