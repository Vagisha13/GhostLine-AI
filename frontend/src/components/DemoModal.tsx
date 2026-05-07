import { useEffect, useRef, useState } from "react";
import {
  Shield,
  X,
  Activity,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
type Step = 0 | 1 | 2;

// ── Step 0: Live Detection Terminal ──────────────────────────
function TerminalScreen() {
  const [threatCount, setThreatCount] = useState(12);

  useEffect(() => {
    const id = setInterval(() => {
      setThreatCount((c) => c + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const lines = [
    { dim: "# GhostLine threat monitor v2.4.1 — initialized" },
    { gray: "[00:00:01]", green: " ✓ Platform connectors online" },
    { gray: "[00:00:02]", white: " Scanning 847 active streams..." },
    { gray: "[00:00:04]", yellow: " ⚠ Temporal sync detected — cluster #4812" },
    { gray: "[00:00:04]", white: " Running Louvain community detection..." },
    {
      gray: "[00:00:05]",
      red: " ✗ ALERT: 23 accounts posting within 800ms window",
    },
    {
      gray: "[00:00:05]",
      white: " Semantic similarity score: ",
      redInline: "0.94",
    },
    {
      gray: "[00:00:06]",
      yellow: " ⚠ Network centrality anomaly — node @usr_7741",
    },
    {
      gray: "[00:00:07]",
      green: " ✓ Evidence package compiled — case #GH-2024-0091",
    },
  ];

  return (
    <div className="p-6">
      {/* Terminal */}
      <div
        className="rounded-xl p-4 font-mono text-[12px] leading-[1.85] min-h-[200px]"
        style={{
          background: "#040507",
          border: "1px solid rgba(0,229,200,0.15)",
        }}
      >
        {lines.map((l, i) =>
          "dim" in l ? (
            <div key={i} style={{ color: "#334" }}>
              {l.dim}
            </div>
          ) : "redInline" in l ? (
            <div key={i}>
              <span style={{ color: "#556" }}>{l.gray}</span>
              <span style={{ color: "#ccc" }}>{l.white}</span>
              <span style={{ color: "#ff4d6a" }}>{l.redInline}</span>
            </div>
          ) : (
            <div key={i}>
              {l.gray && <span style={{ color: "#556" }}>{l.gray}</span>}
              {l.green && <span style={{ color: "#00e5c8" }}>{l.green}</span>}
              {l.white && <span style={{ color: "#ccc" }}>{l.white}</span>}
              {l.yellow && <span style={{ color: "#f5c542" }}>{l.yellow}</span>}
              {l.red && <span style={{ color: "#ff4d6a" }}>{l.red}</span>}
            </div>
          ),
        )}
        {/* blinking cursor */}
        <span
          className="inline-block w-2 h-[13px] align-text-bottom"
          style={{
            background: "#00e5c8",
            animation: "ghostBlink 1s step-end infinite",
          }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { val: "847", label: "Active Monitors", color: "#00e5c8" },
          {
            val: String(threatCount),
            label: "Threats / 60s",
            color: "#ff4d6a",
          },
          { val: "48ms", label: "Response Time", color: "#00e5c8" },
        ].map(({ val, label, color }) => (
          <div
            key={label}
            className="rounded-xl p-3 text-center"
            style={{
              background: "rgba(0,229,200,0.04)",
              border: "1px solid rgba(0,229,200,0.12)",
            }}
          >
            <div className="text-[22px] font-black font-mono" style={{ color }}>
              {val}
            </div>
            <div
              className="text-[11px] uppercase tracking-wider mt-1"
              style={{ color: "#556" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 1: Account Cluster ───────────────────────────────────
function ClusterScreen() {
  const accounts = [
    {
      handle: "@usr_7741",
      sub: "Created 3 days ago · 0 followers · 891 posts",
      risk: "HIGH",
      color: "#ff4d6a",
      bg: "rgba(255,77,106,0.15)",
    },
    {
      handle: "@bot_proxy_22",
      sub: "Profile photo: stock image · No bio · 412 posts",
      risk: "HIGH",
      color: "#ff4d6a",
      bg: "rgba(255,77,106,0.15)",
    },
    {
      handle: "@news_amp_9",
      sub: "Posting pattern: burst every 4h · 8 shared IPs",
      risk: "MED",
      color: "#f5c542",
      bg: "rgba(245,197,66,0.12)",
    },
    {
      handle: "@xr_amplify",
      sub: "Cross-platform echo · identical post fingerprint",
      risk: "HIGH",
      color: "#ff4d6a",
      bg: "rgba(255,77,106,0.15)",
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-[14px] font-semibold text-gray-300">
          Cluster #4812 — Flagged Accounts
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
          style={{
            background: "rgba(255,77,106,0.12)",
            border: "1px solid rgba(255,77,106,0.25)",
            color: "#ff4d6a",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ff4d6a",
              animation: "ghostPulse 1.2s infinite",
            }}
          />
          Live
        </span>
      </div>

      {/* Rows */}
      {accounts.map(({ handle, sub, risk, color, bg }) => (
        <div
          key={handle}
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0"
            style={{ background: bg, color }}
          >
            {handle[1].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-gray-300">
              {handle}
            </div>
            <div
              className="text-[11px] mt-0.5 truncate"
              style={{ color: "#556" }}
            >
              {sub}
            </div>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex-shrink-0"
            style={{
              background:
                risk === "HIGH"
                  ? "rgba(255,77,106,0.15)"
                  : "rgba(245,197,66,0.12)",
              border: `1px solid ${risk === "HIGH" ? "rgba(255,77,106,0.25)" : "rgba(245,197,66,0.2)"}`,
              color,
            }}
          >
            {risk}
          </span>
        </div>
      ))}

      {/* Sync bar */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(0,229,200,0.1)",
        }}
      >
        <div
          className="text-[11px] uppercase tracking-wider mb-2"
          style={{ color: "#556" }}
        >
          Temporal sync score
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "82%",
              background: "linear-gradient(90deg, #ff4d6a, #ff7c8a)",
            }}
          />
        </div>
        <div
          className="text-[13px] font-mono font-bold mt-2"
          style={{ color: "#ff4d6a" }}
        >
          82% — synchronized within 800ms window
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Evidence Report ───────────────────────────────────
function EvidenceScreen() {
  const rows = [
    { key: "Case ID", val: "#GH-2024-0091", cls: "" },
    { key: "Accounts in cluster", val: "23 flagged", cls: "danger" },
    { key: "Semantic similarity", val: "0.94 / 1.0", cls: "danger" },
    { key: "Temporal sync window", val: "800ms", cls: "warn" },
    { key: "Shared IP clusters", val: "8 IPs", cls: "danger" },
    { key: "Platform spread", val: "4 platforms", cls: "warn" },
    { key: "Detection latency", val: "48ms", cls: "ok" },
  ];

  const color = (cls: string) =>
    cls === "danger"
      ? "#ff4d6a"
      : cls === "warn"
        ? "#f5c542"
        : cls === "ok"
          ? "#00e5c8"
          : "#ccc";

  // SVG ring: r=30, circumference ≈ 188.4, 88% fill = dashoffset 22.6
  return (
    <div className="p-6 flex flex-col sm:flex-row gap-4">
      {/* Left: fingerprint table */}
      <div
        className="flex-1 rounded-xl p-4"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(0,229,200,0.12)",
        }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.08em] mb-3"
          style={{ color: "#556" }}
        >
          Campaign fingerprint
        </div>
        {rows.map(({ key, val, cls }) => (
          <div
            key={key}
            className="flex justify-between items-center py-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            <span className="text-[12px]" style={{ color: "#778" }}>
              {key}
            </span>
            <span
              className="text-[12px] font-semibold"
              style={{ color: color(cls) }}
            >
              {val}
            </span>
          </div>
        ))}
      </div>

      {/* Right: confidence + action */}
      <div className="flex flex-col gap-3 flex-1">
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(0,229,200,0.12)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.08em] mb-3"
            style={{ color: "#556" }}
          >
            Confidence score
          </div>
          <div className="flex items-center gap-4">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="flex-shrink-0"
            >
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="rgba(0,229,200,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="#00e5c8"
                strokeWidth="8"
                strokeDasharray="188.4"
                strokeDashoffset="22.6"
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
              <text
                x="40"
                y="45"
                textAnchor="middle"
                fill="#00e5c8"
                fontSize="14"
                fontWeight="800"
                fontFamily="Courier New"
              >
                88%
              </text>
            </svg>
            <div>
              <div
                className="text-[18px] font-black font-mono"
                style={{ color: "#00e5c8" }}
              >
                COORDINATED
              </div>
              <div className="text-[11px] mt-1" style={{ color: "#556" }}>
                Inauthentic behavior confirmed
              </div>
              <div
                className="text-[11px] mt-2 leading-relaxed"
                style={{ color: "#556" }}
              >
                4 independent AI models voted. All thresholds exceeded.
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(0,229,200,0.04)",
            border: "1px solid rgba(0,229,200,0.2)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.08em] mb-2"
            style={{ color: "#556" }}
          >
            Recommended action
          </div>
          <div
            className="text-[13px] font-semibold"
            style={{ color: "#00e5c8" }}
          >
            Flag for platform review → Submit evidence package
          </div>
          <div className="text-[11px] mt-1.5" style={{ color: "#556" }}>
            Full JSON export + timeline available
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main DemoModal ────────────────────────────────────────────
const STEPS = [
  { label: "01 — Detection Feed" },
  { label: "02 — Account Cluster" },
  { label: "03 — Evidence Report" },
];

export default function DemoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset step on open
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,8,0.82)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "#08090f",
          border: "1px solid rgba(0,229,200,0.18)",
          boxShadow:
            "0 0 80px rgba(0,229,200,0.1), 0 40px 100px rgba(0,0,0,0.7)",
          animation: "ghostPopIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Top glow strip */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,229,200,0.7), transparent)",
          }}
        />

        {/* Header */}
        <div
          className="relative flex items-center justify-between p-5 pb-4"
          style={{
            borderBottom: "1px solid rgba(0,229,200,0.1)",
            background:
              "radial-gradient(600px circle at 50% -40%, rgba(0,229,200,0.07), transparent 60%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                background: "rgba(0,229,200,0.12)",
                border: "1px solid rgba(0,229,200,0.25)",
                boxShadow: "0 0 20px rgba(0,229,200,0.15)",
              }}
            >
              <Shield className="w-5 h-5" style={{ color: "#00e5c8" }} />
            </div>
            <div>
              <h2 className="text-white font-bold text-[17px] leading-tight">
                GhostLine AI — Live Demo
              </h2>
              <p
                className="text-[12px] mt-0.5"
                style={{ color: "rgba(0,229,200,0.6)" }}
              >
                See how we detect coordinated manipulation in real time
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

        {/* Step tabs */}
        <div
          className="flex overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {STEPS.map(({ label }, i) => (
            <button
              key={i}
              onClick={() => setStep(i as Step)}
              className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors"
              style={{
                color: step === i ? "#00e5c8" : "#555",
                borderBottom:
                  step === i ? "2px solid #00e5c8" : "2px solid transparent",
                background: "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Screen content */}
        <div style={{ animation: "ghostFadeUp 0.3s ease" }} key={step}>
          {step === 0 && <TerminalScreen />}
          {step === 1 && <ClusterScreen />}
          {step === 2 && <EvidenceScreen />}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            className="px-5 py-2 rounded-xl text-[13px] font-semibold transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#888",
              visibility: step === 0 ? "hidden" : "visible",
            }}
          >
            ← Back
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                onClick={() => setStep(i as Step)}
                className="rounded-full cursor-pointer transition-all"
                style={{
                  width: step === i ? "18px" : "6px",
                  height: "6px",
                  background: step === i ? "#00e5c8" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (step === 2) {
                onClose();
                window.open("/detect", "_blank", "noopener,noreferrer");
              } else setStep((s) => (s + 1) as Step);
            }}
            className="px-5 py-2 rounded-xl text-[13px] font-semibold transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,229,200,0.2), rgba(0,200,150,0.2))",
              border: "1px solid rgba(0,229,200,0.3)",
              color: "#00e5c8",
            }}
          >
            {step === 2 ? "Start Detecting →" : "Next →"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ghostPopIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ghostFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ghostBlink { 50% { opacity: 0; } }
        @keyframes ghostPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
