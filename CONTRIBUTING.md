# Contributing to Frontal SDK

Thank you for your interest in contributing to the Frontal SDK! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/frontal-labs/sdk.git
   cd sdk
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run development build**
   ```bash
   bun run dev
   ```

## Code Quality

We use [Biome](https://biomejs.dev/) for linting and formatting. Before submitting a PR:

```bash
bun run lint      # Check for lint errors
bun run format    # Format code
bun run check     # Apply auto-fixes
```

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Examples:

- `feat: add new resource for projects`
- `fix: resolve auth token refresh issue`
- `docs: update README with new examples`
- `chore: upgrade dependencies`

## Pull Request Process

1. Fork the repository and create a feature branch.
2. Make your changes and ensure all tests pass.
3. Update documentation if needed.
4. Submit a PR with a clear description.

## Testing

```bash
bun test          # Run all tests
bun test:watch    # Run tests in watch mode
```

## Questions?

Open an issue or reach out to the maintainers.
