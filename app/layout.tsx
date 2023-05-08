import { getServerSession } from 'next-auth'
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // DONT ADD authOption INTO THE getServerSession OPTIONS
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <pre>{JSON.stringify(session)}</pre>
        {children}
      </body>
    </html>
  )
}
