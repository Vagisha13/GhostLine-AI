import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import NetworkGraph from "./components/NetworkGraph";
import ThreatDashboard from "./components/ThreatDashboard";
import ParticleField from "./components/ParticleField";
import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ProblemStatement from "./components/ProblemStatement";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import StatsSection from "./components/StatsSection";
import { Toaster } from "./components/ui/sonner";
import UseCases from "./components/UseCases";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detect from "./pages/Detect";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";
import Getstartedmodal from "./components/Getstartedmodal";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(10, 14, 24, 0.9)",
            border: "1px solid rgba(56, 232, 225, 0.2)",
            color: "white",
            backdropFilter: "blur(12px)",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* Detect Page */}
          <Route path="/detect" element={<Detect />} />

          {/* Landing Page */}
          <Route
            path="/"
            element={
              <div className="w-full min-h-full bg-[#050508] relative overflow-y-auto overflow-x-hidden">
                {/* Background Canvas */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                  <Canvas
                    camera={{ position: [0, 0, 50], fov: 75 }}
                    gl={{ antialias: true, alpha: true }}
                  >
                    <color attach="background" args={["#050508"]} />
                    <fog attach="fog" args={["#050508", 50, 200]} />
                    <ambientLight intensity={0.3} />
                    <pointLight
                      position={[10, 10, 10]}
                      intensity={1}
                      color="#00ffaa"
                    />
                    <pointLight
                      position={[-10, -10, -10]}
                      intensity={0.5}
                      color="#8b5cf6"
                    />
                    <Suspense fallback={null}>
                      <Stars
                        radius={100}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={1}
                      />
                      <ParticleField />
                    </Suspense>
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      autoRotate
                      autoRotateSpeed={0.5}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 2}
                    />
                  </Canvas>
                </div>

                {/* Scanline Effect */}
                <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
                  <div className="scanline absolute w-full h-1 bg-gradient-to-b from-transparent via-cyan-500/8 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  <Navbar />
                  <HeroSection />
                  <ProblemStatement />
                  <FeaturesSection />
                  <HowItWorks />
                  <StatsSection />

                  {/* Network Section */}
                  <section id="network" className="py-16 sm:py-24 relative">
                    <div className="container mx-auto px-4 sm:px-6">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5 mx-auto flex justify-center w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                          Live Visualization
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          Live Threat Network
                        </span>
                      </h2>

                      <p className="text-gray-400 text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
                        Real-time 3D visualization of coordinated behavior
                        patterns and suspicious account clusters
                      </p>

                      <div className="w-[90%] mx-auto h-[350px] sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-cyan-500/20 bg-black/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/5">
                        <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
                          <ambientLight intensity={0.5} />
                          <pointLight
                            position={[10, 10, 10]}
                            intensity={1}
                            color="#00ffaa"
                          />
                          <Suspense fallback={null}>
                            <NetworkGraph />
                          </Suspense>
                          <OrbitControls enableZoom enablePan />
                        </Canvas>
                      </div>
                    </div>
                  </section>

                  <ThreatDashboard />
                  <UseCases />
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
