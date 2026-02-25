import { motion } from "motion/react";
import { Quote, QuoteTone } from "../types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuoteCardProps {
  quote: Quote;
  tone: QuoteTone;
  isLoading?: boolean;
}

export default function QuoteCard({ quote, tone, isLoading }: QuoteCardProps) {
  const getTheme = () => {
    switch (tone) {
      case 'inspirational':
        return "bg-white text-zinc-900 border-zinc-100";
      case 'humorous':
        return "bg-emerald-50 text-emerald-900 border-emerald-100";
      case 'serious':
        return "bg-zinc-900 text-zinc-100 border-zinc-800";
      case 'philosophical':
        return "bg-stone-50 text-stone-900 border-stone-200";
      case 'brutalist':
        return "bg-white text-black border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
      default:
        return "bg-white text-zinc-900 border-zinc-100";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative w-full max-w-2xl p-12 md:p-20 border rounded-2xl overflow-hidden transition-colors duration-500",
        getTheme(),
        isLoading && "animate-pulse"
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-px flex-1",
            tone === 'serious' ? "bg-zinc-700" : "bg-zinc-200"
          )} />
          <span className={cn(
            "text-[10px] uppercase tracking-[0.2em] font-semibold opacity-60",
            tone === 'brutalist' && "font-mono"
          )}>
            {quote.context || tone}
          </span>
          <div className={cn(
            "h-px flex-1",
            tone === 'serious' ? "bg-zinc-700" : "bg-zinc-200"
          )} />
        </div>

        <h2 className={cn(
          "text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight",
          tone === 'philosophical' && "font-serif italic",
          tone === 'brutalist' && "font-mono uppercase text-5xl"
        )}>
          {quote.text}
        </h2>

        <div className="flex flex-col gap-1 mt-4">
          <span className={cn(
            "text-lg font-medium",
            tone === 'philosophical' && "font-serif italic"
          )}>
            — {quote.author}
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <span className="text-9xl font-serif">“</span>
      </div>
    </motion.div>
  );
}
