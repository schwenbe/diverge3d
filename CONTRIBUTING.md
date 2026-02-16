# Contributing to Diverge3D

Thank you for your interest in contributing to Diverge3D! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/diverge3d.git
   cd diverge3d
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Project Structure

- `src/components/bike/` - 3D bike components
- `src/components/ui/` - UI components
- `src/components/maintenance/` - Maintenance tracking components
- `src/assets/data/` - Component specifications and data
- `src/utils/` - Utility functions
- `src/hooks/` - Custom React hooks
- `src/contexts/` - React contexts

## Branching Strategy

- `main` - Stable, production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `refactor/*` - Code refactoring
- `docs/*` - Documentation updates

### Creating a Branch

```bash
# For a new feature
git checkout -b feature/add-saddle-component

# For a bug fix
git checkout -b fix/wheel-rotation-bug

# For refactoring
git checkout -b refactor/optimize-spokes
```

## Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Formatting, missing semicolons, etc.
- `docs`: Documentation only
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(wheels): add realistic spoke tension simulation
fix(frame): correct head tube angle geometry
refactor(drivetrain): split chain into separate component
docs(readme): update installation instructions
```

## Code Style

- Use functional React components
- Use hooks for state management
- Keep components small and focused
- Use descriptive variable names
- Comment complex geometry calculations
- Follow existing file structure

## Component Development

### Creating a New Bike Component

1. Create component file in appropriate directory
2. Add component specifications to `bikeSpecs.json`
3. Import and use in parent component
4. Update documentation

Example:
```jsx
// src/components/bike/Saddle/Saddle.jsx
import React from 'react'

export default function Saddle({ position, model }) {
  return (
    <group position={position}>
      {/* Saddle geometry */}
    </group>
  )
}
```

### Performance Guidelines

- Use `useMemo` for expensive calculations
- Implement instancing for repeated geometry (spokes, chain links)
- Keep draw calls under 100 for 60fps target
- Use LOD (Level of Detail) for complex components

## Testing

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow project structure
   - Test thoroughly

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(component): add your feature"
   ```

4. **Push to Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use descriptive title
   - Reference related issues
   - Provide screenshots for visual changes
   - Describe testing performed

6. **Code Review**
   - Address feedback
   - Make requested changes
   - Keep discussion respectful

## Areas for Contribution

### High Priority
- [ ] Accurate frame geometry from PolyCam scan
- [ ] Realistic material shaders (carbon fiber, aluminum)
- [ ] Maintenance tracking system
- [ ] Component database completion

### Medium Priority
- [ ] Handlebar and cockpit details
- [ ] Brake system modeling
- [ ] Cable routing
- [ ] Animation system (chain, wheels)

### Nice to Have
- [ ] Color customization UI
- [ ] Exploded view mode
- [ ] Measurement tools
- [ ] AR view support

## Questions?

Open an issue or start a discussion on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
