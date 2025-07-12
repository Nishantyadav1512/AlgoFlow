import React from 'react';

const Legend = ({ type }) => {
  const getLegendItems = () => {
    if (type === 'sorting') {
      return [
        { color: '#3b82f6', label: 'Unsorted' },
        { color: '#f59e0b', label: 'Comparing' },
        { color: '#ef4444', label: 'Swapping' },
        { color: '#22c55e', label: 'Sorted' },
      ];
    }

    if (type === 'graph' || type === 'tree') {
      return [
        { color: '#3b82f6', label: 'Unvisited' },
        { color: '#ef4444', label: 'Current' },
        { color: '#22c55e', label: 'Visited' },
      ];
    }

    return [];
  };

  return (
    <div style={{ 
      marginTop: '24px',
      padding: '16px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: 'bold' }}>Legend:</h4>
      <div style={{ display: 'flex', gap: '24px', marginTop: '8px', flexWrap: 'wrap' }}>
        {getLegendItems().map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: item.color,
              borderRadius: type === 'sorting' ? '3px' : '50%',
              border: '1px solid #d1d5db'
            }} />
            <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
