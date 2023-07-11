import { databases } from "@/appwrite"
import Board from "@/components/Board";

export const getTodosGroupByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );
        
    const todos = data.documents;

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.img && { img: todo.img })
            // ...(todo.img && { img: JSON.parse(todo.img) })
        });

        return acc;

        
    }, new Map<TypeColumn, Column>)
    

    const columnTypes: TypeColumn[] = ['todo', 'inProgress', 'done'];
    for (const columnType of columnTypes) {
        columns.set(columnType, {
            id: columnType,
            todos: []
        });
    }

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    );

    const board: Board = {
        columns: sortedColumns
    } 

    return board;
};