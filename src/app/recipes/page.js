import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function RecipesPage() {
    const supabase = await createClient();
    
    const { data: recipes, error } = await supabase
        .from("recipes")
        .select(
        "id, title, slug, short_description, hero_image_url, prep_time_minutes, cook_time_minutes, total_time_minutes, calories_per_serving"
        )
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) {
        return <div>Error loading recipes: {error.message}</div>;
    }

    return (
        <div className="font-sans">
            <main className="w-full py-32 px-16 grid grid-cols-16 gap-8">
                <div className="col-span-4 bg-paper border border-solid border-sage">
                    <h2 className="text-[20pt] border-b border-solid border-sage py-2 px-4">Filter Recipes</h2>

                    <div className="px-4 mt-2">
                        <h3 className="text-text text-[14pt]">Diets</h3>
                        <div className="mt-2">
                            <input id="vegetarian" type="checkbox" value="" className="w-4 h-4 bg-olive"></input>
                            <label htmlFor="vegetarian" className="select-none mr-4 ms-2 text-sm font-medium text-heading">Vegetarian</label>
                        </div>
                        <div>
                            <input id="vegan" type="checkbox" value="" className="w-4 h-4 bg-olive"></input>
                            <label htmlFor="vegan" className="select-none mr-4 ms-2 text-sm font-medium text-heading">Vegan</label>
                        </div>
                        <div>
                            <input id="dairy-free" type="checkbox" value="" className="w-4 h-4 bg-olive"></input>
                            <label htmlFor="dairy-free" className="select-none mr-4 ms-2 text-sm font-medium text-heading">Dairy-Free</label>
                        </div>
                        <div>
                            <input id="gluten-free" type="checkbox" value="" className="w-4 h-4 bg-olive"></input>
                            <label htmlFor="gluten-free" className="select-none mr-4 ms-2 text-sm font-medium text-heading">Gluten-Free</label>
                        </div>
                    </div>

                    <div className="px-4 mt-2">
                        <h3 className="text-text text-[14pt]">Allergies</h3>
                    </div>
                    
                </div>
                <div className="col-span-12">
                    <h1 className="text-4xl font-bold text-olive mb-8">Recipes</h1>

                    {!recipes || recipes.length === 0 ? (
                        <p>No recipes found yet.</p>
                    ) : (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full"
                        >
                        {recipes.map((recipe) => (
                            <article
                                key={recipe.slug}
                                className="col-span-1 p-4">
                                <Link href={`/recipes/${recipe.slug}`} className="block">
                                    {recipe.hero_image_url ? (
                                        <img
                                        src={recipe.hero_image_url}
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover mb-4"
                                        />
                                    ) : (
                                        <div
                                        className="w-full h-48 bg-sage flex items-center justify-center mb-4"
                                        />
                                    )}
                                </Link>
                                <div className="grid grid-cols-2">
                                    <h2 className="text-xl font-bold text-olive mb-2 hover:text-olive/80 transition">
                                        <Link href={`/recipes/${recipe.slug}`}>
                                            {recipe.title}
                                        </Link>
                                    </h2>

                                    <Link 
                                        href={`/recipes/${recipe.slug}`}
                                        className="justify-self-end text-text/80 font-semibold font-sans"
                                    >
                                        {recipe.total_time_minutes && <p>Total: {recipe.total_time_minutes} mins</p>}
                                    </Link>

                    

                                    {recipe.short_description && (
                                        <p className="text-text mb-2 col-span-2">
                                        {recipe.short_description}
                                        </p>
                                    )}                     
                                </div>
                            </article>
                        ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}