import Image
 from 'next/image'

type Role = {
   img : string,
   name : string
   actor : string | undefined
 }
   
export default function Roles(role : Role) {
    return (
      <div className='flex flex-row justify-between '>
        <Image 
          alt = "역할 사진"
          src={role.img}
          className='mr-10 '
        />
        
        <div>
          <p className='text-gray-700 dark:text-gray-400'>{role.name}</p>
          <p className='text-gray-700 dark:text-gray-400'>{role.actor}</p>
        </div>
  
      </div>
    )
  }