import { ScanLine, Zap, Brain, Eye, LineChart, RefreshCw } from "lucide-react";

const FEATURES = [
  {
    icon: ScanLine,
    title: "Automatic Block Recognition",
    description:
      "The manual entry of blocks becomes unnecessary. The solver uses smart image recognition to automatically detect and understand your game board.",
  },
  {
    icon: Zap,
    title: "Super Fast Solutions",
    description:
      "The solver's AI technology delivers solutions at lightning speed which transforms complicated puzzles into straightforward strategies before your next move",
  },
  {
    icon: Brain,
    title: "Smart Strategy Suggestions",
    description:
      "The solver functions as your individual game mentor. The solver provides more than move suggestions because it determines the most effective method to eliminate all blocks from the board.",
  },
  {
    icon: Eye,
    title: "Clear Step-by-Step Solution",
    description:
      "Our system transforms complicated solutions into straightforward steps which guide you through your next actions.",
  },
  {
    icon: LineChart,
    title: "Track Your Progress",
    description:
      "You can monitor your gameplay improvement through detailed statistical analysis of your performance.",
  },
  {
    icon: RefreshCw,
    title: "Always Up-To-Date",
    description:
      "The solver remains current with fresh updates and new levels which are added frequently to support the latest features.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-[36px] font-bold text-center mb-2">
        Why Choose Block Blast Solver?
      </h2>
      <p className=" text-gray-600 text-lg mb-16 mx-auto text-center">
        Block Blast Solver offers:
      </p>

      <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex flex-col  ">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1a1d26]  ">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
