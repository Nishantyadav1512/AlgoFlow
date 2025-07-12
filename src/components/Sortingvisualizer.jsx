import React from 'react';

const SortingVisualizer = ({
  array,
  comparing,
  swapping,
  sorted,
  algorithm,
  setAlgorithm,
  generateArray,
}) => {
  console.log('SortingVisualizer render - array:', array, 'length:', array.length);
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '24px',
      padding: '24px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    }}>
      {/* Bars Display */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        height: '320px', 
        gap: '2px', 
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        minWidth: '600px',
        justifyContent: 'center'
      }}>
        {array.length === 0 ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: '#6b7280',
            fontSize: '16px'
          }}>
            Click "Generate New Array" to start
          </div>
        ) : (
          array.map((value, index) => {
            let bgColor = '#3b82f6';
            let borderColor = '#2563eb';
            
            if (sorted.includes(index)) {
              bgColor = '#22c55e';
              borderColor = '#16a34a';
            } else if (swapping.includes(index)) {
              bgColor = '#ef4444';
              borderColor = '#dc2626';
            } else if (comparing.includes(index)) {
              bgColor = '#f59e0b';
              borderColor = '#d97706';
            }

            return (
              <div
                key={index}
                style={{
                  height: `${value}px`,
                  width: '20px',
                  backgroundColor: bgColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '2px 2px 0 0',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '5px',
                  transition: 'all 0.3s ease',
                  minHeight: '20px'
                }}
                title={`Value: ${value}`}
              >
                {value}
              </div>
            );
          })
        )}
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        flexWrap: 'wrap',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#374151' }}>Algorithm:</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>

        <button 
          onClick={() => {
            console.log('Generate New Array button clicked');
            generateArray();
          }} 
          style={{
            padding: '8px 16px',
            backgroundColor: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0891b2';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#06b6d4';
          }}
        >
          Generate New Array
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
