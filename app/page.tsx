"use client";

import { useState, useEffect } from "react";
import { redirectToCheckout } from "../lib/shopify";
import {
  Wind,
  ArrowRight,
  Activity,
  Heart,
  Brain,
  Award,
  X,
  Star,
  Instagram,
  Twitter,
  Youtube,
  Zap,
  Moon,
  Target,
  Battery,
  ZapOff,
  BarChart2,
  ThumbsUp,
  Circle,
  Thermometer,
  CheckCircle2,
} from "lucide-react";

const questions = [
  {
    question: "What is your primary goal right now?",
    options: [
      { text: "Reduce Anxiety & Stress", icon: "zap" },
      { text: "Deep, Restorative Sleep", icon: "moon" },
      { text: "Laser-Sharp Focus", icon: "target" },
      { text: "Athletic Performance", icon: "activity" },
    ],
  },
  {
    question: "How does your energy feel by 3:00 PM?",
    options: [
      { text: "I crash hard. Need caffeine.", icon: "battery" },
      { text: "Anxious / Wired but tired.", icon: "zap-off" },
      { text: "Steady, but could be better.", icon: "bar-chart-2" },
      { text: "I feel great.", icon: "thumbs-up" },
    ],
  },
  {
    question: "Have you tried breathwork before?",
    options: [
      { text: "Never.", icon: "circle" },
      { text: "Tried meditation (didn't stick).", icon: "brain" },
      { text: "I do Wim Hof occasionally.", icon: "thermometer" },
      { text: "I'm an experienced practitioner.", icon: "award" },
    ],
  },
];

