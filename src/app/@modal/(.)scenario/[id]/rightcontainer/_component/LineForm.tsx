    
import style from '../modal.module.css'
import Image from 'next/image'

type line = {
    roleImg : any;
    roleName : string;
    script : string;
}
export default function LineForm (line: line) {
    return (
        
        <div className=''>
        <p className='flex items-center'>

            <Image 
                className='w-[2rem] h-[2rem]' 
                alt = "역할 사진"
                // src = {sceneRoles[line.role - 1].img}
                src = {line.roleImg}
            />
            <p className='m-[1rem] text-nowrap whitespace-nowrap '>{line.roleName} :</p>
            <p className='m-[1rem]'>  {line.script} </p>

        </p>
        </div>

    )
}