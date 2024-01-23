import Link from 'next/link'
import { NextPage } from 'next'
import Image from 'next/image'
import errorImg from '../../public/errorImg.svg'

const NotFound: NextPage = () => {
  return (
    <div className='absolute top-0 size-full bg-[#AFAFAF]'>
      <div className='mt-48 ml-96'>
        <div className='text-9xl font-black mb-12'>Oops!</div>
        <div className='text-6xl mb-12'>404 Not Found</div>
        <div className='text-3xl mb-2'>
          죄송합니다. 페이지를 찾을 수 없습니다.
        </div>
        <div className='text-3xl mb-12'>
          입력하신 주소가 정확한지 다시 확인해 주세요.
        </div>
        <a href='/'>
          <button className='text-3xl text-white text-center bg-[#E6B559] hover:bg-[#DAA94C] rounded-[2rem] w-56 h-20 m-2 shadow'>
            메인 페이지로
          </button>
        </a>
      </div>

      <Image
        src={errorImg}
        width={640}
        height={640}
        alt='에러페이지'
        className='absolute bottom-0 right-0'
      />
      <div></div>
    </div>
  )
}

export default NotFound
