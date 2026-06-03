"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Signin() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [story, setStory] = useState("");
    const [healthSummary, setHealthSummary] = useState("");
    const [servings, setServings] = useState("");
    const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
    const [cookTimeMinutes, setCookTimeMinutes] = useState("");
    const [totalTimeMinutes, setTotalTimeMinutes] = useState("");
    const [caloriesPerServing, setCaloriesPerServing] = useState("");

    const [ingredientName, setIngredientName] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setErrorMessage("");

        setLoading(true);

        const supabase = createClient();

        const { error } = await supabase.from("recipes").insert({
            title,
            slug,
            short_description: shortDescription,
            story,
            health_summary: healthSummary,
            servings: parseInt(servings),
            prep_time_minutes: parseInt(prepTimeMinutes),
            cook_time_minutes: parseInt(cookTimeMinutes),
            total_time_minutes: parseInt(totalTimeMinutes),
            calories_per_serving: parseInt(caloriesPerServing),
            is_published: true,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        setMessage("Submitted successfully!");

        setTitle("");
        setSlug("");
        setShortDescription("");
        setStory("");
        setHealthSummary("");
        setServings("");
        setPrepTimeMinutes("");
        setCookTimeMinutes("");
        setTotalTimeMinutes("");
        setCaloriesPerServing("");
    }

    function handleAddIngredient() {
        const trimmed = ingredientName.trim();

        if (!trimmed) return;

        setIngredients([
            ...ingredients,
            {
                name: trimmed,
                unit: "",
                amount: "",
                note: "",
            },
        ]);

        setIngredientName("");
    }

    function handleIngredientFieldChange(index, field, value) {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value,
        };
        setIngredients(updatedIngredients);
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-6xl p-6 m-auto pt-24 grid gap-16 grid-cols-1 md:grid-cols-2"
            >   
                <div className="col-span-1">
                    <h2 className="pb-2 text-[16pt]">Create Recipe</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
                            }}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <input
                            type="text"
                            placeholder="Short Description"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <textarea
                            placeholder="Story"
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <textarea
                            placeholder="Health Summary"
                            value={healthSummary}
                            onChange={(e) => setHealthSummary(e.target.value)}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <input
                            type="number"
                            max="12"
                            placeholder="Servings"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <input
                            type="number"
                            placeholder="Prep Time (minutes)"
                            value={prepTimeMinutes}
                            onChange={(e) => setPrepTimeMinutes(e.target.value)}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <input
                            type="number"
                            placeholder="Cook Time (minutes)"
                            value={cookTimeMinutes}
                            onChange={(e) => setCookTimeMinutes(e.target.value)}
                            required
                            className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="py-1 px-2 bg-olive text-paper mt-4"
                        >
                            {loading ? "Adding Recipe..." : "Add Recipe"}
                        </button>
                    </div>

                    {errorMessage && <p className="text-terracotta mt-2">{errorMessage}</p>}

                    {message && <p className="text-olive mt-2">{message}</p>}
                </div>

                <div className="col-span-1 bg-paper border border-solid border-sage min-h-[400px]">
                    <h2 className="text-[16pt] border-b border-solid border-sage py-1 px-3">Ingredients</h2>

                    <input
                        type="text"
                        placeholder="Ingredient Name"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                        className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1 m-4"
                    />
                    <button
                        type="button"
                        onClick={handleAddIngredient}
                        className="py-1 px-3 bg-olive text-paper"
                    >
                        Add
                    </button>

                    {ingredients.length > 0 && (
                        <ul className="font-playfair mb-4 flex flex-col gap-2 px-4">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-center gap-3 min-w-0">
                                    <input
                                        type="text"
                                        placeholder="Unit"
                                        value={ingredient.unit}
                                        onChange={(e) => handleIngredientFieldChange(index, "unit", e.target.value)}
                                        className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1 w-14 shrink-0"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={ingredient.amount}
                                        onChange={(e) => handleIngredientFieldChange(index, "amount", e.target.value)}
                                        className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1 w-20 shrink-0"
                                    />

                                    <p className="shrink-0">{ingredient.name}</p>

                                    <input
                                        type="text"
                                        placeholder="Note"
                                        value={ingredient.note}
                                        onChange={(e) => handleIngredientFieldChange(index, "note", e.target.value)}
                                        className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1 flex-1 min-w-0"
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    
                </div>
            </form>
        </div>
    )
}