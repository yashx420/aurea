import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
// Utility to wrap a number between a min and max range
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Calculate wrap based on % (4 copies = 25% each)
  // We wrap from 0 to -25 so it seamlessly resets after scrolling 1/4th of the total width
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div
        className="scroller font-bold uppercase text-[6rem] md:text-[9rem] whitespace-nowrap flex flex-nowrap"
        style={{ x }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

import k3 from "../assets/clients/k3.png";
import wavii from "../assets/clients/wavii.png";
import perspectives from "../assets/clients/perspectives.png";
import insic from "../assets/clients/insic.png";
import adhdCertify from "../assets/clients/adhd_certify.png";
import cogniosis from "../assets/clients/cogniosis.png";
import gfrConsult from "../assets/clients/gfr_consult.png";

const clients = [
  { name: "K3", logo: k3 },
  { name: "Wavii", logo: wavii },
  { name: "Perspectives", logo: perspectives },
  { name: "Insic", logo: insic },
  { name: "ADHD Certify", logo: adhdCertify },
  { name: "Cogniosis", logo: cogniosis },
  { name: "GFR Consult", logo: gfrConsult },
];

export default function ClientsTicker() {
  return (
    <section className="py-24 bg-black relative z-10 overflow-hidden">
      {/* Central Badge "10+ Satisfied Clients" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(94,24,234,0.3)]">
          <span className="text-white font-bold text-xl md:text-2xl tracking-tight">
            <span className="text-[#5e18ea]">10+</span> Satisfied Clients
          </span>
        </div>
      </div>

      {/* Ticker 1 - Left */}
      <div className="mt-8">
        <ParallaxText baseVelocity={-2}>
          {clients.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 md:mx-16 flex items-center justify-center p-4 rounded-xl shadow-lg min-w-[240px] h-[120px]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </ParallaxText>
      </div>

      {/* Ticker 2 - Right (Reverse) */}
      <div className="mt-8">
        <ParallaxText baseVelocity={2}>
          {clients.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 md:mx-16 flex items-center justify-center p-4 rounded-xl shadow-lg min-w-[240px] h-[120px]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </ParallaxText>
      </div>
    </section>
  );
}
