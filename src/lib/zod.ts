import z from "zod";


// asi se valida con zod ahora con la ultima version
// validacion de login
export const LoginInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

// validacion para el register
export const RegisterInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    name: z
        .string()
        .min(1, "Name is requerid")
        .max(20, "name must be less than 20 characters"),
    username: z  //este ese opcional
        .string()
        .max(20, "name must be less than 20 characters")
});


// Validación para crear/editar productos
export const ProductSchema = z.object({
    name: z
        .string()
        .min(1, "Product name is required")
        .max(100, "Product name must be less than 100 characters"),

    inStock: z.boolean(), // checkbox true/false

    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(0, "Quantity cannot be negative"),

    price: z
        .number()
        .min(0, "Price cannot be negative"),

    description: z
        .string()
        .max(300, "Description must be less than 300 characters")
        .optional()
        .or(z.literal("")), // permitimos string vacío

    imageUrl: z
        .string()
        .url("Invalid URL")
        .optional()
        .or(z.literal("")), // permitimos vacío si no quiere imagen todavía
});