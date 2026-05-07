import { useEffect, useRef, useState } from "react";
import {
  X,
  Upload,
  Wifi,
  FileJson,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Zap,
  Database,
} from "lucide-react";

type Tab = "upload" | "api" | "demo";

const DEMO_DATASETS = [
  {
    name: "2024 Election Influence Campaign",
    size: "12,400 accounts",
    threat: "HIGH",
    color: "#ff4d6a",
  },
  {
    name: "Coordinated Review Bombing",
    size: "3,210 accounts",
    threat: "MED",
    color: "#f5c542",
  },
  {
    name: "Cross-Platform Narrative Spread",
    size: "8,900 accounts",
    threat: "HIGH",
    color: "#ff4d6a",
  },
];

// ── Tab: Upload Dataset ───────────────────────────────────────
function UploadTab() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    startFakeUpload();
  };

  const handleFileChange = () => startFakeUpload();

  const startFakeUpload = () => {
    setUploaded(false);
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += Math.floor(Math.random() * 18 + 8);
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setUploaded(true);
      }
      setProgress(p);
    }, 120);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-400 text-sm leading-relaxed">
        Upload a JSON, CSV, or NDJSON file of social media account data.
        GhostLine will scan for coordinated behavior patterns automatically.
      </p>

      {/* Drop zone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="relative flex flex-col items-center justify-center gap-3 rounded-2xl p-10 cursor-pointer transition-all duration-300"
        style={{
          border: dragging
            ? "1.5px dashed #00e5c8"
            : "1.5px dashed rgba(0,229,200,0.25)",
          background: dragging
            ? "rgba(0,229,200,0.06)"
            : "rgba(0,229,200,0.02)",
        }}
      >
        <input
          type="file"
          className="hidden"
          accept=".json,.csv,.ndjson"
          onChange={handleFileChange}
        />
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(0,229,200,0.1)",
            border: "1px solid rgba(0,229,200,0.2)",
          }}
        >
          <Upload className="w-7 h-7" style={{ color: "#00e5c8" }} />
        </div>
        <div className="text-center">
          <p className="text-white font-semibold text-sm">
            Drop your dataset here
          </p>
          <p className="text-gray-500 text-xs mt-1">
            JSON · CSV · NDJSON — up to 50MB
          </p>
        </div>
        {!uploaded && progress > 0 && (
          <div className="w-full mt-2">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #00e5c8, #00c896)",
                }}
              />
            </div>
            <p
              className="text-[11px] mt-1.5 text-center"
              style={{ color: "#00e5c8" }}
            >
              Uploading... {progress}%
            </p>
          </div>
        )}
      </label>

      {/* Success state */}
      {uploaded && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{
            background: "rgba(0,229,200,0.06)",
            border: "1px solid rgba(0,229,200,0.2)",
            animation: "ghostFadeUp 0.3s ease",
          }}
        >
          <CheckCircle
            className="w-5 h-5 flex-shrink-0"
            style={{ color: "#00e5c8" }}
          />
          <div>
            <p className="text-white text-sm font-semibold">
              Dataset uploaded successfully
            </p>
            <p className="text-gray-500 text-xs mt-0.5">
              Analysis will begin automatically — results in ~30s
            </p>
          </div>
          <button
            onClick={() =>
              window.open("/detect", "_blank", "noopener,noreferrer")
            }
            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #00e5c8, #00c896)",
              color: "#050508",
            }}
          >
            Analyze <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Supported formats */}
      <div className="grid grid-cols-3 gap-2 mt-1">
        {[
          { ext: "JSON", desc: "Account objects" },
          { ext: "CSV", desc: "Tabular data" },
          { ext: "NDJSON", desc: "Streaming logs" },
        ].map(({ ext, desc }) => (
          <div
            key={ext}
            className="p-3 rounded-xl text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="text-[13px] font-black font-mono"
              style={{ color: "#00e5c8" }}
            >
              .{ext}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: "#556" }}>
              {desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Live API Stream ──────────────────────────────────────
function ApiTab() {
  const [copied, setCopied] = useState(false);
  const snippet = `curl -X POST https://api.ghostline.ai/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"stream": "twitter", "keywords": ["#election2024"]}'`;

  const copy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-400 text-sm leading-relaxed">
        Connect a live data stream from any platform. GhostLine's API processes
        signals in real time and fires alerts the moment a threat is detected.
      </p>

      {/* Endpoint card */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(0,229,200,0.15)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#00e5c8" }}
            />
            <span
              className="text-[11px] uppercase tracking-wider font-bold"
              style={{ color: "#00e5c8" }}
            >
              Live Endpoint
            </span>
          </div>
          <button
            onClick={copy}
            className="text-[11px] px-3 py-1 rounded-lg transition-all font-semibold"
            style={{
              background: copied
                ? "rgba(0,229,200,0.15)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${copied ? "rgba(0,229,200,0.3)" : "rgba(255,255,255,0.08)"}`,
              color: copied ? "#00e5c8" : "#888",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre
          className="text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all"
          style={{ color: "#7dd3fc", fontFamily: "Courier New, monospace" }}
        >
          {snippet}
        </pre>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Zap, label: "Sub-50ms latency", sub: "Real-time processing" },
          { icon: Wifi, label: "WebSocket support", sub: "Persistent streams" },
          {
            icon: Database,
            label: "REST + GraphQL",
            sub: "Flexible integration",
          },
          {
            icon: CheckCircle,
            label: "99.9% uptime SLA",
            sub: "Enterprise grade",
          },
        ].map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{
              background: "rgba(0,229,200,0.04)",
              border: "1px solid rgba(0,229,200,0.1)",
            }}
          >
            <Icon
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: "#00e5c8" }}
            />
            <div>
              <div className="text-[12px] font-semibold text-white">
                {label}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: "#556" }}>
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.open("/detect", "_blank", "noopener,noreferrer")}
        className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 flex items-center justify-center gap-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,229,200,0.2), rgba(0,200,150,0.2))",
          border: "1px solid rgba(0,229,200,0.3)",
          color: "#00e5c8",
        }}
      >
        Get your API Key <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Tab: Try Demo Dataset ─────────────────────────────────────
