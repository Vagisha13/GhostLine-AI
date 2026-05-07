import { useState } from "react";
import { toast } from "../components/ui/sonner";
import {
  Plus,
  Play,
  Loader2,
  Shield,
  ArrowLeft,
  X,
  Terminal,
  Cpu,
  ChevronDown,
} from "lucide-react";
import { StarField } from "../components/StarField";
import PostForm from "../components/PostForm";
import { Results } from "../components/Results";
import { analyzePosts, DETECTION_API_URL } from "../lib/api";

const emptyPost = () => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  username: "",
  timestamp: new Date().toISOString().slice(0, 16),
  content: "",
  platform: "x",
});

const MODES = {
  single: {
    label: "Single Post",
    sub: "Ingest one post into the vector store",
    max: 1,
  },
  bulk: {
    label: "Bulk Coordination",
    sub: "Analyze up to 10 posts for coordinated behavior",
    max: 10,
  },
};

export default function Detect() {
  const [mode, setMode] = useState("bulk");
  const [posts, setPosts] = useState([emptyPost(), emptyPost()]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const cfg = MODES[mode];

  const switchMode = (next) => {
    if (!next || next === mode) return;
    setMode(next);
    setResult(null);
    setError(null);
    setPosts(next === "single" ? [emptyPost()] : [emptyPost(), emptyPost()]);
  };

  const updatePost = (i, next) =>
    setPosts((prev) => prev.map((p, idx) => (idx === i ? next : p)));

  const addPost = () => {
    if (posts.length >= cfg.max) return;
    setPosts((prev) => [...prev, emptyPost()]);
  };

  const removePost = (i) =>
    setPosts((prev) => prev.filter((_, idx) => idx !== i));

  const validate = () => {
    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      if (!p.username.trim() || !p.content.trim() || !p.platform) {
        toast.error(`Post #${i + 1} is missing required fields`);
        return false;
      }
    }
    if (mode === "bulk" && posts.length < 2) {
      toast.error("Bulk mode needs at least 2 posts");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const payload = posts.map((p) => ({
      username: p.username,
      content: p.content,
      platform: p.platform,
      timestamp: new Date(p.timestamp).toISOString(),
    }));
    try {
      const data = await analyzePosts(payload);
      setResult(data);
      toast.success("Analysis complete");
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.message ||
        e?.message ||
        "Request failed";
      setError(msg);
      toast.error(`Backend error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen text-white"
      style={{ background: "#050508", fontFamily: "'Manrope', sans-serif" }}
    >
      <StarField />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,200,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Scanline */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* ── Header ── */}
      <header
        className="relative z-10 sticky top-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(5,5,8,0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, #00e5c8, #00c896)",
                boxShadow: "0 0 20px rgba(0,229,200,0.3)",
              }}
            >
              <Shield className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight">
                GhostLine AI
              </div>
              <div
                className="text-[10px] font-mono uppercase tracking-[0.25em]"
                style={{ color: "rgba(0,229,200,0.5)" }}
              >
                Detection Console
              </div>
            </div>
          </div>

          {/* Live indicator */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,229,200,0.08)",
              border: "1px solid rgba(0,229,200,0.15)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#00e5c8" }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "#00e5c8" }}
            >
              System Online
            </span>
          </div>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Page title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(0,229,200,0.08)",
              border: "1px solid rgba(0,229,200,0.15)",
            }}
          >
            <Terminal className="w-3.5 h-3.5" style={{ color: "#00e5c8" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "#00e5c8" }}
            >
              AI Detection Pipeline
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Run{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00e5c8, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Detection
            </span>
          </h1>
          <p
            className="text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Paste social media posts below — GhostLine will analyze for
            coordinated manipulation patterns.
          </p>
        </div>

        {/* ── Mode selector ── */}
        <div className="mb-8">
          <div
            className="inline-flex p-1 rounded-xl gap-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {Object.entries(MODES).map(([key, m]) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={
                  mode === key
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(0,229,200,0.2), rgba(0,200,150,0.15))",
                        border: "1px solid rgba(0,229,200,0.3)",
                        color: "#00e5c8",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid transparent",
                        color: "rgba(255,255,255,0.4)",
                      }
                }
              >
                {m.label}
                <span className="ml-2 text-[10px] opacity-60 hidden sm:inline">
                  {m.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Post count indicator (bulk) ── */}
        {mode === "bulk" && (
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" style={{ color: "#00e5c8" }} />
              <span
                className="text-[12px] font-mono"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {posts.length} / {cfg.max} posts queued
              </span>
            </div>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </div>
        )}

        {/* ── Post forms ── */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {/* Post header bar */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(0,229,200,0.03)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00e5c8" }}
                  />
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: "rgba(0,229,200,0.7)" }}
                  >
                    Post #{i + 1}
                  </span>
                </div>
                {mode === "bulk" && posts.length > 2 && (
                  <button
                    onClick={() => removePost(i)}
                    className="p-1.5 rounded-lg transition-all duration-200"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff4d6a";
                      e.currentTarget.style.background = "rgba(255,77,106,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Actual form */}
              <div className="p-5">
                <PostForm
                  index={i}
                  post={post}
                  onChange={(p) => updatePost(i, p)}
                  onRemove={() => removePost(i)}
                  removable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Add Post button ── */}
        {mode === "bulk" && posts.length < cfg.max && (
          <button
            onClick={addPost}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(0,229,200,0.04)",
              border: "1px dashed rgba(0,229,200,0.2)",
              color: "rgba(0,229,200,0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,229,200,0.08)";
              e.currentTarget.style.borderColor = "rgba(0,229,200,0.4)";
              e.currentTarget.style.color = "#00e5c8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,229,200,0.04)";
              e.currentTarget.style.borderColor = "rgba(0,229,200,0.2)";
              e.currentTarget.style.color = "rgba(0,229,200,0.6)";
            }}
          >
            <Plus className="w-4 h-4" />
            Add Another Post
          </button>
        )}

        {/* ── Submit row ── */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#556" }}
            />
            <span
              className="text-[11px] font-mono"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {DETECTION_API_URL}
            </span>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
            style={
              loading
                ? {
                    background: "rgba(0,229,200,0.1)",
                    border: "1px solid rgba(0,229,200,0.2)",
                    color: "rgba(0,229,200,0.5)",
                    cursor: "not-allowed",
                  }
                : {
                    background: "linear-gradient(135deg, #00e5c8, #00c896)",
                    color: "#050508",
                    boxShadow: "0 0 30px rgba(0,229,200,0.25)",
                  }
            }
            onMouseEnter={(e) => {
              if (!loading)
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(0,229,200,0.4)";
            }}
            onMouseLeave={(e) => {
              if (!loading)
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(0,229,200,0.25)";
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Detection
              </>
            )}
          </button>
        </div>

        {/* ── Loading state ── */}
        {loading && (
          <div
            className="mt-6 p-5 rounded-2xl"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(0,229,200,0.15)",
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
                GhostLine detection pipeline running...
              </span>
            </div>
            {[
              "Temporal sync analysis",
              "Semantic pattern matching",
              "Network cluster detection",
              "Generating evidence report",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-2 py-1">
                <Loader2
                  className="w-3 h-3 animate-spin flex-shrink-0"
                  style={{
                    color: "rgba(0,229,200,0.4)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
                <span
                  className="text-[11px] font-mono"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {step}...
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div
            className="mt-6 flex items-start gap-3 p-4 rounded-2xl"
            style={{
              background: "rgba(255,77,106,0.08)",
              border: "1px solid rgba(255,77,106,0.2)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: "#ff4d6a" }}
            />
            <div>
              <div
                className="text-[12px] font-bold uppercase tracking-wider mb-1"
                style={{ color: "#ff4d6a" }}
              >
                Detection Error
              </div>
              <div
                className="text-sm font-mono"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {error}
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {result && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#00e5c8" }}
              />
              <span
                className="text-[12px] font-mono font-bold uppercase tracking-wider"
                style={{ color: "#00e5c8" }}
              >
                Analysis Complete
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(0,229,200,0.1)" }}
              />
            </div>
            <Results data={result} />
          </div>
        )}
      </main>
    </div>
  );
}
