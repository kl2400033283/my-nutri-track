'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { calculateNutrients, CalculateNutrientsOutput } from '@/ai/flows/calculate-nutrients-flow';
import { Loader2 } from 'lucide-react';
import { dailyGoals } from '@/lib/utils';
import { useUser, useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

type DailyTotals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function SnacksPage() {
  const router = useRouter();
  const [snacksInput, setSnacksInput] = useState('');
  const [nutrients, setNutrients] = useState<CalculateNutrientsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dailyTotals, setDailyTotals] = useState<DailyTotals>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();


  useEffect(() => {
    setIsClient(true);
    // You might want to fetch and set daily totals from Firestore here if you implement that
  }, []);

  const handleCalculateNutrients = async () => {
    if (!snacksInput) return;
    setIsLoading(true);
    setNutrients(null);
    try {
      const result = await calculateNutrients({ meal: snacksInput, mealType: 'snacks' });
      setNutrients(result);
      
      if (user && firestore) {
        const nutrientLog = {
          date: new Date().toISOString(),
          mealType: 'snacks',
          meal: snacksInput,
          ...result,
        };
        const nutrientLogsRef = collection(firestore, 'users', user.uid, 'nutrient_logs');
        addDocumentNonBlocking(nutrientLogsRef, nutrientLog);
      }

    } catch (error) {
      console.error("Failed to calculate nutrients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const remaining = {
    calories: dailyGoals.calories - dailyTotals.calories - (nutrients?.calories || 0),
    protein: dailyGoals.protein - dailyTotals.protein - (nutrients?.protein || 0),
    carbs: dailyGoals.carbs - dailyTotals.carbs - (nutrients?.carbs || 0),
    fat: dailyGoals.fat - dailyTotals.fat - (nutrients?.fat || 0),
  };

  if (!isClient) return null;

  return (
    <Card className="w-full max-w-2xl border-none bg-black/50 shadow-lg text-white">
      <CardHeader>
        <CardTitle>What did you have for a snack?</CardTitle>
        <CardDescription>Log your snack below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="snacks-input">Snacks</Label>
            <Textarea
              id="snacks-input"
              placeholder="e.g., Apple slices with peanut butter"
              className="bg-white/10 text-white placeholder:text-gray-400"
              value={snacksInput}
              onChange={(e) => setSnacksInput(e.target.value)}
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
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-lg bg-white/10 p-4">
              <div className="col-span-2 text-center text-xl font-bold mb-2">Meal Nutrients</div>
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
              <div className="col-span-2 border-t border-white/20 my-2"></div>
              <div className="col-span-2 text-center text-xl font-bold mb-2">Remaining Daily Balance</div>
              <div>
                <p className="font-bold text-lg">Calories</p>
                <p>{remaining.calories} kcal</p>
              </div>
              <div>
                <p className="font-bold text-lg">Protein</p>
                <p>{remaining.protein} g</p>
              </div>
              <div>
                <p className="font-bold text-lg">Carbs</p>
                <p>{remaining.carbs} g</p>
              </div>
              <div>
                <p className="font-bold text-lg">Fat</p>
                <p>{remaining.fat} g</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>Back</Button>
        <Button onClick={handleCalculateNutrients} disabled={isLoading || !snacksInput}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Calculate Nutrients
        </Button>
      </CardFooter>
    </Card>
  );
}
