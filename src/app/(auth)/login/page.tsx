import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "Login"
    }
}

const Login = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold">Login</h1>
        </div>
    )
}

export default Login