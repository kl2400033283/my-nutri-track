'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';

export default function SnacksPage() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-lg border-none bg-black/50 shadow-lg text-white">
      <CardHeader>
        <CardTitle>What did you have for a snack?</CardTitle>
        <CardDescription>Log your snack below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="snacks-input">Snacks</Label>
            <Textarea id="snacks-input" placeholder="e.g., Apple slices with peanut butter" className="bg-white/10 text-white placeholder:text-gray-400" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>Back</Button>
        <Button>Calculate Nutrients</Button>
      </CardFooter>
    </Card>
  );
}
