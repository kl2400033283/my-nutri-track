'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Utensils, Cookie } from "lucide-react";

export default function ChildPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Children's Nutrition Hub</h1>
        <p className="text-lg text-gray-300">Manage your children's nutritional needs all in one place.</p>
      </div>
    </div>
  );
}
