import { databases, storage } from '@/appwrite';
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn';
import uploadImg from '@/lib/uploadImg';
import { create } from 'zustand';

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateDotosInDB: (todo: Todo, columnId: TypeColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypeColumn) => void;
    addTask: (todo: string, columnId: TypeColumn, img?: File |null) => void;
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
    img: null ,
    setNewTaskInput: (input: string) => set({ newTaskInput : input }),
    setNewTaskType: (columnId: TypeColumn) => set({ newTaskType: columnId }),
    setSearchString:(searchString)=> set( { searchString}),
    getBoard:async() => {
        const board = await getTodosGroupByColumn();
        set({board})
    },
    setBoardState: (board) => set({ board }),

    setImage: (img: File | null) => set({ img }),
    
    addTask: async (todo: string, columnId: TypeColumn, img?: File | null) => {
        let file: Image | undefined;

        if (img) {
            const fileUploaded = await uploadImg(img);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id
                }
            }
        }

        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            proces.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { img: JSON.stringify(file) })
            }
        );

        set({ newTaskInput:'' });
        
        set((state) => {
            const newColumns = new Map(state.board.columns);
             
            const newTodo : Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && {img: file})
            }

            const column = newColumns.get(columnId);

            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo]
                });
            } else {
                newColumns.get(columnId)?.todos.push(newTodo); 
            }

            return {
                board: {
                    columns: newColumns 
                }
            }
        })

    },

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

