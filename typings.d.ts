
interface Board{
    columns: Map<TypeColumn, Column>;
}

type TypeColumn = "todo" | "inProgress" | "done";

interface Column{
    id: TypeColumn;
    todos: Todo[];
}

interface Todo{
    $id: string;
    $createdAt: string;
    title: string;
    status: TypeColumn;
    img?: Image;
}

interface Image{
    bucketId: string;
    fileId: string;
}