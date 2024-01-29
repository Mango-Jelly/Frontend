import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import NavMenu from './_component/NavMenu'
import AuthSession from './_component/AuthSession'

const inter = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mangotail',
  description: 'mangotail',
}

type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='bg-cover bg-background h-dvh'>
          <AuthSession>
            <NavMenu />
            {modal}
            {children}
          </AuthSession>
        </div>
      </body>
    </html>
  )
}
