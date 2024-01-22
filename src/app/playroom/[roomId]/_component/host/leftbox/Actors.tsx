
type Role = {
    name : string
  }
  
  
export default function actors(role : Role) {
    return (
      <div className=' '>
        
        <div className='rounded-md p-3 bg-gray'>
          <p className='text-gray-700 dark:text-gray-400'>{role.name}</p>
        </div>
  
      </div>
    )
  }
  