import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-brand-text">
            Keane Kings Cook
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-#333">
            Recipes for the home cook, by the home cook. A collection of tried-and-true recipes that are easy to follow and delicious to eat. Whether you're a beginner or a seasoned pro, you'll find something here to inspire your next meal.
          </p>
          <Link href="/recipes">Browse recipes</Link>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/recipes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Recipes
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="/recipes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Cooking
          </a>
        </div>
      </main>
    </div>
  );
}
