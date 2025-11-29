import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { FirebaseClientProvider } from '@/firebase';

export const metadata = {
  title: 'New Project',
  description: 'Created with Firebase Studio',
};

export default function RootLayout({
  children,
}) {
  const backgroundImage = PlaceHolderImages.find(img => img.id === 'fruits-background');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased dark">
        <FirebaseClientProvider>
          <Navbar />
          <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6">
            {backgroundImage && <Image
              src={backgroundImage.imageUrl}
              alt={backgroundImage.description}
              fill
              className="object-cover -z-10 animate-zoom-in-out"
              data-ai-hint={backgroundImage.imageHint}
            />}
            <div className="absolute inset-0 bg-black/50 -z-10"></div>
            {children}
          </main>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
