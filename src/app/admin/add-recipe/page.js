import { getIsAdmin } from "@/lib/getProfile";
import RecipeForm from "@/components/RecipeForm"

export default async function AddRecipe() {
    const admin = await getIsAdmin();

    if (!admin) {
        return (
            <div className="max-w-md m-auto pt-24">
                <p className="text-terracotta">You don't have permission to add recipes.</p>
            </div>
        );
    }

    return (
        <RecipeForm />
    )

}