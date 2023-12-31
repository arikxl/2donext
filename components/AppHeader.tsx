'use client'

import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar';
import Gpt from './Gpt';
import { useBoardStore } from '@/store/BoardStore';


function AppHeader() {

    const [searchString, setSearchString] = useBoardStore((state) => [
        state.searchString,
        state.setSearchString,
     ])

    return (
        <header className="">
            <div className="flex flex-col md:flex-row items-center p-5
                bg-gray-500/10 rounded-b-2xl"
            >
                <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br -z-50
                from-pink-400 to-[#196986] rounded-md filter blur-3xl opacity-50'>
                </div>
                <Image src='https://res.cloudinary.com/arikxl/image/upload/v1689023488/Ella2023/fzlno994apx0kp4xyzlw.png'
                    alt='Arik Alexandrov' width={300} height={50}
                    className='w-44 md:w-56 pb-10 md:pb-0 '
                />
                <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                    <form className='flex items-center space-x-5 bg-white rounded-md p-2 
                                    shadow-md flex-1 md:flex-initial'>
                        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                        <input type='text' placeholder='Search...'
                            className=' flex-1 outline-none'
                            value={searchString} onChange={(e)=>setSearchString(e.target.value)}
                        />
                        <button hidden type='submit'>Search</button>
                    </form>
                    <Avatar githubHandle="arikxl" size='50' />
                </div>
            </div>
            <Gpt />
        </header>
    )
}

export default AppHeader