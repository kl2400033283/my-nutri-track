'use client';
import { ArrowRight, GithubIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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


export default function Home() {
  const backgroundImage = PlaceHolderImages.find(img => img.id === 'fruits-background');

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6">
       {backgroundImage && <Image
        src={backgroundImage.imageUrl}
        alt={backgroundImage.description}
        fill
        className="object-cover -z-10 animate-zoom-in-out"
        data-ai-hint={backgroundImage.imageHint}
      />}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/20 p-8 shadow-2xl backdrop-blur-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
            <AppleIcon className="h-6 w-6 text-white/80" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-gray-400">Please enter your details to sign in.</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="relative">
            <Label htmlFor="email" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Email</Label>
            <div className="flex">
              <Input
                id="email"
                type="email"
                defaultValue="merveavsar@mail.com"
                className="flex-1 rounded-r-none border-r-0 bg-white/5 pr-12 text-white placeholder:text-gray-500"
              />
              <Button type="submit" size="icon" className="rounded-l-none bg-primary hover:bg-primary/80">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center">
            <Checkbox id="remember" className="border-white/30 text-primary data-[state=checked]:bg-primary"/>
            <Label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-400">Remember me</Label>
          </div>

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
          <a href="#" className="font-medium text-primary hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </main>
  );
}
