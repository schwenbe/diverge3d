# Git Setup Guide for Diverge3D

## Step 1: Initialize Local Repository

```bash
cd diverge3d
git init
git add .
git commit -m "feat: initial project setup with modular architecture"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Repository settings:
   - **Name**: `diverge3d`
   - **Description**: "3D Interactive Maintenance & Component Tracking App for Specialized Diverge Comp Carbon (2021)"
   - **Visibility**: Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 3: Connect Local to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/diverge3d.git

# Verify the remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Create Development Branch

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop branch to GitHub
git push -u origin develop
```

## Step 5: Set Default Branch (Optional)

On GitHub:
1. Go to repository Settings
2. Navigate to "Branches" in the left sidebar
3. Set `develop` as the default branch (recommended for active development)

## Common Git Workflows

### Working on a New Feature

```bash
# Make sure you're on develop
git checkout develop

# Pull latest changes
git pull origin develop

# Create feature branch
git checkout -b feature/add-handlebar-component

# Make your changes, then:
git add .
git commit -m "feat(cockpit): add handlebar component with realistic geometry"

# Push to GitHub
git push origin feature/add-handlebar-component
```

### Creating a Pull Request

1. Go to your repository on GitHub
2. Click "Pull requests" tab
3. Click "New pull request"
4. Set base: `develop` and compare: `feature/your-feature`
5. Add description and create PR
6. Review and merge when ready

### Syncing with Main Repository

```bash
# Fetch all branches
git fetch origin

# Switch to develop and pull latest
git checkout develop
git pull origin develop

# Update your feature branch
git checkout feature/your-feature
git merge develop
```

### Keeping Fork Updated (if you fork this repo)

```bash
# Add upstream remote (original repo)
git remote add upstream https://github.com/ORIGINAL_OWNER/diverge3d.git

# Fetch upstream changes
git fetch upstream

# Merge upstream changes into your develop
git checkout develop
git merge upstream/develop
git push origin develop
```

## Branch Protection Rules (Recommended)

Set up on GitHub under Settings > Branches:

1. **For `main` branch:**
   - Require pull request reviews before merging
   - Require status checks to pass
   - Require branches to be up to date before merging

2. **For `develop` branch:**
   - Require pull request reviews (optional)
   - Require status checks to pass

## Git Ignore Patterns

Already configured in `.gitignore`:
- `node_modules/`
- `dist/`
- `.env` files
- Editor files
- Large 3D source files (.blend, .fbx, .max)

## Large File Storage (Future)

For 3D models and assets over 50MB:

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.glb"
git lfs track "*.gltf"

# Commit .gitattributes
git add .gitattributes
git commit -m "chore: configure Git LFS for 3D models"
```

## Helpful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline --graph

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename

# Switch branches
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# View all branches
git branch -a
```

## Troubleshooting

### "Permission denied" when pushing

Make sure you're authenticated:
- Use HTTPS with personal access token, or
- Set up SSH keys

### Merge conflicts

```bash
# Pull latest changes
git pull origin develop

# Fix conflicts in files
# Look for <<<<<<< HEAD markers

# After fixing:
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

### Accidentally committed to wrong branch

```bash
# Note the commit hash
git log

# Switch to correct branch
git checkout correct-branch

# Cherry-pick the commit
git cherry-pick <commit-hash>

# Go back and remove from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

## Next Steps

After setting up Git:
1. Push initial code to GitHub
2. Create `develop` branch
3. Start working on features in feature branches
4. Create pull requests for review
5. Merge approved features into `develop`
6. Periodically merge `develop` into `main` for releases

---

**Need help?** Open an issue on GitHub or check the CONTRIBUTING.md file.
