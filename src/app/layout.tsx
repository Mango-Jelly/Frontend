import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image
 from 'next/image'
import './globals.css'
import NavMenu from './_component/NavMenu'
import backgroundImg from '../../public/backgroundImage.svg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mangotail',
  description: 'mangotail',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <div className="container">
         <Image 
            className='background-image' 
            src={backgroundImg}
            fill
            alt='배경 이미지'
          />       
          {/* //TODO : isLogin property를 nextAuth 적용시 AuthSession 컴포넌트로 교체 */}
            <NavMenu isLogin/>
            {children}
          </div> 
        </body>
    </html>
  )
}
