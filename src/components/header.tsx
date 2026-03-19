"use client";

import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { CreatePromptModal } from "./CreatePromptModal";
import { Bookmark} from "lucide-react";
import Link from "next/link";

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
                        <div className="w-20 h-8 animate-pulse bg-slate-700/50 rounded-full" />
                    ) : (
                        <>
                            {isSignedIn ? (
                                <>
                                    <Link 
                                        href="/saves" 
                                        className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 rounded-full border border-white/5 transition-all cursor-pointer"
                                        title="Meus Salvos"
                                    >
                                        <Bookmark className="w-5 h-5" />
                                    </Link>
                                    <CreatePromptModal />
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