import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Search,
  Vote,
  BadgeCheck,
  Zap,
  Globe,
} from "lucide-react";
import Getstartedmodal from "./Getstartedmodal";

const cases = [
  {
    icon: ShieldCheck,
    title: "Protecting Digital Platforms",
    body: "Helps social media platforms find coordinated manipulation campaigns before misinformation spreads at scale — protecting billions of users.",
    tag: "Platform Safety",
    color: "cyan",
  },
  {
    icon: Search,
    title: "Cyber & Threat Analysts",
    body: "Equips investigators with visual intelligence tools to track suspicious networks, coordinated behavior patterns and attribution trails.",
    tag: "Cybersecurity",
    color: "blue",
  },
  {
    icon: Vote,
    title: "Election & Narrative Monitoring",
    body: "Assists organizations in detecting large-scale narrative manipulation during elections, crises and major public events in real time.",
    tag: "Civic Protection",
    color: "purple",
  },
  {
    icon: BadgeCheck,
    title: "Improving Information Trust",
    body: "Reduces the impact of artificial amplification and coordinated misinformation — helping maintain trust in online discourse.",
    tag: "Trust & Safety",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Real-Time Threat Awareness",
    body: "Enables faster identification of emerging influence operations through live behavioral monitoring and automated alerting systems.",
    tag: "Real-Time",
    color: "orange",
  },
  {
    icon: Globe,
    title: "Scalable Across Domains",
    body: "Deployable for cybersecurity teams, media monitoring agencies, research organizations and digital safety platforms worldwide.",
    tag: "Enterprise Ready",
    color: "pink",
  },
];

const colorMap = {
  cyan: {
    border: "border-cyan-500/25",
    bg: "bg-cyan-500/8",
    text: "text-cyan-400",
    icon: "bg-cyan-500/15",
    tag: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  },
  blue: {
    border: "border-blue-500/25",
    bg: "bg-blue-500/8",
    text: "text-blue-400",
    icon: "bg-blue-500/15",
    tag: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  },
  purple: {
    border: "border-purple-500/25",
    bg: "bg-purple-500/8",
    text: "text-purple-400",
    icon: "bg-purple-500/15",
    tag: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  },
  emerald: {
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/8",
    text: "text-emerald-400",
    icon: "bg-emerald-500/15",
    tag: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  },
  orange: {
    border: "border-orange-500/25",
    bg: "bg-orange-500/8",
    text: "text-orange-400",
    icon: "bg-orange-500/15",
    tag: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  },
  pink: {
    border: "border-pink-500/25",
    bg: "bg-pink-500/8",
    text: "text-pink-400",
    icon: "bg-pink-500/15",
    tag: "bg-pink-500/15 text-pink-300 border-pink-500/20",
  },
};

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="usecases"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              Impact & Use Cases
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5">
            <span className="text-white">Who Uses</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              GhostLine AI?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From election monitors to platform safety teams — GhostLine gives
            any organization the power to detect and respond to coordinated
            manipulation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
          {cases.map(({ icon: Icon, title, body, tag, color }, i) => {
            const c = colorMap[color as keyof typeof colorMap];
            return (
              <div
                key={i}
                className={`group relative p-7 rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm
                             hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]
                             ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: visible ? `${i * 80 + 200}ms` : "0ms",
                }}
              >
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c.tag} mb-5`}
                >
                  {tag}
                </span>
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex-shrink-0 p-3 rounded-xl ${c.icon} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug">
                    {title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                <div
                  className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent ${c.text} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div
          className={`relative p-8 sm:p-10 rounded-3xl border border-emerald-500/15 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 backdrop-blur-xl overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: visible ? "700ms" : "0ms" }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Ready to detect hidden threats?
              </div>
              <div className="text-gray-400 text-sm">
                Start with your own dataset or connect a live API stream.
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-3">
              {/* ── Get Started Free — opens modal ── */}
              <button
                onClick={() => setModalOpen(true)}
                className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-black font-semibold text-sm hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Get Started Modal ── */}
      <Getstartedmodal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
