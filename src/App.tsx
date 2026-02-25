import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Download, Share2, Type as TypeIcon, Hash } from 'lucide-react';
import { Quote, QuoteTone } from './types';
import { generateQuote } from './services/geminiService';
import QuoteCard from './components/QuoteCard';

const TONES: { value: QuoteTone; label: string; description: string }[] = [
  { value: 'inspirational', label: 'Inspirational', description: 'Uplifting and visionary' },
  { value: 'humorous', label: 'Humorous', description: 'Witty and lighthearted' },
  { value: 'serious', label: 'Serious', description: 'Stoic and grounded' },
  { value: 'philosophical', label: 'Philosophical', description: 'Deep and abstract' },
  { value: 'brutalist', label: 'Brutalist', description: 'Raw and direct' },
];

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState<QuoteTone>('inspirational');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateQuote(keyword, tone);
      setQuote(result);
    } catch (err) {
      setError('Failed to generate quote. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Header */}
      <header className="border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-xl">Aura</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Gallery
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-all active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        {/* Left: Display Area */}
        <section className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px] bg-zinc-50/50 rounded-[32px] border border-dashed border-zinc-200 p-8">
          <AnimatePresence mode="wait">
            {quote ? (
              <div className="w-full flex flex-col items-center gap-8">
                <QuoteCard quote={quote} tone={tone} isLoading={isLoading} />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <button 
                    onClick={() => handleGenerate()}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-full text-sm font-medium hover:bg-zinc-50 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={isLoading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
                    Regenerate
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-full text-sm font-medium hover:bg-zinc-50 transition-all active:scale-95">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md"
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TypeIcon className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Ready to inspire?</h3>
                <p className="text-zinc-500">Enter a keyword and choose a tone to generate your first masterpiece.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Right: Controls */}
        <aside className="space-y-8 sticky top-28">
          <form onSubmit={handleGenerate} className="space-y-8">
            {/* Keyword Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Hash className="w-3 h-3" />
                Keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Resilience, Coffee, Coding..."
                className="w-full px-5 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all text-lg"
              />
            </div>

            {/* Tone Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Select Tone
              </label>
              <div className="grid gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTone(t.value)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      tone === t.value
                        ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10'
                        : 'bg-white border-zinc-100 hover:border-zinc-300 text-zinc-600'
                    }`}
                  >
                    <div className="font-semibold">{t.label}</div>
                    <div className={`text-xs ${tone === t.value ? 'text-zinc-400' : 'text-zinc-400'}`}>
                      {t.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !keyword.trim()}
              className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-zinc-900/20"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Quote
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="pt-8 border-t border-zinc-100">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Powered by Gemini 3</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-zinc-900">Privacy</a>
                <a href="#" className="hover:text-zinc-900">Terms</a>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
