import React from 'react'
import './TabSelector.css'

const TabSelector = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'sorting', label: 'Sorting' },
    { id: 'graph', label: 'Graph' },
    { id: 'tree', label: 'Tree' }
  ];
  return (
    <div className="tab-selector">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabSelector