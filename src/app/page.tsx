'use client';
import { useState, useEffect } from "react";
import { ArrowRight, GithubIcon, Baby, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.24 10.28c0-1.48-.13-2.65-.13-2.65H12v2.8h5.07c-.22 1.05-.72 2.1-1.64 2.82v1.9h2.45c1.43-1.32 2.26-3.2 2.26-5.32s0-4.2-.1-4.7z" fill="#4285F4"/>
    <path d="M12 21c2.4 0 4.43-.8 5.9-2.18l-2.45-1.9c-.8.54-1.83.85-2.95.85-2.28 0-4.2-1.54-4.88-3.6H4.26v1.97C5.7 19.1 8.63 21 12 21z" fill="#34A853"/>
    <path d="M7.12 14.33c-.18-.54-.28-1.1-.28-1.68s.1-1.14.28-1.68V9h-2.9c-.5.98-.78 2.08-.78 3.25s.27 2.27.78 3.25l2.9-1.92z" fill="#FBBC05"/>
    <path d="M12 6.58c1.3 0 2.48.45 3.4.9l2.17-2.18C16.43 3.53 14.4 2.5 12 2.5 8.63 2.5 5.7 4.4 4.26 6.97l2.86 2.22c.68-2.06 2.6-3.6 4.88-3.6z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
        <path d="M10 2c1 .5 2 2 2 5"/>
    </svg>
);

const SeniorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
    <path d="M12 11.5v5.5a1 1 0 0 0 1 1h1.5"/>
    <path d="m14 13-1.5 6"/>
    <path d="M10.5 11.5 9 20"/>
    <path d="M18.5 11H16a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1h-1"/>
  </svg>
);


export default function Home() {
  const [formView, setFormView] = useState('signin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showContentBlocks, setShowContentBlocks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
      setShowContentBlocks(true);
    }
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowSuccessDialog(true);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowSuccessDialog(true);
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    setShowContentBlocks(true);
  }

  return (
    <>
      {!isLoggedIn && (
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/20 p-8 shadow-2xl backdrop-blur-lg">
          {formView === 'signin' ? (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
                  <AppleIcon className="h-6 w-6 text-white/80" />
                </div>
                <h1 className="text-2xl font-bold text-white">NUTRI-TRACK</h1>
                <p className="text-sm text-gray-400">Please enter your details to sign in.</p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="email" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="password" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="remember" className="border-white/30 text-primary data-[state=checked]:bg-primary"/>
                    <Label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-400">Remember me</Label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/80">
                  Sign In
                </Button>

                <div className="flex items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="mx-4 flex-shrink text-xs text-gray-400">OR</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-between border-white/20 bg-white/5 hover:bg-white/10 hover:text-white">
                    <div className="flex items-center gap-2">
                      <GoogleIcon className="h-5 w-5"/>
                      Continue with Google
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between border-white/20 bg-white/5 hover:bg-white/10 hover:text-white">
                    <div className="flex items-center gap-2">
                      <GithubIcon className="h-5 w-5"/>
                      Continue with GitHub
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <button onClick={() => setFormView('signup')} className="font-medium text-primary hover:underline">
                  Create Account
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
                  <AppleIcon className="h-6 w-6 text-white/80" />
                </div>
                <h1 className="text-2xl font-bold text-white">Create Account</h1>
                <p className="text-sm text-gray-400">Please fill in the details to register.</p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="fullname" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Full Name</Label>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="email-signup" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="password-signup" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="Create a password"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/80">
                  Sign Up
                </Button>
              </form>
              
              <div className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <button onClick={() => setFormView('signin')} className="font-medium text-primary hover:underline">
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {isLoggedIn && (
        <>
          <Dialog open={showSuccessDialog} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Success!</DialogTitle>
                <DialogDescription>
                  You have successfully signed in.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleDialogClose}>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {showContentBlocks && (
            <div className="flex flex-col items-center gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Link href="/child">
                  <Card className="flex h-48 w-64 cursor-pointer items-center justify-center border-none bg-black/50 shadow-lg">
                    <CardContent className="flex flex-col items-center gap-2 p-0">
                      <Baby className="h-12 w-12 text-white" />
                      <h2 className="text-2xl font-bold text-white">CHILD</h2>
                    </CardContent>
                  </Card>
                </Link>
                <Card className="flex h-48 w-64 items-center justify-center border-none bg-black/50 shadow-lg">
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <User className="h-12 w-12 text-white" />
                    <h2 className="text-2xl font-bold text-white">ADULT</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-64 items-center justify-center border-none bg-black/50 shadow-lg">
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <SeniorIcon className="text-white" />
                    <h2 className="text-2xl font-bold text-white">SENIOR CITIZEN</h2>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6 flex h-32 w-[calc(192px*3+48px)] max-w-full items-center justify-center border-none bg-black/50 shadow-lg sm:w-[calc(256px*3+48px)]">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-white">Meal Planner</h2>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
}
