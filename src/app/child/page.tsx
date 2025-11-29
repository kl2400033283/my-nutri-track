'use client';
import { Card, CardContent } from "@/components/ui/card";

export default function ChildPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      <Card className="flex h-64 w-full max-w-64 items-center justify-center border-none bg-black/50 shadow-lg">
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold text-white">Block 1</h2>
        </CardContent>
      </Card>
      <Card className="flex h-64 w-full max-w-64 items-center justify-center border-none bg-black/50 shadow-lg">
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold text-white">Block 2</h2>
        </CardContent>
      </Card>
      <Card className="flex h-64 w-full max-w-64 items-center justify-center border-none bg-black/50 shadow-lg">
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold text-white">Block 3</h2>
        </CardContent>
      </Card>
      <Card className="flex h-64 w-full max-w-64 items-center justify-center border-none bg-black/50 shadow-lg">
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold text-white">Block 4</h2>
        </CardContent>
      </Card>
    </div>
  );
}
