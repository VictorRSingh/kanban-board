
type SubmitButtonProps = {
    label: string;
} & React.InputHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({label, ...buttonProps}: SubmitButtonProps) {
    return (
        <div className="w-full text-center">
            <button className="bg-green-500 hover:bg-green-700 transition-all ease-in-out w-full px-4 py-2 rounded font-semibold cursor-pointer" {...buttonProps} type="submit">{label}</button>
        </div>
    )
}