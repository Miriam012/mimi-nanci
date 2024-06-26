"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [floatingTextVisible, setFloatingTextVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingTextVisible(true);
      setTimeout(() => {
        setFloatingTextVisible(false);
      }, 4000); // Text stays visible for 4 seconds
    }, 7000); // Text reappears every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start p-10 bg-cover bg-center bg-no-repeat overflow-y-scroll">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay 
        muted 
        loop 
      >
        <source src="/pp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-20 left-10 max-w-md z-10">
        <h1 className="text-4xl font-bold mb-4 text-white">FISH FOR FOOD</h1>
        <p className="text-lg mb-4 text-white">
          According to David Wallace-Wells, Greenpeace demands that the world must immediately cut its meat and dairy consumption by half by 2050 to avert a catastrophic climate disaster.
        </p>
        <p className="text-lg mb-6 text-white">
          Discover how Project FFF will replace beef with fish and change our future.
        </p>
        <Link href="/information">
          <div className="bg-gray-300 bg-opacity-70 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 cursor-pointer text-center font-bold text-lg">
            OUR SCENARIO
          </div>
        </Link>
      </div>

      <div className="relative z-10 mt-96 ml-10 space-y-8">
        <Link href="/design">
          <div className="relative w-64 h-16 transition-transform transform hover:scale-105 cursor-pointer bg-gray-300 bg-opacity-70 rounded-md flex items-center justify-center mb-8 font-bold text-lg">
            <span className="text-white">DRAWING GALLERY</span>
          </div>
        </Link>
        <Link href="/agents">
          <div className="relative w-64 h-16 transition-transform transform hover:scale-105 cursor-pointer bg-gray-300 bg-opacity-70 rounded-md flex items-center justify-center mb-8 font-bold text-lg">
            <span className="text-white">WORLD ENGINE SIMULATION</span>
          </div>
        </Link>
        <Link href="/recording">
          <div className="relative w-64 h-16 transition-transform transform hover:scale-105 cursor-pointer bg-gray-300 bg-opacity-70 rounded-md flex items-center justify-center font-bold text-lg">
            <span className="text-white">RECORDING</span>
          </div>
        </Link>
      </div>

      <div className={`absolute bottom-0 text-white text-center text-sm p-4 z-10 w-full flex justify-center ${floatingTextVisible ? 'floating-text' : ''}`}>
        <div>
          THIS JOURNEY TAKES YOU BACK 30 YEARS THROUGH THE EYES OF A DEDICATED TEAM THAT INITIATED A GROUNDBREAKING PROJECT TO CHANGE THE WORLD. EXPERIENCE HOW THEY OVERCAME IMMENSE CHALLENGES TO DESIGN FISH FARMS THAT SUSTAIN THE GLOBAL POPULATION.
          <br />
          DISCOVER THE INTRICACIES OF THEIR PROCESS AND WATCH OUR WORLD ENGINE SIMULATION TO SEE THE IMPACT OF THEIR EFFORTS.
        </div>
      </div>
    </main>
  );
}
