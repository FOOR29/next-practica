import RegisterForm from "@/src/components/forms/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "Register"
    }
}

const Reister = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    )
}

export default Reister