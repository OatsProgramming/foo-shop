import { getServerSession } from 'next-auth'
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { authOptions } from './api/auth/[...nextauth]/route';
import { SignIn, SignOut } from './components/Auth/AuthButtons';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Foo Shop',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // DONT ADD authOption INTO THE getServerSession OPTIONS...
  // ...Now it works when authOptions is added??? 
  // ...It helps make the callback for session work too???
  // Started to work after i added session: { strategy: 'jwt' } to auth
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SignIn />
        <SignOut />
        <Link href="/item">
          Item
        </Link>
        <Link href='/'>
          Home
        </Link>
        <pre style={{
          whiteSpace: 'pre-wrap'
        }}>
          {JSON.stringify(session)}
        </pre>
          {children}
      </body>
    </html>
  )
}
