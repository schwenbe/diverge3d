# Diverge3D Technical Roadmap

## Vision
Create a comprehensive 3D interactive application for the Specialized Diverge Comp Carbon (2021) that serves as both a visual showcase and a practical maintenance tracking tool.

## Architecture Overview

### Core Systems
1. **3D Rendering Engine** - Three.js/R3F based visualization
2. **Component Database** - JSON-based component specifications
3. **Maintenance System** - Tracking, logging, and reminder system
4. **State Management** - Zustand for global state
5. **UI Layer** - React components for controls and data display

## Development Phases

---

## Phase 1: Foundation & Setup ✅ IN PROGRESS

**Goal**: Establish project structure and core architecture

### Tasks
- [x] Initialize Git repository
- [x] Set up npm project with dependencies
- [x] Create folder structure
- [x] Write documentation (README, ROADMAP)
- [ ] Set up Vite configuration
- [ ] Create base React app structure
- [ ] Implement basic 3D scene
- [ ] Set up Zustand store

### Deliverables
- Working development environment
- Basic 3D scene with camera controls
- Project pushed to GitHub

**Estimated Time**: 1-2 sessions

---

## Phase 2: Modular Architecture

**Goal**: Break monolithic code into maintainable components

### Component Structure
```
src/components/bike/
├── BikeScene.jsx          # Main 3D scene container
├── Frame/
│   ├── Frame.jsx          # Frame geometry
│   ├── FrameGeometry.js   # Geometry definitions
│   └── frameSpecs.json    # Frame measurements
├── Wheels/
│   ├── Wheel.jsx          # Complete wheel assembly
│   ├── Rim.jsx
│   ├── Spokes.jsx
│   ├── Hub.jsx
│   └── Tire.jsx
├── Drivetrain/
│   ├── Crankset.jsx
│   ├── Chainring.jsx
│   ├── Chain.jsx
│   ├── Cassette.jsx
│   └── Derailleur.jsx
└── ... (other components)
```

### Tasks
- [ ] Create component hierarchy
- [ ] Implement component composition
- [ ] Set up prop drilling or context for shared data
- [ ] Create component specification system
- [ ] Implement LOD (Level of Detail) system

**Estimated Time**: 2-3 sessions

---

## Phase 3: Frame Modeling

**Goal**: Create accurate Specialized Diverge frame geometry

### Data Sources
1. PolyCam scan (primary reference)
2. Official Specialized geometry charts
3. Reference photos

### Tasks
- [ ] Import and process PolyCam scan
- [ ] Extract key frame points and dimensions
- [ ] Model main triangle (top tube, down tube, seat tube)
- [ ] Model rear triangle (seat stays, chain stays)
- [ ] Add head tube and bottom bracket shell
- [ ] Model dropout details
- [ ] Add cable routing details
- [ ] Implement material/texture system

### Technical Approach
- Use Blender for complex modeling if needed
- Export as GLB/GLTF for Three.js
- Or procedural generation for parametric control

**Estimated Time**: 3-4 sessions

---

## Phase 4: Wheels & Drivetrain

**Goal**: Add functional-looking wheels and drivetrain

### Wheels
- [ ] Hub modeling (front and rear)
- [ ] Spoke pattern (lacing pattern simulation)
- [ ] Rim profile (Roval Terra CLX)
- [ ] Tire modeling with tread pattern
- [ ] Rotation animation

### Drivetrain
- [ ] Crankset (arms and chainrings)
- [ ] Chain with realistic links
- [ ] Cassette with gear teeth
- [ ] Front derailleur
- [ ] Rear derailleur
- [ ] Chain animation along path

**Estimated Time**: 4-5 sessions

---

## Phase 5: Cockpit & Contact Points

**Goal**: Complete rider interface components

### Components
- [ ] Handlebars (flared gravel bars)
- [ ] Stem
- [ ] Brake levers
- [ ] Shifters (STI/brifters)
- [ ] Bar tape/grips
- [ ] Saddle
- [ ] Seatpost
- [ ] Pedals

### Details
- [ ] Cable routing from levers
- [ ] Handlebar accessories (computer mount, lights)
- [ ] Realistic material shaders

**Estimated Time**: 3-4 sessions

---

## Phase 6: Brakes & Cables

**Goal**: Add braking system and cable routing

### Components
- [ ] Hydraulic brake calipers
- [ ] Brake rotors with ventilation pattern
- [ ] Brake hoses/housing
- [ ] Shift cable housing
- [ ] Cable stops and guides
- [ ] Housing end caps

**Estimated Time**: 2-3 sessions

---

## Phase 7: Component Database

**Goal**: Create comprehensive component specification system

