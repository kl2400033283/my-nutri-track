'use client';
import { useState, useEffect } from "react";
import { ArrowRight, GithubIcon, BookCopy, Baby, User, PersonStanding, Coffee, Utensils, Cookie, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea";
import { generateMealPlan, GenerateMealPlanOutput } from '@/ai/flows/generate-meal-plan-flow';
import { useAuth } from '@/firebase';
import { initiateAnonymousSignIn, initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useUser } from "@/firebase/provider";


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
  const [showContentBlocks, setShowContentBlocks] = useState(false);
  const [showMealPlannerDialog, setShowMealPlannerDialog] = useState(false);
  const [showCustomPlannerDialog, setShowCustomPlannerDialog] = useState(false);
  const [showChildDialog, setShowChildDialog] = useState(false);
  const [showAdultDialog, setShowAdultDialog] = useState(false);
  const [showSeniorDialog, setShowSeniorDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GenerateMealPlanOutput | null>(null);
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsClient(true);
    if (user) {
      setShowContentBlocks(true);
    } else {
      setShowContentBlocks(false);
    }
  }, [user]);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignUp(auth, email, password);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignIn(auth, email, password);
  };

  const handleAnonymousSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  const handleOpenCustomPlanner = () => {
    setShowMealPlannerDialog(false);
    setShowCustomPlannerDialog(true);
  }

  const handleBreakfastClick = () => {
    router.push('/breakfast');
  };

  const handleLunchClick = () => {
    router.push('/lunch');
  };

  const handleSnacksClick = () => {
    router.push('/snacks');
  };

  const handleDinnerClick = () => {
    router.push('/dinner');
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setGeneratedPlan(null);
    try {
      const plan = await generateMealPlan();
      setGeneratedPlan(plan);
      setShowMealPlannerDialog(false);
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const plan = await generateMealPlan();
      setGeneratedPlan(plan);
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratedDialogClose = () => {
    setGeneratedPlan(null);
  }

  if (!isClient || isUserLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    );
  }

  return (
    <>
      {!user && (
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="password" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end">
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
                  <Button variant="outline" className="w-full justify-between border-white/20 bg-white/5 hover:bg-white/10 hover:text-white" onClick={handleAnonymousSignIn}>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5"/>
                      Continue as Guest
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
                    <Label htmlFor="email-signup" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-gray-400 backdrop-blur-sm">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="password-signup" className="absolute -top_2 left_2 inline_block bg_transparent px_1 text_xs font_medium text_gray_400 backdrop_blur_sm">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="Create a password"
                      className="w-full bg-white/5 pr-4 text-white placeholder:text-gray-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

      {user && (
        <>
          <Dialog open={!!generatedPlan} onOpenChange={(isOpen) => !isOpen && handleGeneratedDialogClose()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generated Meal Plan</DialogTitle>
                {isGenerating ? (
                  <div className="flex justify-center items-center p-10">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="ml-2">Generating new plan...</p>
                  </div>
                ) : (
                  generatedPlan && (
                    <DialogDescription>
                      <div className="space-y-2 text-left mt-4 max-h-96 overflow-y-auto">
                        <p className="font-bold">Breakfast</p>
                        <p>{generatedPlan.breakfast}</p>
                        
                        <p className="font-bold pt-2">Lunch</p>
                        <p>{generatedPlan.lunch}</p>

                        <p className="font-bold pt-2">Dinner</p>
                        <p>{generatedPlan.dinner}</p>

                        <p className="font-bold pt-2">Snacks</p>
                        <p>{generatedPlan.snacks}</p>
                      </div>
                    </DialogDescription>
                  )
                )}
              </DialogHeader>
              <DialogFooter className="gap-2 sm:justify-center">
                <Button onClick={handleRegeneratePlan} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Regenerate
                </Button>
                <DialogClose asChild>
                  <Button onClick={handleGeneratedDialogClose} variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showMealPlannerDialog} onOpenChange={setShowMealPlannerDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Meal Planner</DialogTitle>
                <DialogDescription>
                  Choose an option to create your meal plan.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:justify-center">
                <Button onClick={handleOpenCustomPlanner}>Custom Planner</Button>
                <Button onClick={handleGeneratePlan} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showCustomPlannerDialog} onOpenChange={setShowCustomPlannerDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Custom Meal Planner</DialogTitle>
                <DialogDescription>
                  Create your own personalized meal plan for the day.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="breakfast-plan">Breakfast</Label>
                  <Textarea id="breakfast-plan" placeholder="What's for breakfast?" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lunch-plan">Lunch</Label>
                  <Textarea id="lunch-plan" placeholder="What's for lunch?" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="snacks-plan">Snacks</Label>
                  <Textarea id="snacks-plan" placeholder="Any snacks?" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dinner-plan">Dinner</Label>
                  <Textarea id="dinner-plan" placeholder="What's for dinner?" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Plan</Button>
                 <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showChildDialog} onOpenChange={setShowChildDialog}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Children's Nutrition</DialogTitle>
                <DialogDescription>
                  Manage your children's nutritional needs all in one place.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-4">
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleBreakfastClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Coffee className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Breakfast</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleLunchClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Utensils className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Lunch</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleSnacksClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Cookie className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Snacks</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleDinnerClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Utensils className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Dinner</h2>
                  </CardContent>
                </Card>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showAdultDialog} onOpenChange={setShowAdultDialog}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Adult Nutrition</DialogTitle>
                <DialogDescription>
                  Manage your nutritional needs all in one place.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-4">
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleBreakfastClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Coffee className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Breakfast</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleLunchClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Utensils className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Lunch</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleSnacksClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Cookie className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Snacks</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleDinnerClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Utensils className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Dinner</h2>
                  </CardContent>
                </Card>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showSeniorDialog} onOpenChange={setShowSeniorDialog}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Senior Citizen's Nutrition</DialogTitle>
                <DialogDescription>
                  Manage your nutritional needs all in one place.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-4">
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleBreakfastClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Coffee className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Breakfast</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleLunchClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Utensils className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Lunch</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleSnacksClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Cookie className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Snacks</h2>
                  </CardContent>
                </Card>
                <Card className="flex h-48 w-48 items-center justify-center border-none bg-card shadow-lg cursor-pointer" onClick={handleDinnerClick}>
                  <CardContent className="flex flex-col items-center gap-2 p-0 text-card-foreground">
                    <Utensils className="h-10 w-10" />
                    <h2 className="text-xl font-bold">Dinner</h2>
                  </CardContent>
                </Card>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>


          {showContentBlocks && (
            <div className="flex flex-col items-center gap-6">
              
              <Card 
                className="mt-6 flex h-32 w-[calc(192px*3+48px)] max-w-full cursor-pointer items-center justify-center border-none bg-black/50 shadow-lg sm:w-[calc(256px*3+48px)]"
                onClick={() => setShowMealPlannerDialog(true)}
              >
                <CardContent className="flex flex-col items-center gap-2 p-0">
                  <BookCopy className="h-12 w-12 text-white" />
                  <h2 className="text-2xl font-bold text-white">Meal Planner</h2>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Card 
                  className="flex h-56 w-56 cursor-pointer items-center justify-center border-none bg-black/50 shadow-lg sm:h-64 sm:w-64"
                  onClick={() => setShowChildDialog(true)}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <Baby className="h-12 w-12 text-white" />
                    <h2 className="text-2xl font-bold text-white">CHILD</h2>
                  </CardContent>
                </Card>
                <Card 
                  className="flex h-56 w-56 cursor-pointer items-center justify-center border-none bg-black/50 shadow-lg sm:h-64 sm:w-64"
                  onClick={() => setShowAdultDialog(true)}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <User className="h-12 w-12 text-white" />
                    <h2 className="text-2xl font-bold text-white">ADULT</h2>
                  </CardContent>
                </Card>
                <Card 
                  className="flex h-56 w-56 cursor-pointer items-center justify-center border-none bg-black/50 shadow-lg sm:h-64 sm:w-64"
                  onClick={() => setShowSeniorDialog(true)}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <PersonStanding className="h-12 w-12 text-white" />
                    <h2 className="text-2xl font-bold text-white">SENIOR CITIZEN</h2>
                  </CardContent>
                </Card>
              </div>

            </div>
          )}
        </>
      )}
    </>
  );
}
