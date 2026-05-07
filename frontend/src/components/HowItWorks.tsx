import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Filter,
  Brain,
  Gauge,
  BarChart2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Data Input",
    subtitle: "Ingest from any source",
    description:
      "Connect via Twitter/X API, Reddit API, News & RSS feeds, or upload CSV/JSON datasets directly for batch analysis.",
    tags: ["Twitter / X API", "Reddit API", "CSV Upload", "Live Stream"],
    color: "cyan",
  },
  {
    num: "02",
    icon: Filter,
    title: "Preprocessing",
    subtitle: "Clean & normalize",
    description:
      "Raw data is deduplicated, normalized and structured. Noise, spam and duplicate signals are removed before analysis.",
    tags: ["Data Cleaning", "Deduplication", "Normalization", "Tokenization"],
    color: "blue",
  },
  {
    num: "03",
    icon: Brain,
    title: "AI Analysis Engine",
    subtitle: "Multi-model intelligence",
    description:
      "Four parallel AI models run simultaneously — semantic similarity, temporal patterns, sentiment analysis and network behavior.",
    tags: [
      "Semantic Similarity",
      "Temporal Analysis",
      "Sentiment AI",
      "Network Behavior",
    ],
    color: "purple",
  },
  {
    num: "04",
    icon: Gauge,
    title: "Threat Scoring",
    subtitle: "Risk quantification",
    description:
      "A multi-signal risk engine aggregates all model outputs into a single 0–100 Coordination Risk Score with severity classification.",
    tags: [
      "0–100 Risk Score",
      "Multi-signal",
      "HIGH / MEDIUM / LOW",
      "Real-time",
    ],
    color: "orange",
  },
  {
    num: "05",
    icon: BarChart2,
    title: "Visualization & Output",
    subtitle: "Actionable intelligence",
    description:
      "Results surface through an interactive threat dashboard — network graphs, activity timelines, cluster details and exportable reports.",
    tags: [
      "Network Graph",
      "Activity Timeline",
      "Cluster Details",
      "Export PDF/CSV",
    ],
    color: "emerald",
  },
];

const colorMap = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/8",
    text: "text-cyan-400",
    tag: "bg-cyan-500/15 text-cyan-300",
    num: "text-cyan-500/20",
    dot: "bg-cyan-500",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/8",
    text: "text-blue-400",
    tag: "bg-blue-500/15 text-blue-300",
    num: "text-blue-500/20",
    dot: "bg-blue-500",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/8",
    text: "text-purple-400",
    tag: "bg-purple-500/15 text-purple-300",
    num: "text-purple-500/20",
    dot: "bg-purple-500",
  },
  orange: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/8",
    text: "text-orange-400",
    tag: "bg-orange-500/15 text-orange-300",
    num: "text-orange-500/20",
    dot: "bg-orange-500",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/8",
    text: "text-emerald-400",
    tag: "bg-emerald-500/15 text-emerald-300",
    num: "text-emerald-500/20",
    dot: "bg-emerald-500",
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="demo"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-400 text-xs font-semibold tracking-wider uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5">
            <span className="text-white">From Raw Data to</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Actionable Intelligence
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A 5-stage pipeline that transforms unstructured social media data
            into clear, visual threat intelligence — in real time.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent -translate-x-1/2" />
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => {
              const c = colorMap[step.color as keyof typeof colorMap];
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center mb-8 transition-all duration-700
                               ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" }}
                >
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div
                      className={`p-7 rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 group`}
                    >
                      <div
                        className={`text-7xl font-black ${c.num} mb-2 font-mono leading-none select-none`}
                      >
                        {step.num}
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-2.5 rounded-xl ${c.bg} border ${c.border} group-hover:scale-110 transition-transform`}
                        >
                          <Icon className={`w-5 h-5 ${c.text}`} />
                        </div>
                        <div>
                          <div className="text-white font-bold text-xl">
                            {step.title}
                          </div>
                          <div
                            className={`text-xs font-medium ${c.text} uppercase tracking-wider`}
                          >
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${c.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`hidden lg:flex items-center justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`w-5 h-5 rounded-full ${c.dot} shadow-lg z-10`}
                      />
                      <div
                        className={`absolute w-10 h-10 rounded-full ${c.dot} opacity-20 animate-ping`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: visible ? "700ms" : "0ms" }}
        ></div>
      </div>
    </section>
  );
}
