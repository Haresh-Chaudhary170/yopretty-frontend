import React from "react";
import Image from 'next/image';

interface ImagePreviewProps {
    image: string;  // Array of image URLs
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {


    return (
        <>
            <div className="relative aspect-square w-28">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${image}`}
                    alt={`preview`}
                    fill
                    className='rounded-lg'
                />

            </div>
        </>
    );
};

export default ImagePreview;
