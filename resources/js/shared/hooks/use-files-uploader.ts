import { ChangeEvent, useState } from 'react';

export const useFilesUploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };
    const remove = (fileName: string) => {
        setFiles(files.filter((file) => file.name !== fileName));
    };
    return {
        files,
        change,
        remove,
    };
};
