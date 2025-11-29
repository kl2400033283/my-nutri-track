'use client';

import { useState } from "react";
import { LogOut, User, Home, Settings, Smartphone, Download, Accessibility, Languages, HelpCircle, ShieldCheck, CircleUser, Info, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "./ui/separator";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();

  const handleSignOut = () => {
    if (auth) {
      signOut(auth);
      router.push('/');
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-white">NUTRI-TRACK</h1>
        </Link>
        {user && (
          <Link href="/previous-data" className="text-white hover:text-primary">
            Data
          </Link>
        )}
      </div>
      {user && (
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background text-foreground w-80">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <nav className="flex flex-col gap-4 text-lg font-medium">
                    <Link href="#" className="flex items-center gap-4 px-2.5 py-2 text-foreground">
                      <Home className="h-6 w-6" />
                      Home
                    </Link>
                    <Separator />
                    <Accordion type="single" collapsible onValueChange={(value) => setIsSettingsOpen(value === 'settings')}>
                      <AccordionItem value="settings" className="border-b-0">
                        <AccordionTrigger className="flex items-center gap-4 px-2.5 py-2 text-foreground hover:no-underline">
                          <div className="flex items-center gap-4">
                            <Settings className="h-6 w-6" />
                            Settings
                          </div>
                          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`} />
                        </AccordionTrigger>
                        <AccordionContent className="pl-8">
                          <div className="text-sm text-gray-500 mb-2 mt-2">Your app and media</div>
                          <Link href="#" className="flex items-center justify-between py-2 text-foreground/80 hover:text-foreground">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-5 w-5" />
                              Device permissions
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                          <Link href="#" className="flex items-center justify-between py-2 text-foreground/80 hover:text-foreground">
                            <div className="flex items-center gap-2">
                              <Download className="h-5 w-5" />
                              Archiving and downloading
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                          <Link href="#" className="flex items-center justify-between py-2 text-foreground/80 hover:text-foreground">
                            <div className="flex items-center gap-2">
                              <Accessibility className="h-5 w-5" />
                              Accessibility
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                          <Link href="#" className="flex items-center justify-between py-2 text-foreground/80 hover:text-foreground">
                            <div className="flex items-center gap-2">
                              <Languages className="h-5 w-5" />
                              Language and translations
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Separator />
                    <div className="px-2.5 text-sm text-gray-500 mb-2 mt-2">More info and support</div>
                    <Link href="#" className="flex items-center justify-between px-2.5 py-2 text-foreground/80 hover:text-foreground">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5" />
                          Help
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link href="#" className="flex items-center justify-between px-2.5 py-2 text-foreground/80 hover:text-foreground">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5" />
                          Privacy Center
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link href="#" className="flex items-center justify-between px-2.5 py-2 text-foreground/80 hover:text-foreground">
                        <div className="flex items-center gap-2">
                          <CircleUser className="h-5 w-5" />
                          Account Status
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link href="#" className="flex items-center justify-between px-2.5 py-2 text-foreground/80 hover:text-foreground">
                        <div className="flex items-center gap-2">
                          <Info className="h-5 w-5" />
                          About
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                  </nav>
                </div>
                <div className="mt-auto">
                  <Separator />
                  <div className="px-2.5 text-sm text-gray-500 mb-2 mt-4">Login</div>
                  <div className="flex flex-col p-2.5">
                    <Button variant="link" className="text-blue-500 justify-start p-0 h-auto mb-4">Add account</Button>
                    <Button variant="link" className="text-red-500 justify-start p-0 h-auto mb-4" onClick={handleSignOut}>Log out</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-white/10">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
      )}
    </header>
  );
}
