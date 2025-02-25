import React from "react";
import axios from "axios";
import Image from 'next/image';

interface ImagePreviewProps {
    serviceId: string;
    images: string[];  // Array of image URLs
    onImageRemove: (imageUrl: string) => void; // Callback function to handle image removal
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ serviceId, images, onImageRemove }) => {
    const handleRemoveImage = async (imageUrl: string) => {
        console.log(imageUrl)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/delete-image`, { serviceId: serviceId, imageName: imageUrl }, { withCredentials: true });
            onImageRemove(imageUrl);
        } catch (error) {
            console.error("Error removing image", error);
        }
    };

    return (
        <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
                <div key={index} className="relative aspect-square w-28">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${image}`}
                        alt={`preview-${index}`}
                        fill
                        className='rounded-lg'
                    />
                    <span
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 hover:cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ImagePreview;
