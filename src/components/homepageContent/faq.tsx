"use client";

export default function FAQ() {
  const faqItems = [
    {
      question: "What is Block Blast Solver?",
      answer:
        "An AI-powered tool that analyzes your Block Blast game board and provides optimal solutions to help you achieve higher scores.",
    },
    {
      question: "Is Block Blast Solver free to use?",
      answer:
        "Yes, our solver is completely free and accessible online without any downloads.",
    },
    {
      question: "How accurate is the Block Blast Solver?",
      answer:
        "The solver uses advanced algorithms to provide accurate solutions based on your game board's current state.",
    },
    {
      question: "Can I use Block Blast Solver on mobile devices?",
      answer:
        "Yes, our solver is designed to work seamlessly on both desktop and mobile devices.",
    },
    {
      question: "Does Block Blast Solver store my screenshots?",
      answer:
        "No, your privacy is important to us. We do not store any screenshots you upload.",
    },
    {
      question: "How often is the solver updated?",
      answer:
        "The solver is regularly updated to keep up with new game features and levels.",
    },
    {
      question: "What makes Block Blast Solver unique?",
      answer:
        "It offers AI-powered, instant solutions and adapts to new updates for optimal strategies.",
    },
    {
      question: "Can Block Blast Solver help with special blocks?",
      answer:
        "Yes, it recognizes all special blocks and suggests the best strategies for them.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-4xl font-bold text-center text-black mb-3">
            FAQ About Block Blast Solver
          </h2>
          <p className="text-gray-500 text-center max-w-2xl">
            Discover everything you need to know about our Block Blast Solver
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {item.question}
                </h3>
                <p className="text-gray-600 text-base">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
