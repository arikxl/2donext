import {  UserCircleIcon } from '@heroicons/react/24/solid'

const Gpt = () => {
  return (
      <div className='flex items-center justify-center px-5 py-2 md:py-5'>
          <p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl
                                w-fit bg-white italic max-w-3xl text-[#196986]'>
              <UserCircleIcon className='inline-block h-10 w-10 text-[#196986] mr-1' />
              GPT is summarising your tasks for the day...
          </p>
      </div>
  )
}

export default Gpt