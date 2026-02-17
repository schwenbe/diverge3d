import React, { useState } from 'react'
import { Settings, Wrench, Info, ChevronDown, ChevronUp, Plus, Calendar } from 'lucide-react'
import '../styles/ControlPanel.css'

const INITIAL_COMPONENTS = [
  { id: 'chain', name: 'Chain', status: 'good', miles: 1200, maxMiles: 3000, lastService: '2024-11-15' },
  { id: 'front-tire', name: 'Front Tire', status: 'warning', miles: 2800, maxMiles: 3500, lastService: '2024-08-20' },
  { id: 'rear-tire', name: 'Rear Tire', status: 'warning', miles: 2800, maxMiles: 3500, lastService: '2024-08-20' },
  { id: 'brake-pads-f', name: 'Front Brake Pads', status: 'good', miles: 800, maxMiles: 2500, lastService: '2024-12-01' },
  { id: 'brake-pads-r', name: 'Rear Brake Pads', status: 'good', miles: 800, maxMiles: 2500, lastService: '2024-12-01' },
  { id: 'cassette', name: 'Cassette', status: 'good', miles: 1200, maxMiles: 6000, lastService: '2024-11-15' },
  { id: 'bar-tape', name: 'Bar Tape', status: 'good', miles: 1200, maxMiles: 4000, lastService: '2024-10-01' },
  { id: 'cables', name: 'Shift Cables', status: 'good', miles: 1200, maxMiles: 5000, lastService: '2024-11-15' },
]

function getStatus(miles, maxMiles) {
  const ratio = miles / maxMiles
  if (ratio >= 0.9) return 'critical'
  if (ratio >= 0.7) return 'warning'
  return 'good'
}

function getStatusLabel(status) {
  switch (status) {
    case 'critical': return 'Replace Soon'
    case 'warning': return 'Service Soon'
    default: return 'Good'
  }
}

export default function ControlPanel({ showGrid, setShowGrid, showShadows, setShowShadows }) {
  const [activeTab, setActiveTab] = useState('view')
  const [collapsed, setCollapsed] = useState(false)
  const [components, setComponents] = useState(INITIAL_COMPONENTS)
  const [expandedComponent, setExpandedComponent] = useState(null)

  const toggleComponent = (id) => {
    setExpandedComponent(expandedComponent === id ? null : id)
  }

  return (
    <div className={`control-panel ${collapsed ? 'collapsed' : ''}`}>
      {/* Collapse toggle */}
      <button
        className="collapse-toggle"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Expand panel' : 'Collapse panel'}
      >
        {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {!collapsed && (
        <>
          <div className="control-tabs">
            <button
              className={activeTab === 'view' ? 'active' : ''}
              onClick={() => setActiveTab('view')}
            >
              <Settings size={18} />
              View
            </button>
            <button
              className={activeTab === 'maintenance' ? 'active' : ''}
              onClick={() => setActiveTab('maintenance')}
            >
              <Wrench size={18} />
              Maint.
            </button>
            <button
              className={activeTab === 'info' ? 'active' : ''}
              onClick={() => setActiveTab('info')}
            >
              <Info size={18} />
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
                    <input
                      type="checkbox"
                      checked={showShadows}
                      onChange={(e) => setShowShadows(e.target.checked)}
                    />
                    Show Shadows
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                    />
                    Show Grid
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="tab-content">
                <h3>Maintenance Tracking</h3>

                {/* Summary bar */}
                <div className="maint-summary">
                  <div className="summary-stat">
                    <span className="summary-number">
                      {components.filter(c => getStatus(c.miles, c.maxMiles) === 'critical').length}
                    </span>
                    <span className="summary-label critical-text">Critical</span>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-number">
                      {components.filter(c => getStatus(c.miles, c.maxMiles) === 'warning').length}
                    </span>
                    <span className="summary-label warning-text">Warning</span>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-number">
                      {components.filter(c => getStatus(c.miles, c.maxMiles) === 'good').length}
                    </span>
                    <span className="summary-label good-text">Good</span>
                  </div>
                </div>

                <div className="component-list">
                  {components.map((comp) => {
                    const status = getStatus(comp.miles, comp.maxMiles)
                    const pct = Math.min(100, Math.round((comp.miles / comp.maxMiles) * 100))
                    const isExpanded = expandedComponent === comp.id
                    return (
                      <div key={comp.id} className={`component-item-wrap ${isExpanded ? 'expanded' : ''}`}>
                        <div className="component-item" onClick={() => toggleComponent(comp.id)}>
                          <div className="component-left">
                            <strong>{comp.name}</strong>
                            <div className="wear-bar">
                              <div
                                className={`wear-fill ${status}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                          <span className={`status ${status}`}>
                            {getStatusLabel(status)}
                          </span>
                        </div>
                        {isExpanded && (
                          <div className="component-details">
                            <div className="detail-row">
                              <span>Mileage</span>
                              <span>{comp.miles.toLocaleString()} / {comp.maxMiles.toLocaleString()} mi</span>
                            </div>
                            <div className="detail-row">
                              <span>Wear</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="detail-row">
                              <span>Last Service</span>
                              <span>{new Date(comp.lastService).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-row">
                              <span>Remaining</span>
                              <span>{(comp.maxMiles - comp.miles).toLocaleString()} mi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
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

                <h4 style={{ marginTop: '20px' }}>3D Scan</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <strong>Source:</strong>
                    <span>PolyCam 3D Scan</span>
                  </div>
                  <div className="info-item">
                    <strong>Vertices:</strong>
                    <span>41,101</span>
                  </div>
                  <div className="info-item">
                    <strong>Textures:</strong>
                    <span>4 (Color, Normal, AO, Roughness)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
