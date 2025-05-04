import React from "react";

export default function PerformanceReliability() {
  return (
    <section className="mb-12 ">
      <h2 className="text-4xl text-center font-bold  my-12">
        Performance & Reliability
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
          <p className="text-gray-600">
            The Block Blast Solver delivers your game solutions in under a
            second to provide you with timely results. The solver ensures you
            never need to pause your gameplay because it delivers instant
            results.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Precision and Reliability
          </h3>
          <p className="text-gray-600">
            The Block Blast Solver delivers precise solutions through its
            advanced pattern recognition system. The solver maintains a 99.9%
            accuracy rate which means you will receive reliable results in every
            game level and mode.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 12a9 9 0 0 0 15 6.7L21 16"></path>
              <path d="M21 22v-6h-6"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
          <p className="text-gray-600">
            Our solver receives periodic updates which enable it to support new
            game versions and features. The solver provides you with continuous
            access to new strategies and improvements which keeps you ahead in
            the game.
          </p>
        </div>
      </div>
    </section>
  );
}
