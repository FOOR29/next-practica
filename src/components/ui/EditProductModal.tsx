"use client"

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import z from "zod";
import { ProductSchema } from "@/src/lib/zod";
import IButton from "../ui/IButton";
import { updateProductAction } from "@/src/actions/product-actions";
import ProductForm from "../forms/ProductForm";

// Tipo para los valores del formulario
type ProductFormValues = z.infer<typeof ProductSchema>;

// Props que recibe el modal
interface EditProductModalProps {
    product: {
        id: string;
        name: string;
        inStock: boolean;
        quantity: number;
        price: number; // lo convertiremos a number en la página de admin
        description: string | null;
        imageUrl: string | null;
    };
}

const EditProductModal = ({ product }: EditProductModalProps) => {
    // Estado para abrir/cerrar el modal
    const [isOpen, setIsOpen] = useState(false);
    // Estado de transición para deshabilitar botón mientras guarda
    const [isPending, startTransition] = useTransition();
    // Estado para mostrar error simple
    const [error, setError] = useState<string | null>(null);

    // Handler que se pasa a ProductForm
    const handleUpdate = async (values: ProductFormValues) => {
        setError(null);

        let result = { success: false as boolean, error: null as string | null };

        startTransition(async () => {
            const response = await updateProductAction(product.id, values);

            if (response.error) {
                result = { success: false, error: response.error };
                setError(response.error);
            } else {
                result = { success: true, error: null };
                setIsOpen(false); // cerrar modal al guardar bien
            }
        });

        return result;
    };

    return (
        <>
            {/* Botón que abre el modal */}
            <IButton
                variant="secondary"
                size="sm"
                onClick={() => setIsOpen(true)}
            >
                Edit
            </IButton>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Edit product</h2>
                                <button
                                    className="text-sm text-neutral-500 hover:text-neutral-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>
                            </div>

                            {error && (
                                <p className="mb-2 text-sm text-red-500">
                                    {error}
                                </p>
                            )}

                            {/* Reutilizamos el mismo formulario pero con defaultValues */}
                            <ProductForm
                                onSubmit={handleUpdate}
                                submitLabel={isPending ? "Saving..." : "Save changes"}
                                defaultValues={{
                                    name: product.name,
                                    inStock: product.inStock,
                                    quantity: product.quantity,
                                    price: product.price,
                                    description: product.description || "",
                                    imageUrl: product.imageUrl || "",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EditProductModal;
