"use client";
import {
  Zap,
  Brain,
  Infinity,
  BarChart3,
  Eye,
  Gamepad2,
  LayoutGrid,
} from "lucide-react";

export default function CoreFeatures() {
  const features = [
    {
      title: "Free Unlimited Solutions",
      description:
        "Access completely free solutions without any downloads required. Enjoy unlimited usage with support for all grid sizes.",
      icon: <Infinity className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "MOD-Like Features",
      description:
        "Benefit from advanced pattern analysis, chain reaction tips, and score optimization strategies just like premium mods.",
      icon: <Gamepad2 className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "High Score Guide",
      description:
        "Learn score maximization techniques, combo strategies, and professional tips and tricks to achieve top rankings.",
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Intelligent Move Suggestions",
      description:
        "Receive AI-powered analysis that identifies optimal moves and provides instant recommendations for your gameplay.",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Real-Time Feedback",
      description:
        "Get instant analysis of your moves with visualized solutions and live game board updates as you play.",
      icon: <Eye className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Customizable Difficulty Levels",
      description:
        "Enjoy tailored difficulty settings with adjustable speed and challenge options perfect for players of all skill levels.",
      icon: <LayoutGrid className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Game Analytics Dashboard",
      description:
        "Track your performance with detailed stats, level completion metrics, and historical comparisons of your gameplay.",
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Visual & Interactive Interface",
      description:
        "Experience clear visual feedback for every move with an interactive grid for easy navigation and intuitive controls.",
      icon: <Zap className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          Block Blast Solver Offers:
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-4 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3  text-center">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
