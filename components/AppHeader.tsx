'use client'

import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar';
import Gpt from './Gpt';


function AppHeader() {
    return (
        <header className="">
            <div className="flex flex-col md:flex-row items-center p-5
                             bg-gray-500/10 rounded-b-2xl">
                <Image src='https://res.cloudinary.com/arikxl/image/upload/v1689023488/Ella2023/fzlno994apx0kp4xyzlw.png'
                    alt='Arik Alexandrov' width={300} height={50}
                    className='w-44 md:w-56 pb-10 md:pb-0 '
                />
                <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                    <form className='flex items-center space-x-5 bg-white rounded-md p-2 
                                    shadow-md flex-1 md:flex-initial'>
                        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                        <input type='text' placeholder='Search...'
                            className=' flex-1 outline-none' />
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