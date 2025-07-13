import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import './ControlPanel.css';

const ControlPanel = ({
  isPlaying,
  togglePlay,
  reset,
  speed,
  setSpeed,
  currentStep,
  totalSteps,
  onStepChange
}) => {
  const handlePreviousStep = () => {
    if (currentStep > 0 && onStepChange) {
      onStepChange(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1 && onStepChange) {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <div className="control-panel">
      {/* Play / Pause Button */}
      <button
        onClick={togglePlay}
        className={`control-button ${isPlaying ? 'pause-button' : 'play-button'}`}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? ' Pause' : ' Play'}
      </button>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="control-button reset-button"
      >
        <RotateCcw size={16} /> Reset
      </button>

      {/* Step Navigation */}
      <div className="step-navigation">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          className="step-button"
        >
          <SkipBack size={16} />
        </button>

        <span className="step-counter">
          Step: {currentStep + 1} / {totalSteps}
        </span>

        <button
          onClick={handleNextStep}
          disabled={currentStep >= totalSteps - 1}
          className="step-button"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Speed Control */}
      <div className="speed-control">
        <label className="speed-label">Speed: </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="speed-slider"
        />
        <span className="speed-value">{speed}%</span>
      </div>
    </div>
  );
};

export default ControlPanel;
