import { scripts } from './DummyData'
import pinIcon from '../../../public/YellowPinIcon.png'
import Image from 'next/image'

//TODO : 동화 대본 리스트 불러오기 API 연결

export default function ScriptList() {
    return (
        <div className='bg-white rounded-[2rem] w-1/2 p-4 ml-2'>
            <div className='flex px-8 py-4 mb-1'>
                <Image
                    src={pinIcon}
                    width={24}
                    height={28}
                    alt='동화 대본 구경하기'
                    className='-scale-x-100 -rotate-12 mr-2'
                />
                <p className='text-2xl text-highlight font-semibold pt-1'>
                    동화 대본 구경하기
                </p>
            </div>

            <div className='flex flex-wrap justify-center'>
                {scripts.map((value, key) => {
                    return (
                        <div key={key} className='w-64 mx-3 mb-4'>
                            <div className=' bg-gray-200 rounded-2xl h-40 mb-2'></div>
                            <div className='truncate text-center'>
                                {value.title}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
