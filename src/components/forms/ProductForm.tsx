// este es el formulario que se usra para agregar y editar productos
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ProductSchema } from "@/src/lib/zod";
import IButton from "../ui/IButton";
import Input from "../ui/Input";

// Tipos generados a partir de Zod
type ProductFormValues = z.infer<typeof ProductSchema>;

interface ProductFormProps {
    // onSubmit viene del padre (admin page o modal)
    onSubmit: (values: ProductFormValues) => Promise<{ success?: boolean; error?: string | null }>;
    // Valores iniciales para modo "editar"
    defaultValues?: Partial<ProductFormValues>;
    submitLabel?: string;
}

const ProductForm = ({
    onSubmit,
    defaultValues,
    submitLabel = "Save product",
}: ProductFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            inStock: true,
            quantity: 0,
            price: 0,
            description: "",
            imageUrl: "",
            ...defaultValues, // si vienen valores para editar, se sobreescriben
        },
    });

    // Handler del submit, se conecta con la server action que venga del padre
    const onSubmitHandler = async (values: ProductFormValues) => {
        const result = await onSubmit(values);
        // Aquí podrías manejar errores si quieres mostrar algo en el form
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1">
                <label htmlFor="name" className={`text-sm font-medium ${errors.name ? "text-red-500" : ""}`}>
                    Product name
                </label>
                <Input
                    id="name"
                    placeholder="Product name"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>

            {/* En stock */}
            <div className="flex items-center gap-2">
                <input
                    id="inStock"
                    type="checkbox"
                    className="h-4 w-4"
                    {...register("inStock")}
                />
                <label htmlFor="inStock" className="text-sm">
                    In stock
                </label>
            </div>

            {/* Cantidad */}
            <div className="space-y-1">
                <label htmlFor="quantity" className={`text-sm font-medium ${errors.quantity ? "text-red-500" : ""}`}>
                    Quantity
                </label>
                <Input
                    id="quantity"
                    type="number"
                    min={0}
                    {...register("quantity", { valueAsNumber: true })} // valueAsNumber para que Zod reciba number
                />
                {errors.quantity && (
                    <p className="text-sm text-red-500">{errors.quantity.message}</p>
                )}
            </div>

            {/* Precio */}
            <div className="space-y-1">
                <label htmlFor="price" className={`text-sm font-medium ${errors.price ? "text-red-500" : ""}`}>
                    Price
                </label>
                <Input
                    id="price"
                    type="number"
                    min={0}
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
            </div>

            {/* Descripción */}
            <div className="space-y-1">
                <label htmlFor="description" className={`text-sm font-medium ${errors.description ? "text-red-500" : ""}`}>
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    rows={3}
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
            </div>

            {/* URL de la imagen */}
            <div className="space-y-1">
                <label htmlFor="imageUrl" className={`text-sm font-medium ${errors.imageUrl ? "text-red-500" : ""}`}>
                    Image URL
                </label>
                <Input
                    id="imageUrl"
                    placeholder="https://..."
                    {...register("imageUrl")}
                />
                {errors.imageUrl && (
                    <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
                )}
            </div>

            <IButton type="submit" variant="primary" size="md">
                {submitLabel}
            </IButton>
        </form>
    );
};

export default ProductForm;
