import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function RecipePage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: recipe, error } = await supabase
        .from("recipes")
        .select(`
            id, title, slug, short_description, hero_image_url, prep_time_minutes, cook_time_minutes, calories_per_serving,
            recipe_ingredients (
                id, amount, unit, preparation_note, display_order, ingredients (
                    id, name, slug
                )
            )
        `)
        .eq("slug", slug)
        .single();

    if (error) {
        return <div>Error loading recipe: {error.message}</div>;
    }
    
    if (!recipe) {
        return <div>Recipe not found.</div>;
    }

    let ingredients = recipe.recipe_ingredients || [];

    ingredients = [...ingredients];

    ingredients.sort(function (a, b) {
        const orderA = a.display_order ?? 999;
        const orderB = b.display_order ?? 999;
        return orderA - orderB;
    });

    recipe.recipe_ingredients.forEach((item) => {
        console.log(item.ingredients?.name, item.display_order, typeof item.display_order);
    });

    return (
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-8 px-16 sm:items-start">
            <h1 className="text-2xl font-bold mb-6">{recipe.title}</h1>
            <p className="text-gray-600 mb-6">{recipe.short_description}</p>
            {ingredients.length === 0 ? (
                <p>No ingredients found.</p>
            ) : (
                <ul>
                {ingredients.map((item) => (
                    <li key={item.id}>
                    {item.amount ? `${item.amount} ` : ""}
                    {item.unit ? `${item.unit} ` : ""}
                    {item.ingredients?.name || "Unknown ingredient"}
                    {item.preparation_note ? `, ${item.preparation_note}` : ""}
                    </li>
                ))}
                </ul>
            )}
            <Link href="/recipes" className="mt-6">
                Back to recipes
            </Link>
        </main>
    );
}