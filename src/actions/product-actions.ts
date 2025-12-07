// este arhvio es para el crud de productos

"use server"

import z from "zod";
import { db } from "../lib/db";
import { auth } from "../auth";
import { ProductSchema } from "../lib/zod";
import { revalidatePath } from "next/cache";


// Acción para crear producto
export const createProductAction = async (values: z.infer<typeof ProductSchema>) => {
    // Obtenemos la sesión
    const session = await auth();

    // Validamos que haya sesión y que sea admin
    if (!session?.user || session.user.role !== "admin") {
        return { error: "Not authorized" };
    }

    // Validamos los datos con Zod
    const parsed = ProductSchema.safeParse(values);
    if (!parsed.success) {
        return { error: "Invalid data" };
    }

    // Creamos el producto asociado al admin autenticado
    await db.product.create({
        data: {
            name: parsed.data.name,
            inStock: parsed.data.inStock,
            quantity: parsed.data.quantity,
            price: parsed.data.price,
            description: parsed.data.description || null,
            imageUrl: parsed.data.imageUrl || null,
            userId: session.user.id, // gracias al callback de jwt/session
        },
    });

    // Revalidamos la página de admin para que se vea el nuevo producto
    revalidatePath("/protected/admin");

    return { success: true };
};


// Acción para actualizar producto existente
export const updateProductAction = async (
    productId: string,
    values: z.infer<typeof ProductSchema>
) => {
    const session = await auth();

    // Solo admins pueden editar
    if (!session?.user || session.user.role !== "admin") {
        return { error: "Not authorized" };
    }

    // Validar datos con Zod
    const parsed = ProductSchema.safeParse(values);
    if (!parsed.success) {
        return { error: "Invalid data" };
    }

    // Solo permitimos editar productos que sean de este admin
    const product = await db.product.findUnique({
        where: { id: productId },
    });

    if (!product || product.userId !== session.user.id) {
        return { error: "Product not found or not owned by you" };
    }

    await db.product.update({
        where: { id: productId },
        data: {
            name: parsed.data.name,
            inStock: parsed.data.inStock,
            quantity: parsed.data.quantity,
            price: parsed.data.price,
            description: parsed.data.description || null,
            imageUrl: parsed.data.imageUrl || null,
        },
    });

    // Para refrescar la lista de productos del admin
    revalidatePath("/protected/admin");
    return { success: true };
};


// Acción para eliminar producto
export const deleteProductAction = async (productId: string) => {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
        return { error: "Not authorized" };
    }

    // Aseguramos que el producto sea del admin actual
    const product = await db.product.findUnique({
        where: { id: productId },
    });

    if (!product || product.userId !== session.user.id) {
        return { error: "Product not found or not owned by you" };
    }

    await db.product.delete({
        where: { id: productId },
    });

    revalidatePath("/protected/admin");
    return { success: true };
};
