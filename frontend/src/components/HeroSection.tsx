import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import {
  ArrowRight,
  Eye,
  Shield,
  Zap,
  X,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  LucideIcon,
} from "lucide-react";
import DemoModal from "./DemoModal";

function AnimatedSphere() {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#00ffaa"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// ── Popup content definitions ──────────────────────────────────
const popups = {
  eye: {
    title: "Live Detection Feed",
    subtitle: "Real-time threat visibility",
    color: "#00ffaa",
    icon: Eye,
    content: [
      {
        icon: Activity,
        label: "Active Monitors",
        value: "847",
        sub: "scanning now",
      },
      {
        icon: AlertTriangle,
        label: "Threats Detected",
        value: "12",
        sub: "last 60 seconds",
      },
      {
        icon: Users,
        label: "Accounts Flagged",
        value: "2,341",
        sub: "under review",
      },
      {
        icon: Clock,
        label: "Avg. Detection Time",
        value: "<50ms",
        sub: "response latency",
      },
    ],
    description:
      "GhostLine continuously monitors posts, timing patterns and account behavior across platforms. Every suspicious signal is scored and surfaced in under 50ms.",
  },
  shield: {
    title: "Protection Layers",
    subtitle: "Multi-layer defense system",
    color: "#8b5cf6",
    icon: Shield,
    content: [
      {
        icon: CheckCircle,
        label: "Semantic Analysis",
        value: "Active",
        sub: "NLP pattern matching",
      },
      {
        icon: CheckCircle,
        label: "Temporal Detection",
        value: "Active",
        sub: "sync timing analysis",
      },
      {
        icon: CheckCircle,
        label: "Network Clustering",
        value: "Active",
        sub: "Louvain algorithm",
      },
      {
        icon: CheckCircle,
        label: "Sentiment Tracking",
        value: "Active",
        sub: "VADER + RoBERTa",
      },
    ],
    description:
      "Four independent AI models run in parallel — each covering a different attack vector. No single coordinated campaign can slip through all four layers simultaneously.",
  },
  zap: {
    title: "Instant Alerting",
    subtitle: "Zero-latency response system",
    color: "#3b82f6",
    icon: Zap,
    content: [
      {
        icon: TrendingUp,
        label: "Detection Rate",
        value: "89.2%",
        sub: "verified accuracy",
      },
      {
        icon: Activity,
        label: "False Positives",
        value: "0.8%",
        sub: "industry leading",
      },
      {
        icon: Clock,
        label: "Alert Delivery",
        value: "Real-time",
        sub: "email + in-app",
      },
      {
        icon: Users,
        label: "Campaigns Stopped",
        value: "3,241",
        sub: "this month",
      },
    ],
    description:
      "The moment a threat score crosses the threshold, alerts fire instantly — in-app, via email, or through the API. Investigators get a full evidence package, not just a notification.",
  },
};

type PopupKey = keyof typeof popups;

// ── Popup modal ────────────────────────────────────────────────
function Popup({ id, onClose }: { id: PopupKey; onClose: () => void }) {
  const data = popups[id];
  const Icon = data.icon;
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,8,0.80)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: "#0a0a0f",
          border: `1px solid ${data.color}30`,
          boxShadow: `0 0 60px ${data.color}18, 0 40px 80px -20px rgba(0,0,0,0.8)`,
          animation: "popIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Top glow strip */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.color}80, transparent)`,
          }}
        />

        {/* Header */}
        <div
          className="relative p-6 pb-4"
          style={{ borderBottom: `1px solid ${data.color}15` }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(400px circle at 50% 0%, ${data.color}18, transparent 70%)`,
            }}
          />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  background: `${data.color}15`,
                  border: `1px solid ${data.color}30`,
                  boxShadow: `0 0 20px ${data.color}20`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: data.color }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {data.title}
                </h3>
                <p
                  className="text-xs font-medium mt-0.5"
                  style={{ color: `${data.color}99` }}
                >
                  {data.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="p-5 grid grid-cols-2 gap-3">
          {data.content.map(({ icon: SIcon, label, value, sub }, i) => (
            <div
              key={i}
              className="p-4 rounded-xl relative overflow-hidden"
              style={{
                background: `${data.color}08`,
                border: `1px solid ${data.color}20`,
                animation: `fadeSlideUp 0.3s ease ${i * 60 + 150}ms both`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <SIcon
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: `${data.color}99` }}
                />
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {label}
                </span>
              </div>
              <div
                className="text-xl font-black font-mono"
                style={{ color: data.color }}
              >
                {value}
              </div>
              <div className="text-[10px] text-gray-600 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="px-5 pb-5">
          <p
            className="text-gray-400 text-sm leading-relaxed"
            style={{
              borderLeft: `2px solid ${data.color}40`,
              paddingLeft: "12px",
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${data.color}25, ${data.color}15)`,
              border: `1px solid ${data.color}35`,
              color: data.color,
            }}
          >
            Explore {data.title}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </div>
  );
}

