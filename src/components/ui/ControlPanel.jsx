import React, { useState } from 'react'
import { Settings, Wrench, Info } from 'lucide-react'
import '../styles/ControlPanel.css'

export default function ControlPanel() {
  const [activeTab, setActiveTab] = useState('view')
  
  return (
    <div className="control-panel">
      <div className="control-tabs">
        <button 
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => setActiveTab('view')}
        >
          <Settings size={20} />
          View
        </button>
        <button 
          className={activeTab === 'maintenance' ? 'active' : ''}
          onClick={() => setActiveTab('maintenance')}
        >
          <Wrench size={20} />
          Maintenance
        </button>
        <button 
          className={activeTab === 'info' ? 'active' : ''}
          onClick={() => setActiveTab('info')}
        >
          <Info size={20} />
          Info
        </button>
      </div>
      
      <div className="control-content">
        {activeTab === 'view' && (
          <div className="tab-content">
            <h3>View Controls</h3>
            <p>Use mouse to orbit around the bike:</p>
            <ul>
              <li>Left click + drag: Rotate</li>
              <li>Right click + drag: Pan</li>
              <li>Scroll: Zoom in/out</li>
            </ul>
            <div className="control-section">
              <h4>Display Options</h4>
              <label>
                <input type="checkbox" defaultChecked />
                Show Shadows
              </label>
              <label>
                <input type="checkbox" defaultChecked />
                Show Grid
              </label>
            </div>
          </div>
        )}
        
        {activeTab === 'maintenance' && (
          <div className="tab-content">
            <h3>Maintenance Tracking</h3>
            <p className="coming-soon">Coming soon: Track component wear, service history, and replacement schedules.</p>
            <div className="component-list">
              <div className="component-item">
                <strong>Chain</strong>
                <span className="status good">Good</span>
              </div>
              <div className="component-item">
                <strong>Front Tire</strong>
                <span className="status warning">Service Soon</span>
              </div>
              <div className="component-item">
                <strong>Rear Tire</strong>
                <span className="status warning">Service Soon</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'info' && (
          <div className="tab-content">
            <h3>Bike Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Model:</strong>
                <span>Specialized Diverge Comp Carbon</span>
              </div>
              <div className="info-item">
                <strong>Year:</strong>
                <span>2021</span>
              </div>
              <div className="info-item">
                <strong>Type:</strong>
                <span>Gravel</span>
              </div>
              <div className="info-item">
                <strong>Frame:</strong>
                <span>FACT 9r Carbon</span>
              </div>
              <div className="info-item">
                <strong>Groupset:</strong>
                <span>Shimano GRX 810 (2x11)</span>
              </div>
              <div className="info-item">
                <strong>Wheels:</strong>
                <span>Roval Terra CLX</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
