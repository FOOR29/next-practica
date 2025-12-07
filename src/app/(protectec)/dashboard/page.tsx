import { auth } from "@/src/auth";
import { db } from "@/src/lib/db";
import LogoutButton from "@/src/components/ui/Logout-Button";
import IButton from "@/src/components/ui/IButton";

const DashboardPage = async () => {
    const session = await auth();

    if (!session) {
        return <div>Not authenticated</div>;
    }

    // Traemos todos los productos para el usuario normal
    const products = await db.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    // con esto muestra el user si tiene user, si no muestra el email y por ultimo el nombre si no tiene correo
    const displayName =
        // @ts-ignore
        session.user.username ||
        session.user.name ||
        session.user.email;

    return (
        <div className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome back, {session.user.name}</h1>
                    <p className="text-sm text-neutral-500">
                        {displayName}
                    </p>
                </div>
                <LogoutButton />
            </header>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">All products</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-xl border border-neutral-200 p-4 space-y-2"
                        >
                            <h3 className="font-semibold">{product.name}</h3>
                            {product.imageUrl && (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-32 w-full rounded-lg object-cover"
                                />
                            )}
                            <p className="text-sm text-neutral-600">
                                {product.description}
                            </p>
                            <p className="text-sm font-medium">
                                Price: ${product.price.toString()}
                            </p>
                            <p className="text-xs text-neutral-500">
                                Stock: {product.inStock ? `${product.quantity} units` : "Out of stock"}
                            </p>
                            <IButton variant="outline" size="sm">
                                Add to cart
                            </IButton>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
