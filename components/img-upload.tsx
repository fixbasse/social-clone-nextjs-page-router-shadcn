import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { Input } from "./ui/input";
import Image from "next/image";

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
};

export const ImageUpload = ({
    onChange,
    label,
    value,
    disabled
}: ImageUploadProps) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            setBase64(e.target?.result);
            handleChange(e.target?.result);
        }

        reader.readAsDataURL(file);
    }, [handleChange]);


    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled: disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    });


    return (
        <div
            {...getRootProps({
                className: 'w-full p-4 text-center cursor-pointer'
            })}
        >
            <Input
                {...getInputProps()}
                className="relative"
            />

            {base64 ? (
                <div className="relative w-[100px] h-[100px] mx-auto">
                    <Image
                        src={base64}
                        fill
                        alt="img-upload"
                        className="rounded-full border-2 object-cover"
                    />
                </div>
            ) : (
                <h6>
                    {label}
                </h6>
            )}

        </div>
    )
}
