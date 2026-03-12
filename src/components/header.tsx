"use client";

import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

export function Header() {
    const { isSignedIn, isLoaded } = useAuth();

    return (
        <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-white/5">
            <div className="container flex h-20 items-center justify-between px-8 mx-auto">
    
                <h1 className="text-2xl font-black tracking-tighter bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    Promptly
                </h1>

                <nav className="flex items-center gap-6">
                    {!isLoaded ? (
                        <div className="w-20 h-8 animate-pulse bg-slate-800/50 rounded-full" />
                    ) : (
                        <>
                            {isSignedIn ? (
                                <>
                                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400 bg-transparent rounded-full gap-2">
                                        <PlusCircle className="h-4 w-4" /> Novo Prompt
                                    </Button>
                                    <UserButton />
                                </>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="text-sm font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors cursor-pointer">
                                        Entrar
                                    </button>
                                </SignInButton>
                            )}
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}