import React from 'react'

const TabSelector = ({ activeTab, setActiveTab }) => {
    const tabs = [
        {id:'sorting',label:'Sorting'},
        {id:'graph',label:'Graph'},
        {id:'tree',label:'Tree'}
    ];
  return (
    <div style={{ 
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center'
    }}>
        <div style={{ 
          display: 'flex', 
          gap: '5px',
          backgroundColor: '#f3f4f6',
          padding: '4px',
          borderRadius: '8px'
        }}>
            {tabs.map((tab)=>(
                <button 
                  key={tab.id} 
                  onClick={()=> setActiveTab(tab.id)}
                  style={{
                    backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#4b5563',
                    border: 'none',
                    padding: '8px 24px',
                    margin: '0',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    minWidth: '100px',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = '#e5e7eb';
                      e.target.style.color = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#4b5563';
                    }
                  }}
                >
                  {tab.label}
                </button>
            ))}
        </div>
    </div>
  )
}

export default TabSelector