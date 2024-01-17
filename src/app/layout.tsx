import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import Image
 from 'next/image'
import './globals.css'
import NavMenu from './_component/NavMenu'
import backgroundImg from '../../public/background.png'

const inter = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mangotail',
  description: 'mangotail',
}

type Props = {
  children: React.ReactNode,
  modal: React.ReactNode
}

export default function RootLayout({ children, modal } : Props) {
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
            {modal}
            {children}
        </div> 
      </body>
    </html>
  )
}
