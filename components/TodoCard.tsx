'use client'

import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypeColumn;
  innerRef: ( element: HTMLElement | null ) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps  }:Props) => {

  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}
      className='bg-white rounded-md space-y-2 drop-shadow-md'
    >
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button onClick={() =>deleteTask(index, todo, id)}
          className='text-red-500 hover:text-red-600' >
          <XCircleIcon className='ml-5 h-8 w-8' />
        </button>
      </div>

      </div>
  )
}

export default TodoCard