const resultTitles = [
  "Anxiety Relief Protocol",
  "Deep Sleep System",
  "Neuro-Focus State",
  "Peak Performance",
];

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-5 h-5" />,
  moon: <Moon className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  battery: <Battery className="w-5 h-5" />,
  "zap-off": <ZapOff className="w-5 h-5" />,
  "bar-chart-2": <BarChart2 className="w-5 h-5" />,
  "thumbs-up": <ThumbsUp className="w-5 h-5" />,
  circle: <Circle className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  thermometer: <Thermometer className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
};

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisText, setAnalysisText] = useState(
    "Calculating HRV baseline potential..."
  );
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Checkout handler - pass any variant ID
  const handleCheckout = async (variantId: string) => {
    setCheckoutLoading(true);
    await redirectToCheckout(variantId);
    setCheckoutLoading(false);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setAnswers([]);
    document.body.style.overflow = "hidden";
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setAnswers([]);
    document.body.style.overflow = "auto";
  };

  const selectOption = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: number[]) => {
    setShowQuiz(false);
    setShowAnalysis(true);

    const texts = [
      "Mapping nervous system response...",
      "Calculating CO2 tolerance...",
      "Designing custom protocol...",
    ];
    let textIdx = 0;

    const interval = setInterval(() => {
      if (textIdx < texts.length) {
        setAnalysisText(texts[textIdx]);
        textIdx++;
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setShowAnalysis(false);
      setShowResults(true);
    }, 3500);
  };

  const resetApp = () => {
    setShowQuiz(false);
    setShowAnalysis(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers([]);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const resultType = resultTitles[answers[0]] || "Sympathetic Overdrive";

  return (
    <>
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={resetApp}
          >
            <Wind className="text-teal-400 h-6 w-6" />
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Aura.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#science" className="hover:text-white transition-colors">
              The Science
            </a>
            <a
              href="#testimonials"
              className="hover:text-white transition-colors"
            >
              Results
            </a>
            <button
              onClick={startQuiz}
              className="bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative pt-20">
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          {/* Visual Breathing Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full animate-breathe pointer-events-none"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full animate-breathe pointer-events-none"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="z-10 max-w-4xl mx-auto space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Backed by Neuroscience
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight">
              <span className="gradient-text">Chaos is inevitable.</span>
              <br />
              <span className="italic text-slate-500">Stress is optional.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Most high performers are stuck in a chronic state of fight-or-flight.
              We teach you how to use your breath as a remote control for your
              nervous system.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={startQuiz}
                className="group relative px-8 py-4 bg-teal-500 text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Build My Breath Profile
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-xs text-slate-500 mt-2 md:mt-0">
                Takes 60 seconds • No credit card required
              </p>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="absolute bottom-10 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-serif text-lg">
                <Activity className="w-5 h-5" /> OURA
              </div>
              <div className="flex items-center gap-2 font-serif text-lg">
                <Heart className="w-5 h-5" /> WHOOP
              </div>
              <div className="flex items-center gap-2 font-serif text-lg">
                <Brain className="w-5 h-5" /> Huberman Lab
              </div>
              <div className="flex items-center gap-2 font-serif text-lg">
                <Award className="w-5 h-5" /> Forbes
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM / AGITATION SECTION */}
        <section id="science" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif">
                Your operating system is{" "}
                <span className="accent-gradient-text">overheating.</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Modern life triggers your Sympathetic Nervous System
                (fight-or-flight) 50x a day. Evolution designed it to trigger
                once a week.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-500/10 text-red-400 mt-1">
                    <X className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Chronic Cortisol Spikes
                    </h4>
                    <p className="text-sm text-slate-500">
                      Leading to belly fat retention and brain fog.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-500/10 text-red-400 mt-1">
                    <X className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Shallow Breathing
                    </h4>
                    <p className="text-sm text-slate-500">
                      Deprives the brain of oxygen, killing focus.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-500/10 text-red-400 mt-1">
                    <X className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Sleep Fragmentation
                    </h4>
                    <p className="text-sm text-slate-500">
                      Waking up tired even after 8 hours.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="glass-panel p-8 rounded-2xl border border-white/10 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-xl">Heart Rate Variability</h3>
                  <span className="text-teal-400 text-sm font-mono">+142%</span>
                </div>
                {/* Mock Chart */}
                <div className="h-48 flex items-end gap-2">
                  <div className="w-full bg-slate-800/50 rounded-t h-[30%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Before
                    </div>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-t h-[45%]"></div>
                  <div className="w-full bg-teal-500/20 rounded-t h-[60%] animate-pulse"></div>
                  <div className="w-full bg-teal-500/40 rounded-t h-[85%] animate-pulse"></div>
                  <div className="w-full bg-teal-500 rounded-t h-[95%] shadow-[0_0_20px_rgba(45,212,191,0.5)] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-teal-300">
                      After Aura
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Average user improvement after 21 days.
                </p>
              </div>
              {/* Decorative back elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-24 bg-surface/50 border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif mb-4">
                Don&apos;t meditate.
                <br />
                <span className="text-white">Just breathe.</span>
              </h2>
              <p className="text-slate-400">
                Meditation is a mental workout. Breathwork is biological
                hacking.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="glass-panel p-8 rounded-2xl hover:border-teal-500/30 transition-colors cursor-default">
                <div className="flex gap-1 text-teal-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  &quot;I couldn&apos;t sit still for 10 minutes to meditate.
                  Aura&apos;s 5-minute &apos;CO2 tolerance&apos; drills knocked
                  me out cold. Best sleep of my life.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-serif font-bold">
                    JD
                  </div>
                  <div>
                    <div className="text-white font-medium">James D.</div>
                    <div className="text-xs text-slate-500">
                      Founder, TechStar
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="glass-panel p-8 rounded-2xl hover:border-teal-500/30 transition-colors cursor-default">
                <div className="flex gap-1 text-teal-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  &quot;The &apos;Executive Focus&apos; track is now my
                  pre-meeting ritual. It feels like taking a double espresso
                  without the jitters.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-serif font-bold">
                    SL
                  </div>
                  <div>
                    <div className="text-white font-medium">Sarah L.</div>
                    <div className="text-xs text-slate-500">VP of Sales</div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="glass-panel p-8 rounded-2xl hover:border-teal-500/30 transition-colors cursor-default">
                <div className="flex gap-1 text-teal-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  &quot;I was skeptical. But the physiological shift is
                  undeniable. My HRV is up 20 points since starting the morning
                  protocol.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-serif font-bold">
                    MR
                  </div>
                  <div>
                    <div className="text-white font-medium">Dr. Mark R.</div>
                    <div className="text-xs text-slate-500">Neurologist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center text-slate-600 text-sm">
          <div className="flex justify-center gap-6 mb-8">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <p>&copy; 2024 Aura Breathwork Inc. All rights reserved.</p>
        </footer>
      </main>

      {/* QUIZ OVERLAY */}
      {showQuiz && (
        <div className="fixed inset-0 z-[100] bg-deep flex flex-col overflow-y-auto">
          {/* Quiz Progress Bar */}
          <div className="w-full h-1 bg-slate-800 fixed top-0 left-0">
            <div
              className="h-full bg-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-screen">
            {/* Close Button */}
            <button
              onClick={closeQuiz}
              className="absolute top-6 right-6 text-slate-500 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Quiz Container */}
            <div className="max-w-2xl w-full animate-slide-up">
              <h3 className="text-sm text-teal-400 font-bold uppercase tracking-widest mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h3>
              <h2 className="text-3xl md:text-5xl font-serif mb-12 text-white">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => selectOption(index)}
                    className="quiz-option group text-left p-6 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-colors">
                      {iconMap[opt.icon]}
                    </div>
                    <span className="text-lg font-medium text-slate-200 group-hover:text-white">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOADING / ANALYSIS SCREEN */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[100] bg-deep flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 border-t-2 border-teal-500 rounded-full animate-spin"></div>
            <div
              className="absolute inset-4 border-r-2 border-purple-500 rounded-full animate-spin"
              style={{ animationDirection: "reverse" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center font-serif italic text-2xl">
              A
            </div>
          </div>
          <h2 className="text-2xl font-serif mb-2">
            Analyzing your profile...
          </h2>
          <p className="text-slate-400">{analysisText}</p>
        </div>
      )}

      {/* RESULTS / OFFER PAGE */}
      {showResults && (
        <div className="fixed inset-0 z-[100] bg-deep overflow-y-auto">
          <div className="min-h-screen flex flex-col items-center justify-center p-6 py-20">
            <div className="max-w-3xl w-full animate-slide-up">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Analysis Complete
                </div>
                <h2 className="text-4xl md:text-6xl font-serif mb-4">
                  Your Breath Profile:{" "}
                  <span className="accent-gradient-text">{resultType}</span>
                </h2>
                <p className="text-xl text-slate-300">
                  You are operating at 80% mental capacity due to shallow
                  oxygenation.
                </p>
              </div>

              <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      Your Personal Protocol
                    </h3>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="text-teal-500 w-5 h-5" />
                        <span>Morning: 3-min Box Breathing (Cortisol flush)</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="text-teal-500 w-5 h-5" />
                        <span>Work: 4-7-8 Focus Technique</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="text-teal-500 w-5 h-5" />
                        <span>Sleep: Non-Sleep Deep Rest (NSDR)</span>
                      </li>
                    </ul>

                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => handleCheckout("gid://shopify/ProductVariant/52429135053167")}
                        disabled={checkoutLoading}
                        className="w-full bg-teal-500 text-black font-bold py-4 rounded-xl hover:bg-teal-400 transition-all transform hover:scale-[1.02] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {checkoutLoading ? 'Redirecting to checkout...' : 'Unlock My Protocol ($49/yr)'}
                      </button>
                      <p className="text-xs text-center text-slate-500">
                        Includes 30-day money-back guarantee.
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                        What you get
                      </h4>
                      <div className="text-3xl font-serif mb-4">
                        The 21-Day Reset
                      </div>
                      <p className="text-sm text-slate-400 mb-6">
                        A guided audio journey to retrain your CO2 tolerance and
                        maximize HRV.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[85%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Spots remaining for this cohort</span>
                        <span className="text-white">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
