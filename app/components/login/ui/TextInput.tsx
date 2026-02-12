import { useEffect } from "react";

type TextInputProps = {
    label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;


export default function TextInput({label, ...inputProps}: TextInputProps) {
    return (
        <div className="flex flex-col">
            <h1>{label}</h1>
            <input className="border py-1 px-2 rounded" {...inputProps} />
        </div>
    );
}