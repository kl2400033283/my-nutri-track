'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/features/LoginForm';
import { ThreeDeePerspectify } from '@/components/features/ThreeDeePerspectify';
import { shouldLookAway } from '@/ai/flows/password-obfuscation';
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [isLookingAway, setIsLookingAway] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = async (password: string) => {
    try {
      const result = await shouldLookAway({ passwordInput: password });
      setIsLookingAway(result.shouldLookAway);
    } catch (error) {
      console.error('AI flow failed:', error);
      toast({
        variant: "destructive",
        title: "AI Feature Error",
        description: "Could not get response from AI. Using fallback behavior.",
      })
      // Fallback behavior
      setIsLookingAway(password.length > 0);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-6 font-body overflow-hidden">
      <div className="relative w-full max-w-sm">
        <ThreeDeePerspectify lookAway={isLookingAway} />
        <div className="relative z-10">
          <LoginForm onPasswordChange={handlePasswordChange} />
        </div>
      </div>
    </main>
  );
}
