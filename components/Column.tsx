import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';
import { PlusCircleIcon } from '@heroicons/react/24/solid';


type Props = {
    id: TypeColumn,
    todos: Todo[],
    index: number,
}

const idToText: {
    [ key in TypeColumn ] : string;
} = {
    'todo': 'To Do',
    'inProgress': 'In Progress',
    'done': 'Done'        
}

const Column = ({ id, todos, index }: Props) => {
    
  return (
      <Draggable draggableId={id} index={index}>
          {(provided) => (
              <div {...provided.draggableProps} {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className=''
                  >
                  <Droppable droppableId={ index.toString()} type='card'>
                      {(provided, snapshot) => (
                          <div {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={`p-2 rounded-2xl shadow-sm ${
                                  snapshot.isDraggingOver ? 'bg-green-300' : 'bg-white/50' }`}
                          >
                              <h2 className='flex justify-between font-bold text-xl p-2'>
                                  {idToText[id]}
                                  <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 font-normal text-sm'>
                                      {todos.length}</span>
                              </h2>
                              <div className='space-y-2'>
                                  {
                                      todos.map((todo, index) => (
                                          <Draggable draggableId={todo.$id} index={index} key={todo.$id }>
                                              {(provided) => (
                                                  <TodoCard todo={todo} index={index} id={id} dragHandleProps={provided.dragHandleProps}
                                                      innerRef={provided.innerRef} draggableProps={provided.draggableProps} />
                                              )}
                                          </Draggable>
                                      ))
                                  }
                                  {provided.placeholder}
                                  <div className='flex justify-end items-end p-2'>
                                      <button className='text-green-500 hover:text-green-600'>
                                          <PlusCircleIcon className='h-10 w-10'/>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      )}
                </Droppable>
              </div>
          )}
      </Draggable>
  )
}

export default Column