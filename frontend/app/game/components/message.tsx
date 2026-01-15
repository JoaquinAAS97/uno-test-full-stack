'use client';
import { MessageProps } from "./interface/message.interface";

export default function MessageComponent({ text, context }: MessageProps) {
    const bgColor = context === "error" ? "bg-red-900" : context === "success" ? "bg-green-900" : "bg-gray-900";
    return (
        <div className={`${bgColor}`}>
            <p
                className="text-blue-50"
            >{text}</p>
        </div>
    );
}