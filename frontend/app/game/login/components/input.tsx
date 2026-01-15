'use client';
import { inputProps } from "./interfaces/input.interface";

export default function Input({ name, label, type, value, onChange }: inputProps) {
    return (
        <div
            className="group relative rounded-lg border
             focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 
             focus-within:ring focus-within:ring-sky-300/30">
            <div className="flex justify-between">
                <label className="
                    text-xs font-medium 
                    text-muted-foreground
                    group-focus-within:text-white
                    text-gray-400">{label}
                </label>
            </div>
            <div className="flex items-center">
                <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 
                    placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0
                     focus:ring-teal-500 sm:leading-7 text-foreground"
                />
            </div>
        </div>
    );
}