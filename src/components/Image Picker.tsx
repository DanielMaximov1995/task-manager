import React, {useEffect, useState} from 'react'
import { defaultImages as images } from '@/services/images'
import Link from "next/link";
import Image from 'next/image'
import {Check} from "lucide-react";
import {CustomEventTarget} from "@/types/others";

type ImageType = {
    name : string;
    handleChange : (e : CustomEventTarget) => void
}

const ImagePicker = (props: ImageType) => {
    const { name, handleChange } = props;
    const [selectedImageId, setSelectedImageId] = useState("");

    useEffect(() => {
        if (selectedImageId) {
            let findImage = images.find(image => image.id === selectedImageId)
            handleChange({ target: { name : "imageThumbUrl", value: findImage?.urls.thumb! } });
            handleChange({ target: { name : "imageFullUrl", value: findImage?.urls.full! } });
            handleChange({ target: { name : "imageLinkHTML", value: findImage?.links.html! } });
        }
    }, [selectedImageId]);

    return (
        <div className="grid grid-cols-3 gap-2 mb-2">
            {images.map((image) => (
                <div
                    key={image.id}
                    className={
                        "cursor-pointer relative h-20 w-full aspect-video group hover:opacity-75 transition bg-muted"
                    }
                    onClick={() => {
                        setSelectedImageId((prev) =>
                            prev === image?.id ? "" : image?.id
                        );
                    }}
                >
                    <input
                        type="radio"
                        id={image.id}
                        name={name}
                        className="hidden"
                        checked={selectedImageId === image.id}
                        onChange={() => {}}
                        value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                    />
                    <Image
                        src={image.urls.thumb}
                        alt="Unsplash image"
                        className="object-cover rounded-sm"
                        fill
                    />
                    {selectedImageId === image.id && (
                        <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
export default ImagePicker
