"use client"

import { useState, startTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import IButton from "../ui/IButton";
import { createProductAction } from "@/src/actions/product-actions";
import z from "zod";
import { ProductSchema } from "@/src/lib/zod";
import ProductForm from "../forms/ProductForm";

// Este componente muestra el botón "+" y el modal con el formulario
const ProductModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Handler de crear producto, conecta con la server action
    const handleCreateProduct = async (values: z.infer<typeof ProductSchema>) => {
        let result = { success: false, error: null as string | null };

        await startTransition(async () => {
            const response = await createProductAction(values);
            if (response.error) {
                result = { success: false, error: response.error };
            } else {
                result = { success: true, error: null };
                setIsOpen(false); // cerramos el modal al crear correctamente
            }
        });

        return result;
    };

    return (
        <>
            {/* Botón + para abrir el modal */}
            <IButton
                variant="secondary"
                size="md"
                className="rounded-full h-10 w-10 flex items-center justify-center"
                onClick={() => setIsOpen(true)}
            >
                +
            </IButton>

            {/* Modal animado */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Contenedor del modal */}
                        <motion.div
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Create product</h2>
                                <button
                                    className="text-sm text-neutral-500 hover:text-neutral-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>
                            </div>

                            {/* Formulario reutilizable */}
                            <ProductForm
                                onSubmit={handleCreateProduct}
                                submitLabel="Create product"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductModal;
