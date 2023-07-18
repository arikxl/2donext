'use client'

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/solid';

function Modal() {
    const imagePickerRef = useRef<HTMLInputElement>(null);

    const [isOpen, closeModal] = useModalStore((state) => [
        state.isOpen,
        state.closeModal
    ]);

    const [img, setImage, newTaskInput, setNewTaskInput] = useBoardStore((state) => [
        state.newTaskInput,
        state.setNewTaskInput,
        state.img,
        state.setImage,
    ])


    return (
        // Use the `Transition` component at the root level
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="form" onClose={closeModal} className='relative z-10'>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>


                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden 
                            rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title as="h3" className='text-lg font-medium loading-6 text-gray-900 pb-2'>
                                    Add a Todo
                                </Dialog.Title>
                                <div className='mt-2'>
                                    <input type='text' value={newTaskInput}
                                        placeholder='Enter a new todo here...'
                                        onChange={(e) => setNewTaskInput(e.target.value)}
                                        className='w-full border border-gray-300 rounded-md outline-none p-5'
                                    />
                                </div>
                                <TaskTypeRadioGroup />
                                <div>
                                    <button className='w-full border border-gray-300 rounded-md 
                                    outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500
                                    focus-visible:ring-offset-2'
                                        onClick={() => imagePickerRef.current?.click()}
                                        type='button'
                                    >
                                        <PhotoIcon className='h-6 w-6 mr-2 inline-block' />
                                        Upload Image
                                    </button>
                                    {
                                        img && (
                                            <Image alt='uploaded image'
                                                width={200} height={200}
                                                className=' w-full h-44 object-cover mt-2 filter 
                                                hover:grayscale transition-all duration-150 cursor-not-allowed'
                                                src={URL.createObjectURL(img)}
                                                onClick={() => setImage(null)}
                                            />
                                        )
                                    }
                                    <input type='file' hidden
                                        ref={imagePickerRef}
                                        onChange={(e) => {
                                            if (!e.target.files![0].type.startsWith('image/')) return;
                                            setImage(e.target.files![0])
                                        }}
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>



            </Dialog>
        </Transition>
    )
}

export default Modal
