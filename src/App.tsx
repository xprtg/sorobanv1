import { useState } from "react";
import { SorobanPractice } from "./components/SorobanPractice";
import { ConfigModal } from "./components/ConfigModal";
import { PracticeConfig } from "./types";

function App() {
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [config, setConfig] = useState<PracticeConfig>({
    timeBetweenNumbers: 2,
    numberOfNumbers: 10,
    minNumber: 1,
    maxNumber: 999,
  });

  const handleStartPractice = (newConfig: PracticeConfig) => {
    setConfig(newConfig);
    setIsConfigOpen(false);
  };

  const handlePracticeComplete = () => {
    setIsConfigOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Soroban Practice
          </h1>
          <p className="text-gray-600 text-lg">
            Practica sumas mentales con el ábaco japonés
          </p>
        </header>

        {isConfigOpen ? (
          <ConfigModal
            config={config}
            onStart={handleStartPractice}
            isOpen={isConfigOpen}
          />
        ) : (
          <SorobanPractice
            config={config}
            onComplete={handlePracticeComplete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
