import type { NextAuthOptions } from 'next-auth'
// import Google from 'next-auth/providers/google'
// import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismadb from '@/lib/prismadb'
import NextAuth from 'next-auth/next'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
    providers: [
        // Other providers give errors still
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        // Github({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!
        // }),
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {
                    name: 'username',
                    label: 'Username (optional)',
                    type: 'text',
                    placeholder: 'OatsProgramming'
                },
                email: {
                    name: 'email',
                    label: 'Email (optional)',
                    type: 'email',
                    placeholder: 'jackoatmeals@gmail.com'
                },
                password: {
                    name: 'password',
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials) => {
                // Check for any missing properties that would affect query
                if ((!credentials?.username && !credentials?.email) || !credentials?.password) {
                    return null
                }

                try {
                    // Get user from database
                    const user = await prismadb.user.findFirst({
                        where: {
                            OR: [
                                { email: credentials.email },
                                { name: credentials.username }
                            ]
                        }
                    })

                    // See if 404 or password mismatch
                    if (!user) return null
                    else if (!await compare(credentials.password, user.hashedPassword)) return null

                    return {
                        ...user,
                        username: user.name
                    }

                } catch (err) {
                    console.error(err)
                    return null
                }
            }
        })
    ],
    adapter: PrismaAdapter(prismadb),
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        },
        jwt: ({ user, token }) => {
            if (user) {
                return {
                    ...token,
                    id: user.id
                }
            }
            return token
        }
    },
    cookies: {
        pkceCodeVerifier: {
          name: "next-auth.pkce.code_verifier",
          options: {
            httpOnly: true,
            sameSite: "none",
            path: "/",
            secure: true,
          },
        },
      },
    // pages: {
    //     signIn: '/'
    // }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
