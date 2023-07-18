import { databases, storage } from '@/appwrite';
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn';
import { create } from 'zustand';

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateDotosInDB: (todo: Todo, columnId: TypeColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypeColumn ) => void;
    newTaskInput: string;
    setNewTaskInput: (input: string) => void;
    newTaskType: TypeColumn;
    setNewTaskType: (columnId: TypeColumn) => void;
    img: File | null;
    setImage: (img: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypeColumn, Column>()
    },
    searchString: '',
    newTaskInput: '',
    newTaskType: 'todo',
    img: null,
    setNewTaskInput: (input: string) => set({ newTaskInput : input }),
    setNewTaskType: (columnId: TypeColumn) => set({ newTaskType: columnId }),
    setSearchString:(searchString)=> set( { searchString}),
    getBoard:async() => {
        const board = await getTodosGroupByColumn();
        set({board})
    },
    setBoardState: (board) => set({ board }),
    setImage: (img: File |null) => set({ img}),

    deleteTask: async ( taskIndex: number, todo: Todo, id: TypeColumn) => {
        const newColumns = new Map(get().board.columns);

        newColumns.get(id)?.todos.splice(taskIndex, 1);

        set({ board: { columns: newColumns } });
        
        if (todo.img) {
            await storage.deleteFile(todo.img.bucketId, todo.img.fileId);
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        )
    },
    
    updateDotosInDB: async(todo, columnId)=>{
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId
            }
        )
    }
}));

