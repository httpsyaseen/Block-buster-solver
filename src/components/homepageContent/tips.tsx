"use client";

import { BrainCog, Layers, Expand } from "lucide-react";

const TIPS = [
  {
    icon: BrainCog,
    title: "Plan Ahead",
    points: [
      "Always think a few moves ahead to avoid blocking potential lines.",
    ],
  },
  {
    icon: Layers,
    title: "Utilize Combos",
    points: ["Try to clear multiple lines simultaneously for bonus points."],
  },
  {
    icon: Expand,
    title: "Manage Space",
    points: [
      "Keep the grid as clear as possible to allow for more placement options.",
    ],
  },
];

export default function Tips() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Tips to Achieve High Scores in Block Blast
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {TIPS.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 text-center border-2 border-purple-800"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {tip.title}
                </h3>
                <ul className="text-base space-y-2  text-gray-700  text-center">
                  {tip.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
