# Diverge3D 🚴

**3D Interactive Maintenance & Component Tracking App for Specialized Diverge Comp Carbon (2021)**

A web-based application that combines 3D visualization with practical bicycle maintenance tracking. Built with React, Three.js, and modern web technologies.

## 🎯 Project Goals

1. **3D Visualization**: High-fidelity 3D model of the Specialized Diverge Comp Carbon
2. **Component Tracking**: Track wear, tear, and replacement schedules for all components
3. **Maintenance Logs**: Keep detailed service history and maintenance records
4. **Interactive Features**: Color customization, part inspection, measurements
5. **Educational**: Visual guides for basic maintenance procedures

## 🏗️ Current Status

**Version 0.1.0** - Initial Setup
- ✅ Project structure established
- ✅ Basic 3D visualization working
- 🚧 Component breakdown in progress
- 📋 Planned: Maintenance tracking system
- 📋 Planned: Component database integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with WebGL support
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/diverge3d.git
cd diverge3d

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
diverge3d/
├── src/
│   ├── components/
│   │   ├── bike/          # 3D bike components (Frame, Wheel, Drivetrain, etc.)
│   │   ├── ui/            # UI components (Controls, Panels, etc.)
│   │   └── maintenance/   # Maintenance tracking components
│   ├── contexts/          # React contexts (BikeData, MaintenanceLog, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── assets/
│   │   ├── models/        # 3D model files
│   │   ├── textures/      # Texture files
│   │   └── data/          # Component specifications JSON
│   └── styles/            # Global styles
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **3D Rendering**: Three.js via @react-three/fiber
- **3D Helpers**: @react-three/drei
- **State Management**: Zustand
- **Build Tool**: Vite
- **UI Icons**: Lucide React
- **Date Handling**: date-fns

## 🎨 Features Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup and structure
- [x] Basic 3D scene with placeholder geometry
- [ ] Component modularization
- [ ] Specialized Diverge frame geometry

### Phase 2: Core 3D Model
- [ ] Accurate frame modeling from PolyCam scan
- [ ] Wheel assembly (rims, spokes, hubs, tires)
- [ ] Drivetrain (crankset, chainrings, cassette, chain)
- [ ] Handlebars and stem
- [ ] Saddle and seatpost
- [ ] Fork and headset

### Phase 3: Components & Details
- [ ] Brake system (calipers, rotors, levers)
- [ ] Shifters and derailleurs
- [ ] Cables and housing
- [ ] Pedals
- [ ] Bottle cages and accessories

### Phase 4: Maintenance System
- [ ] Component database with specifications
- [ ] Maintenance log system
- [ ] Wear tracking algorithms
- [ ] Service interval reminders
- [ ] Parts replacement history

### Phase 5: Interactive Features
- [ ] Component highlighting and selection
- [ ] Detailed component views
- [ ] Color customization
- [ ] Measurement tools
- [ ] Maintenance guides overlay

### Phase 6: Advanced Features
- [ ] AR view (mobile)
- [ ] Export maintenance reports
- [ ] Component comparison
- [ ] Integration with cycling computers/Strava
- [ ] Community maintenance tips

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

### Component Development Guidelines

1. **Bike Components**: Each major part (frame, wheel, etc.) should be its own component
2. **Modularity**: Keep components small and focused
3. **Performance**: Use instancing for repeated elements (spokes, chain links)
4. **Data-Driven**: Component specs should be in JSON, not hardcoded
5. **Maintenance Context**: All components should be trackable

## 📊 Component Tracking Schema

Each component will have:
```javascript
{
  id: "front-wheel-rim",
  name: "Front Wheel Rim",
  category: "wheels",
  manufacturer: "Roval",
  model: "Terra CLX",
  installedDate: "2021-06-15",
  mileage: 2450,
  condition: "good",
  nextService: "2024-08-01",
  serviceHistory: []
}
```

## 🤝 Contributing

This is currently a personal project, but feel free to:
- Report bugs via Issues
- Suggest features
- Fork and experiment

## 📝 License

MIT License - feel free to use this for your own bike maintenance tracking!

## 🙏 Acknowledgments

- Specialized Bicycles for making the Diverge
- Three.js community for amazing 3D tools
- React Three Fiber team for the excellent React integration

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for cyclists who love their bikes**
