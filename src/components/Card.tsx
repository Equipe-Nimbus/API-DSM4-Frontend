'use client';
import Image from "next/image";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

interface CardProps {
    imageSrc: string;
    altText: string;
    title: string;
    buttonText: string;
    linkTo: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, altText, title, buttonText, linkTo }) => {
    const router = useRouter()
    return (
        <div className="h-fit grow bg-bg-100 flex flex-col gap-3 items-center py-8 rounded-md shadow-md">
            <span><Image src={imageSrc} alt={altText} width={40} height={40}/></span>
            <span className="text-text-on-background text-lg font-medium">{title}</span>
            <Button text={buttonText} variant="ghost" onClick={() => router.push(linkTo)}/>
        </div>
    );
}

export default Card;