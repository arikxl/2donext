import { ID, storage } from "@/appwrite";


const uploadImg = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        '64ad06696ea0e482d1ea',
        ID.unique(),
        file
    );
    return fileUploaded;

}

export default uploadImg;