function DemoTab() {
  const [selected, setSelected] = useState<number | null>(null);
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  const runScan = (i: number) => {
    setSelected(i);
    setDone(false);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDone(true);
    }, 2200);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-400 text-sm leading-relaxed">
        Not ready to connect your own data? Run GhostLine against one of our
        pre-loaded real-world campaign datasets.
      </p>

      <div className="flex flex-col gap-2.5">
        {DEMO_DATASETS.map(({ name, size, threat, color }, i) => (
          <button
            key={i}
            onClick={() => runScan(i)}
            className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 w-full"
            style={{
              background:
                selected === i
                  ? "rgba(0,229,200,0.06)"
                  : "rgba(255,255,255,0.02)",
              border: `1px solid ${selected === i ? "rgba(0,229,200,0.3)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">
                {name}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "#556" }}>
                {size}
              </div>
            </div>
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
              style={{
                background:
                  threat === "HIGH"
                    ? "rgba(255,77,106,0.15)"
                    : "rgba(245,197,66,0.12)",
                border: `1px solid ${threat === "HIGH" ? "rgba(255,77,106,0.25)" : "rgba(245,197,66,0.2)"}`,
                color,
              }}
            >
              {threat}
            </span>
            <ChevronRight
              className="w-4 h-4 flex-shrink-0"
              style={{ color: selected === i ? "#00e5c8" : "#334" }}
            />
          </button>
        ))}
      </div>

      {/* Scanning animation */}
      {scanning && selected !== null && (
        <div
          className="p-4 rounded-xl"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(0,229,200,0.15)",
            animation: "ghostFadeUp 0.3s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#00e5c8" }}
            />
            <span
              className="text-[12px] font-mono"
              style={{ color: "#00e5c8" }}
            >
              Scanning {DEMO_DATASETS[selected].name}...
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "65%",
                background: "linear-gradient(90deg, #00e5c8, #8b5cf6)",
                animation: "ghostScan 2s ease infinite",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {["Temporal sync", "Semantic match", "Cluster graph"].map((l) => (
              <span key={l} className="text-[10px]" style={{ color: "#445" }}>
                {l}...
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Done state */}
      {done && selected !== null && (
        <div
          className="p-4 rounded-xl"
          style={{
            background: "rgba(255,77,106,0.05)",
            border: "1px solid rgba(255,77,106,0.2)",
            animation: "ghostFadeUp 0.3s ease",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#ff4d6a" }}
            />
            <span
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: "#ff4d6a" }}
            >
              Threat Detected
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              {
                val: DEMO_DATASETS[selected].size.split(" ")[0],
                label: "Accounts",
              },
              { val: "0.91", label: "Sync Score" },
              { val: "88%", label: "Confidence" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="text-center p-2 rounded-lg"
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                <div
                  className="text-[16px] font-black font-mono"
                  style={{ color: "#ff4d6a" }}
                >
                  {val}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "#556" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              window.open("/detect", "_blank", "noopener,noreferrer")
            }
            className="w-full py-2.5 rounded-xl text-[13px] font-bold transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #00e5c8, #00c896)",
              color: "#050508",
            }}
          >
            View Full Report <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <style>{`
        @keyframes ghostScan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

// ── Main GetStartedModal ──────────────────────────────────────
export default function GetStartedModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("demo");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTab("demo");
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!open) return null;

  const tabs: { id: Tab; icon: typeof Upload; label: string }[] = [
    { id: "demo", icon: Zap, label: "Try Demo" },
    { id: "upload", icon: Upload, label: "Upload Data" },
    { id: "api", icon: FileJson, label: "Live API" },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,8,0.82)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
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
              <Zap className="w-5 h-5" style={{ color: "#00e5c8" }} />
            </div>
            <div>
              <h2 className="text-white font-bold text-[17px] leading-tight">
                Get Started Free
              </h2>
              <p
                className="text-[12px] mt-0.5"
                style={{ color: "rgba(0,229,200,0.6)" }}
              >
                Choose how you want to connect your data
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

        {/* Tabs */}
        <div
          className="flex"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-bold uppercase tracking-wider transition-colors"
              style={{
                color: tab === id ? "#00e5c8" : "#555",
                borderBottom:
                  tab === id ? "2px solid #00e5c8" : "2px solid transparent",
                background: "none",
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="p-5"
          key={tab}
          style={{ animation: "ghostFadeUp 0.25s ease" }}
        >
          {tab === "upload" && <UploadTab />}
          {tab === "api" && <ApiTab />}
          {tab === "demo" && <DemoTab />}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[11px]" style={{ color: "#445" }}>
            No credit card required · Free tier available
          </p>
          <button
            onClick={onClose}
            className="text-[12px] font-semibold transition-colors hover:text-white"
            style={{ color: "#556" }}
          >
            Maybe later
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ghostPopIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);    }
        }
        @keyframes ghostFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}
