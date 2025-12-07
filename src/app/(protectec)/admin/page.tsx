import { auth } from "@/src/auth";
import { db } from "@/src/lib/db";
import LogoutButton from "@/src/components/ui/Logout-Button";
import IButton from "@/src/components/ui/IButton";
import { deleteProductAction } from "@/src/actions/product-actions";
import ProductModal from "@/src/components/ui/ProductModal";
import EditProductModal from "@/src/components/ui/EditProductModal";

const AdminPage = async () => {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
        return <div>You are not admin</div>;
    }

    const products = await db.product.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Admin dashboard</h1>
                    <p className="text-sm text-neutral-500">
                        {session.user.email}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <ProductModal />
                    <LogoutButton />
                </div>
            </header>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Your products</h2>
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

                            <div className="flex gap-2 pt-2">
                                {/* Modal de edición, pasamos los datos del producto */}
                                <EditProductModal
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        inStock: product.inStock,
                                        quantity: product.quantity,
                                        price: Number(product.price), // Prisma.Decimal -> number
                                        description: product.description,
                                        imageUrl: product.imageUrl,
                                    }}
                                />

                                {/* Eliminar producto */}
                                <form
                                    action={async () => {
                                        "use server";
                                        await deleteProductAction(product.id);
                                    }}
                                >
                                    <IButton variant="outline" size="sm">
                                        Delete
                                    </IButton>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPage;
