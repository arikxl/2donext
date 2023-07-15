import { databases } from '@/appwrite';
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn';
import { create } from 'zustand';

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateDotosInDB: (todo: Todo, columnId: TypeColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypeColumn, Column>()
    },
    getBoard:async() => {
        const board = await getTodosGroupByColumn();
        set({board})
    },
    setBoardState: (board) => set({ board }),
    
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

