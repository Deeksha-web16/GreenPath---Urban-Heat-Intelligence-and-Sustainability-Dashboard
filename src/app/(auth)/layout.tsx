
'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 p-4 dark:from-green-900/50 dark:via-green-950/50 dark:to-emerald-900/50">
      
      {/* Decorative background gradients (kept for texture) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/30 blur-3xl"
      />
       <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.2, 0.15],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 5,
        }}
        className="absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-emerald-500/20 blur-3xl"
      />

      {/* Main content area */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Watermark Logo */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
            <Logo size={256} className="opacity-20" withText={false} />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </main>
  );
}
