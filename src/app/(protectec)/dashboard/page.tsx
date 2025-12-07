import { auth } from "@/src/auth"
import LogoutButton from "@/src/components/ui/Logout-Button"

const DashboardPage = async () => {
    const sessison = await auth()

    if (!sessison) {
        return <div>Not autenticado</div>
    }

    return (
        <div>
            <pre>
                {
                    JSON.stringify(sessison, null, 2)
                }
            </pre>
            <LogoutButton />
        </div>
    )
}
export default DashboardPage