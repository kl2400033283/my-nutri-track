'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Utensils, Cookie } from "lucide-react";

export default function AdultPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Adult Nutrition Hub</h1>
        <p className="text-lg text-gray-300">Manage your nutritional needs all in one place.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Card className="flex h-56 w-56 items-center justify-center border-none bg-black/50 shadow-lg">
          <CardContent className="flex flex-col items-center gap-2 p-0">
            <Coffee className="h-12 w-12 text-white" />
            <h2 className="text-2xl font-bold text-white">Breakfast</h2>
          </CardContent>
        </Card>
        <Card className="flex h-56 w-56 items-center justify-center border-none bg-black/50 shadow-lg">
          <CardContent className="flex flex-col items-center gap-2 p-0">
            <Utensils className="h-12 w-12 text-white" />
            <h2 className="text-2xl font-bold text-white">Lunch</h2>
          </CardContent>
        </Card>
        <Card className="flex h-56 w-56 items-center justify-center border-none bg-black/50 shadow-lg">
          <CardContent className="flex flex-col items-center gap-2 p-0">
            <Cookie className="h-12 w-12 text-white" />
            <h2 className="text-2xl font-bold text-white">Snacks</h2>
          </CardContent>
        </Card>
        <Card className="flex h-56 w-56 items-center justify-center border-none bg-black/50 shadow-lg">
          <CardContent className="flex flex-col items-center gap-2 p-0">
            <Utensils className="h-12 w-12 text-white" />
            <h2 className="text-2xl font-bold text-white">Dinner</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
