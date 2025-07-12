import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

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
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px', 
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }}>
      {/* Play / Pause Button */}
      <button 
        onClick={togglePlay}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '8px 16px',
          backgroundColor: isPlaying ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s ease'
        }}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? ' Pause' : ' Play'}
      </button>

      {/* Reset Button */}
      <button 
        onClick={reset}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s ease'
        }}
      >
        <RotateCcw size={16} /> Reset
      </button>

      {/* Step Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          style={{
            padding: '8px',
            backgroundColor: currentStep === 0 ? '#e9ecef' : '#007bff',
            color: currentStep === 0 ? '#6c757d' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <SkipBack size={16} />
        </button>
        
        <span style={{ fontSize: '14px', minWidth: '80px', textAlign: 'center' }}>
          Step: {currentStep + 1} / {totalSteps}
        </span>
        
        <button
          onClick={handleNextStep}
          disabled={currentStep >= totalSteps - 1}
          style={{
            padding: '8px',
            backgroundColor: currentStep >= totalSteps - 1 ? '#e9ecef' : '#007bff',
            color: currentStep >= totalSteps - 1 ? '#6c757d' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentStep >= totalSteps - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Speed Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Speed: </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ width: '100px' }}
        />
        <span style={{ fontSize: '14px', minWidth: '40px' }}>{speed}%</span>
      </div>
    </div>
  );
};

export default ControlPanel;
