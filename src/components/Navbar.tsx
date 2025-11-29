'use client';

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";

export default function Navbar() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
    // We can't manage other page's state from here,
    // but the redirect and localStorage clear will handle it.
    // To be fully robust, a global state management (like Context) would be needed.
    // For now, a hard refresh might be the simplest way to reset everything.
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm">
      <Link href="/">
        <h1 className="text-xl font-bold text-white">NUTRI-TRACK</h1>
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-white/10">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
