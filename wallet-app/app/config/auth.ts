import CredentialsProvider from 'next-auth/providers/credentials';
export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: 'name', type: 'text', placeholder: 'name' },
                password: { label: 'password', type: 'password', placeholder: '' },
                accountNum: {label: 'bank account number', type: "number", placeholder: "bank account number"}
            },
            async authorize(credentials: any) {
                // authentication to be added
                return {
                    id: credentials.accountNum,
                    name: credentials.name,
                    email: credentials.email
                };
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}