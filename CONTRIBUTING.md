# Contributing to react-pro-image

Thank you for your interest in contributing! Every contribution — whether it is a bug report, feature request, documentation improvement, or code change — is welcome.

## Getting Started

1. **Fork** the repository and clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/react-pro-image.git
   cd react-pro-image
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Run the linter** before committing:

   ```bash
   npm run lint
   ```

## Development Workflow

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the Vite development server           |
| `npm run build`     | Build the library for production            |
| `npm run build:types`| Generate TypeScript declaration files      |
| `npm run lint`      | Run ESLint across the project               |
| `npm run preview`   | Preview the production build locally        |

## Submitting Changes

1. Create a **feature branch** from `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. Make your changes in small, focused commits with clear messages.

3. Make sure the project **builds successfully**:

   ```bash
   npm run build
   ```

4. Push your branch and open a **Pull Request** against `main`.

5. Fill in the PR template and describe what your change does and why.

## Reporting Bugs

Open a [GitHub Issue](https://github.com/MohamedAlfeky1/react-pro-image/issues) and include:

- A clear, descriptive title.
- Steps to reproduce the issue.
- Expected vs. actual behavior.
- Your environment (browser, React version, package version).

## Requesting Features

Open a [GitHub Issue](https://github.com/MohamedAlfeky1/react-pro-image/issues) with:

- A clear description of the feature and the problem it solves.
- Example API usage or mock code snippets, if applicable.

## Code Style

- The project uses **TypeScript** with strict settings.
- Follow the existing code style. ESLint enforces the rules automatically.
- Write clear JSDoc comments for all exported functions, hooks, and types.
- Keep components focused and single-purpose.

## Security Vulnerabilities

**Do NOT open a public issue for security vulnerabilities.** Please see [SECURITY.md](./SECURITY.md) for responsible disclosure instructions.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