// ── Floating button ────────────────────────────────────────────
function FloatingBtn({
  id,
  icon: Icon,
  posStyle,
  color,
  delay,
  label,
  onClick,
}: {
  id: PopupKey;
  icon: LucideIcon;
  posStyle: React.CSSProperties;
  color: string;
  delay: string;
  label: string;
  onClick: (id: PopupKey) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      className="absolute hidden md:flex flex-col items-center gap-2 cursor-pointer"
      style={{
        ...posStyle,
        animation: `float 3s ease-in-out ${delay} infinite alternate`,
        background: "none",
        border: "none",
        padding: 0,
        zIndex: 20,
      }}
    >
      {/* Tooltip */}
      <div
        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full pointer-events-none
                   transition-all duration-200 whitespace-nowrap"
        style={{
          color,
          background: `${color}15`,
          border: `1px solid ${color}30`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
        }}
      >
        {label}
      </div>

      {/* Icon box */}
      <div
        className="relative p-4 rounded-2xl backdrop-blur-xl transition-all duration-300"
        style={{
          background: hovered ? `${color}20` : `${color}10`,
          border: `1px solid ${hovered ? color + "50" : color + "25"}`,
          boxShadow: hovered
            ? `0 0 30px ${color}35, 0 8px 30px rgba(0,0,0,0.4)`
            : `0 4px 20px rgba(0,0,0,0.3)`,
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }}
      >
        {hovered && (
          <div
            className="absolute inset-0 rounded-2xl animate-ping"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          />
        )}
        <Icon className="w-8 h-8 relative z-10" style={{ color }} />
      </div>

      {/* Click-hint dot */}
      <div
        className="w-1.5 h-1.5 rounded-full animate-pulse transition-opacity duration-200"
        style={{ background: color, opacity: hovered ? 1 : 0.4 }}
      />
    </button>
  );
}

// ── Button definitions ──
const floatingBtns: {
  id: PopupKey;
  icon: typeof Eye;
  posStyle: React.CSSProperties;
  color: string;
  delay: string;
  label: string;
}[] = [
  {
    id: "eye",
    icon: Eye,
    posStyle: { top: "25%", right: "25%" },
    color: "#00ffaa",
    delay: "0s",
    label: "Live Feed",
  },
  {
    id: "shield",
    icon: Shield,
    posStyle: { bottom: "33%", right: "33%" },
    color: "#8b5cf6",
    delay: "0.3s",
    label: "Protection",
  },
  {
    id: "zap",
    icon: Zap,
    posStyle: { top: "33%", right: "15%" },
    color: "#3b82f6",
    delay: "0.6s",
    label: "Alerts",
  },
];

// ── Main HeroSection ───────────────────────────────────────────
export default function HeroSection() {
  const [activePopup, setActivePopup] = useState<PopupKey | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => {
      const delay = Number(el.dataset.delay ?? 0);
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      }, delay);
    });
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Sphere */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] opacity-30 hidden lg:block pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <AnimatedSphere />
          </Suspense>
        </Canvas>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            data-reveal
            data-delay="400"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium">
              AI-Powered Threat Detection
            </span>
          </div>

          {/* Title */}
          <h1
            data-reveal
            data-delay="500"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <span className="text-white">Detect</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Coordinated
            </span>
            <br />
            <span className="text-white">Manipulation</span>
          </h1>

          {/* Subtitle */}
          <p
            data-reveal
            data-delay="700"
            className="text-gray-400 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            GhostLine AI identifies hidden influence campaigns across social
            media platforms using advanced behavioral analysis, semantic
            patterns, and real-time network clustering.
          </p>

          {/* CTA buttons */}
          <div
            data-reveal
            data-delay="900"
            className="flex flex-col sm:flex-row gap-4 mb-12"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <button
              onClick={() =>
                window.open("/detect", "_blank", "noopener,noreferrer")
              }
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-black
                         font-semibold text-lg flex items-center justify-center gap-2
                         hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              Start Detecting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* ── Watch Demo button — opens DemoModal ── */}
            <button
              onClick={() => setDemoOpen(true)}
              className="px-8 py-4 border border-gray-700 rounded-xl text-white font-semibold text-lg
                         hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
            >
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div
            data-reveal
            data-delay="1100"
            className="grid grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-xl"
            style={{
              opacity: 0,
              transform: "scale(0.9)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {[
              { value: "89.2%", label: "Detection Rate" },
              { value: "<50ms", label: "Response Time" },
              { value: "24/7", label: "Monitoring" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  {value}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating interactive buttons ── */}
      {floatingBtns.map((btn) => (
        <FloatingBtn key={btn.id} {...btn} onClick={setActivePopup} />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating button popup modal */}
      {activePopup && (
        <Popup id={activePopup} onClose={() => setActivePopup(null)} />
      )}

      {/* ── Demo Modal ── */}
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <style>{`
        @keyframes float {
          from { transform: translateY(0px);   }
          to   { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}
