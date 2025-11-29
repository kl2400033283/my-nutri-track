'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-32 w-32 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">Primary</div>
        <div className="h-32 w-32 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground">Secondary</div>
        <div className="h-32 w-32 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">Accent</div>
        <div className="h-32 w-32 rounded-lg bg-card border flex items-center justify-center text-card-foreground">Card</div>
        <div className="h-32 w-32 rounded-lg bg-destructive flex items-center justify-center text-destructive-foreground">Destructive</div>
        <div className="h-32 w-32 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">Muted</div>
      </div>
    </main>
  );
}
