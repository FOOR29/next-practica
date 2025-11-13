import { ButtonProps } from "@/src/types"

const IButton = ({ className, ...props }: ButtonProps) => {
    return (
        <button className={`bg-blue-500 py-0.5 px-2.5 rounded-4xl flex justify-center items-center font-bold cursor-pointer ${className}`}
            {...props}
        />
    )
}

export default IButton