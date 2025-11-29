'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { calculateNutrients, CalculateNutrientsOutput } from '@/ai/flows/calculate-nutrients-flow';
import { Loader2 } from 'lucide-react';

export default function BreakfastPage() {
  const router = useRouter();
  const [breakfastInput, setBreakfastInput] = useState('');
  const [nutrients, setNutrients] = useState<CalculateNutrientsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculateNutrients = async () => {
    if (!breakfastInput) return;
    setIsLoading(true);
    setNutrients(null);
    try {
      const result = await calculateNutrients({ meal: breakfastInput, mealType: 'breakfast' });
      setNutrients(result);
    } catch (error) {
      console.error("Failed to calculate nutrients:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg border-none bg-black/50 shadow-lg text-white">
      <CardHeader>
        <CardTitle>What did you have for breakfast?</CardTitle>
        <CardDescription>Log your breakfast meal below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="breakfast-input">Breakfast</Label>
            <Textarea
              id="breakfast-input"
              placeholder="e.g., Oatmeal with berries and nuts"
              className="bg-white/10 text-white placeholder:text-gray-400"
              value={breakfastInput}
              onChange={(e) => setBreakfastInput(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {isLoading && (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="ml-2">Calculating nutrients...</p>
            </div>
          )}
          {nutrients && (
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-white/10 p-4">
              <div>
                <p className="font-bold text-lg">Calories</p>
                <p>{nutrients.calories} kcal</p>
              </div>
              <div>
                <p className="font-bold text-lg">Protein</p>
                <p>{nutrients.protein} g</p>
              </div>
              <div>
                <p className="font-bold text-lg">Carbs</p>
                <p>{nutrients.carbs} g</p>
              </div>
              <div>
                <p className="font-bold text-lg">Fat</p>
                <p>{nutrients.fat} g</p>
              </div>
              <div className="col-span-2 mt-2">
                <p className="font-bold text-lg">Feedback</p>
                <p className="text-sm">{nutrients.feedback}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>Back</Button>
        <Button onClick={handleCalculateNutrients} disabled={isLoading || !breakfastInput}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Calculate Nutrients
        </Button>
      </CardFooter>
    </Card>
  );
}
