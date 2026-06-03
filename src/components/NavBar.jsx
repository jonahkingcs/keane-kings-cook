import Link from "next/link";
import { getIsAdmin } from "@/lib/getProfile";

export default async function NavBar() {
  const admin = await getIsAdmin();

  return (
    <nav className="w-full border-b border-solid border-paper text-text fixed top-0 bg-background">
      <div className="max-w-4xl mx-auto py-2 flex items-center justify-between">
        <Link href="/" className="text-lg font-playfair font-bold text-[24pt]">
          Keane King's Cook
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/recipes" className="text-sm font-medium hover:text-olive">
            Recipes
          </Link>

          {admin && (
            <Link href="/admin/add-recipe" className="text-sm font-medium hover:text-olive">
              Add Recipe
            </Link>
          )}

          <Link href="/login" className="text-sm font-medium hover:text-olive">
            Log In
          </Link>

          <Link href="/signup" className="text-sm font-medium hover:text-olive">
            Sign Up
          </Link>

          <input type="text" placeholder="Search..." className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1" />
        </div>
      </div>
    </nav>
  );
}