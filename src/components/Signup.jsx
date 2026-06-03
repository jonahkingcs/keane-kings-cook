"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Signup() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        setMessage("Account created. Check your email if confirmation is enabled.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md m-auto pt-24"
        >
            <h2 className="pb-2">Sign Up</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border border-text focus:ring-1 focus:ring-text focus:outline-none px-2 py-1"
                />

                <button
                    type="submit"
                    className="py-1 px-2 bg-olive text-paper mt-4"
                >
                    Sign Up
                </button>
            </div>

            {errorMessage && <p className="text-terracotta mt-2">{errorMessage}</p>}

            {message && <p className="text-olive mt-2">{message}</p>}
        </form>
    );
}