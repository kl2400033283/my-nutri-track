'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PreviousDataPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const nutrientLogsRef = useMemoFirebase(() => 
    user ? query(collection(firestore, 'users', user.uid, 'nutrient_logs'), orderBy('date', 'desc')) : null
  , [user, firestore]);

  const mealPlansRef = useMemoFirebase(() =>
    user ? query(collection(firestore, 'users', user.uid, 'meal_plans'), orderBy('date', 'desc')) : null
  , [user, firestore]);
  
  const { data: nutrientLogs, isLoading: nutrientLogsLoading } = useCollection(nutrientLogsRef);
  const { data: mealPlans, isLoading: mealPlansLoading } = useCollection(mealPlansRef);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [isUserLoading, user, router]);

  if (!isClient || isUserLoading || nutrientLogsLoading || mealPlansLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    );
  }

  const groupDataByDate = (data: any[]) => {
    if (!data) return {};
    return data.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedNutrientLogs = groupDataByDate(nutrientLogs || []);
  const groupedMealPlans = groupDataByDate(mealPlans || []);
  const allDates = [...Object.keys(groupedNutrientLogs), ...Object.keys(groupedMealPlans)];
  const uniqueDates = [...new Set(allDates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());


  return (
    <div className="w-full max-w-4xl">
      <Card className="border-none bg-black/50 shadow-lg text-white">
        <CardHeader>
          <CardTitle>Your Data</CardTitle>
          <CardDescription>View your saved meal plans and nutrient logs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {uniqueDates.map(date => (
              <AccordionItem value={date} key={date}>
                <AccordionTrigger>{date}</AccordionTrigger>
                <AccordionContent>
                  {groupedMealPlans[date] && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Custom Meal Plans</h3>
                      {groupedMealPlans[date].map((plan: any, index: number) => (
                        <Card key={index} className="bg-white/10 mb-2">
                           <CardContent className="p-4">
                            {plan.breakfast && <p><strong>Breakfast:</strong> {plan.breakfast}</p>}
                            {plan.lunch && <p><strong>Lunch:</strong> {plan.lunch}</p>}
                            {plan.dinner && <p><strong>Dinner:</strong> {plan.dinner}</p>}
                            {plan.snacks && <p><strong>Snacks:</strong> {plan.snacks}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  {groupedNutrientLogs[date] && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Nutrient Logs</h3>
                       {groupedNutrientLogs[date].map((log: any, index: number) => (
                        <Card key={index} className="bg-white/10 mb-2">
                           <CardHeader>
                            <CardTitle className="capitalize">{log.mealType}</CardTitle>
                            <CardDescription>{log.meal}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                <div><strong>Calories:</strong> {log.calories} kcal</div>
                                <div><strong>Protein:</strong> {log.protein} g</div>
                                <div><strong>Carbs:</strong> {log.carbs} g</div>
                                <div><strong>Fat:</strong> {log.fat} g</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           {uniqueDates.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                You haven't saved any data yet. Start by logging your meals or creating a meal plan!
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