### Database Schema
```javascript
{
  components: {
    frame: { specs, maintenance, wear },
    wheels: {
      front: { rim, hub, spokes, tire },
      rear: { rim, hub, spokes, tire }
    },
    drivetrain: { crankset, chain, cassette, derailleurs },
    // ... etc
  }
}
```

### Tasks
- [ ] Design JSON schema
- [ ] Create component specifications
- [ ] Add manufacturer data
- [ ] Include maintenance intervals
- [ ] Add wear indicators
- [ ] Link 3D components to database

**Estimated Time**: 2-3 sessions

---

## Phase 8: Maintenance Tracking System

**Goal**: Implement practical maintenance features

### Features
- [ ] Component selection in 3D view
- [ ] Maintenance log interface
- [ ] Service history per component
- [ ] Mileage tracking
- [ ] Wear calculation algorithms
- [ ] Service interval reminders
- [ ] Replacement cost tracking

### UI Components
- [ ] Maintenance panel
- [ ] Service calendar
- [ ] Component detail views
- [ ] Log entry forms
- [ ] Statistics dashboard

**Estimated Time**: 4-5 sessions

---

## Phase 9: Materials & Lighting

**Goal**: Achieve photorealistic rendering

### Tasks
- [ ] Carbon fiber material with weave pattern
- [ ] Metal materials (aluminum, steel)
- [ ] Rubber materials for tires
- [ ] Leather/synthetic for saddle and bar tape
- [ ] Advanced lighting setup
- [ ] Environment mapping
- [ ] Post-processing effects (bloom, SSAO)

**Estimated Time**: 2-3 sessions

---

## Phase 10: Interactive Features

**Goal**: Add user interaction capabilities

### Features
- [ ] Component highlighting on hover
- [ ] Click to select components
- [ ] Exploded view mode
- [ ] X-ray/transparency mode
- [ ] Measurement tools
- [ ] Color customization
- [ ] Compare configurations
- [ ] Screenshot/export views

**Estimated Time**: 3-4 sessions

---

## Phase 11: Maintenance Guides

**Goal**: Educational overlay system

### Features
- [ ] Step-by-step maintenance procedures
- [ ] Annotated 3D views
- [ ] Tool requirements
- [ ] Torque specifications
- [ ] Video integration possibilities
- [ ] Common issues database

**Estimated Time**: 3-4 sessions

---

## Phase 12: Performance & Polish

**Goal**: Optimize and refine

### Tasks
- [ ] Performance profiling
- [ ] Implement geometry instancing
- [ ] Optimize draw calls
- [ ] Implement frustum culling
- [ ] Add loading states
- [ ] Error handling
- [ ] Responsive design
- [ ] Mobile optimization
- [ ] PWA capabilities

**Estimated Time**: 2-3 sessions

---

## Phase 13: Advanced Features

**Goal**: Next-level functionality

### Features
- [ ] AR mode for mobile
- [ ] Integration with Strava API
- [ ] Export maintenance reports (PDF)
- [ ] Component marketplace links
- [ ] Community tips integration
- [ ] Multi-bike support
- [ ] Cloud sync for data

**Estimated Time**: 5-10 sessions (optional)

---

## Technical Debt & Ongoing

### Continuous Tasks
- Code refactoring
- Documentation updates
- Dependency updates
- Bug fixes
- Performance monitoring
- User feedback incorporation

---

## Success Metrics

### Phase 1-3
- ✅ Recognizable Specialized Diverge frame
- ✅ Smooth 60 FPS performance
- ✅ Clean, maintainable code

### Phase 4-6
- ✅ All major components present
- ✅ Realistic proportions and details
- ✅ Interactive controls working

### Phase 7-9
- ✅ Full component database
- ✅ Maintenance tracking functional
- ✅ Photorealistic rendering

### Phase 10-12
- ✅ Intuitive user experience
- ✅ Educational value
- ✅ Production-ready performance

---

## Notes & Decisions

### Modeling Approach
- **Decision**: Start with procedural Three.js geometry for flexibility
- **Fallback**: Use Blender for complex shapes, export as GLB
- **Reason**: Procedural allows easier customization, but complex organic shapes need proper modeling

### Performance Targets
- **Target**: 60 FPS on mid-range hardware
- **Strategy**: LOD system, instancing, efficient materials
- **Monitoring**: Stats.js integration for development

### Data Storage
- **V1**: Local storage for maintenance logs
- **V2**: Optional cloud sync
- **Reason**: Start simple, add complexity as needed

---

## Questions to Resolve

1. **PolyCam Integration**: What format is the scan? How detailed?
2. **Maintenance Data**: Historical data to import?
3. **Component Accuracy**: Factory spec or actual measured spec?
4. **Feature Priority**: Which features are must-have vs nice-to-have?

---

**Last Updated**: 2026-02-16
**Version**: 0.1.0
