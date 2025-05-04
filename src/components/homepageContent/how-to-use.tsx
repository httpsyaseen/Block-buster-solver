"use client";

import { useState, useEffect } from "react";
import { ImageIcon, Upload, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function HowToUse() {
  const [openItem, setOpenItem] = useState<string>("item-1");

  const steps = [
    {
      id: "item-1",
      icon: <ImageIcon className="text-purple-600" size={24} />,
      title: "Take a Screenshot",
      description:
        "Take a screenshot of your Block Blast game board when you are actively playing the game.",
      image: "/example.png",
    },
    {
      id: "item-2",
      icon: <Upload className="text-purple-600" size={24} />,
      title: "Upload to Solver",
      description:
        "Open our Block Blast Solver tool to upload the screenshot you have taken.",
      image: "/example.png",
    },
    {
      id: "item-3",
      icon: <Lightbulb className="text-purple-600" size={24} />,
      title: "Receive Solutions",
      description:
        "The AI system will process the board to generate step-by-step solutions with the most effective moves.",
      image: "/example.png",
    },
  ];

  // Auto-cycle through accordion items
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenItem((current) => {
        const currentIndex = steps.findIndex((step) => step.id === current);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex].id;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleValueChange = (value: string) => {
    if (value) setOpenItem(value);
  };

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold text-black mb-6">
        How to Use the Block Blast Solver?
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left side - Accordion */}
        <div>
          <Accordion
            type="single"
            value={openItem}
            onValueChange={handleValueChange}
            className="w-full"
          >
            {steps.map((step) => (
              <AccordionItem
                key={step.id}
                value={step.id}
                className="[&[data-state=open]>svg]:border-b-2 border-purple-300 last:border-0"
              >
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center text-left">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-16 pr-4 pb-4">
                  <p className="text-gray-600 text-base">{step.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {openItem === "item-1" && (
              <motion.div
                key="image-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={"/example.png"}
                  alt="Block Blast Solver"
                  height={500}
                  width={200}
                />
              </motion.div>
            )}
            {openItem === "item-2" && (
              <motion.div
                key="image-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={"/example.png"}
                  alt="Block Blast Solver"
                  height={500}
                  width={200}
                />
              </motion.div>
            )}
            {openItem === "item-3" && (
              <motion.div
                key="image-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={"/example.png"}
                  alt="Block Blast Solver"
                  height={500}
                  width={200}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
