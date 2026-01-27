# AGENTS.md

## 🎯 Project Overview

** LinguaCore (英語時態大師) ** is a comprehensive English learning application designed to help users master the 12 basic English tenses through interactive exercises, progress tracking, and AI-powered grammar summaries.

### Key Technologies

- **Frontend**: React 19, TypeScript 5.8+, Vite 6
- **Routing**: React Router 7 (using `HashRouter`)
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (`@google/genai`)
- **Icons**: Material Symbols (`material-symbols-outlined`)

### Architecture & Data Flow

- **State Management**: Uses React state (useState/useContext) for local and global UI state.
- **Data Persistence**: Local progress is stored in `localStorage` (via custom hooks or direct access).
- **AI Integration**: Requests to Gemini are handled in `geminiService.ts` using a singleton instance of the AI model.
- **Component Pattern**: Container/Presenter pattern is preferred for complex pages.

---

## 🛠 Setup & Development

### Commands

- **Install Dependencies**: `npm install`
- **Start Dev Server**: `npm run dev` (runs at `http://localhost:5173`)
- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`
- **Pre-commit Checks**: `pre-commit run --all-files`

### Project Structure

- `/components`: Reusable UI components (e.g., `Layout.tsx`, `TenseCard.tsx`).
- `/pages`: Main route components (e.g., `Dashboard.tsx`, `Quiz.tsx`).
- `types.ts`: Centralized TypeScript interfaces and enums.
- `constants.ts`: Global configuration and initial data.
- `geminiService.ts`: Integration with Google Gemini AI.

---

## 🧪 Testing Instructions

### Strategy

While no tests are currently implemented, the following standards apply for new test development:

- **Framework**: Vitest (preferred for Vite projects).
- **Naming**: `[name].test.ts` or `[name].spec.tsx`.
- **Location**: Co-located with source code or in a `__tests__` directory.

### Commands (Proposed)

- **Run All Tests**: `npm test` or `npx vitest`
- **Run Single Test**: `npx vitest -t "<Test Name>"`
- **Watch Mode**: `npx vitest watch`
- **Coverage**: `npx vitest run --coverage`

### Principles

- **Minimal Mocking**: Mock only external APIs (Gemini) and browser-only APIs if necessary.
- **Real Logic**: Test actual business logic and component behavior.
- **Assertions**: Verify outcomes and state changes, not just function calls.

---

## 🎨 Code Style & Guidelines

### General Conventions

- **Indentation**: 2 spaces (no tabs).
- **Quotes**: Double quotes for user-visible strings; single quotes for internal code.
- **Lines**: Max 100 characters per line.
- **Comments**: Use JSDoc for functions and interfaces. Focus on "why" rather than "what".

### Naming Conventions

- **Components/Types/Enums**: `PascalCase` (e.g., `TenseCard`, `UserStats`, `TenseCategory`).
- **Functions/Variables/Props**: `camelCase` (e.g., `renderTenseItem`, `isLocked`, `tenseId`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `INITIAL_TENSES`).
- **Files**: `PascalCase` for components; `camelCase` for utilities/services.

### TypeScript & React

- **Strict Typing**: Avoid `any`. Use interfaces and enums from `types.ts`.
- **Functional Components**: Use `React.FC` for all components.
- **Hooks**: Prefer standard hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) and custom hooks.
- **React 19**: Leverage new features like the `use` hook where appropriate.
- **Props**: Destructure props in the component signature.

### CSS & Styling

- **Utility-First**: Use Tailwind CSS for all styling.
- **Arbitrary Values**: Use sparingly (e.g., `w-[60px]`); prefer standard theme values.
- **Dark Mode**: The app follows a dark theme by default (using `bg-surface-dark`, etc.).

### Error Handling & Reliability

- **Input Validation**: Use Zod or standard TypeScript checks for all user inputs and API responses.
- **Graceful Failures**: Wrap complex logic in `try-catch` blocks and provide user-friendly error messages.
- **Async Safety**: Always handle loading and error states for asynchronous operations (e.g., Gemini AI calls).

### Accessibility & UX

- **Semantic HTML**: Use proper tags (`button`, `main`, `h1-h6`) to ensure screen reader compatibility.
- **Keyboard Navigation**: Ensure all interactive elements are focusable and usable via keyboard.
- **Icons**: Always include meaningful descriptions or `aria-label` for icons that convey information.

---

## 📜 Pull Request & Commit Guidelines

### Commits

Follow **Conventional Commits**:

- `feat(scope):` New feature
- `fix(scope):` Bug fix
- `docs(scope):` Documentation changes
- `style(scope):` Formatting, missing semi-colons, etc.
- `refactor(scope):` Code change that neither fixes a bug nor adds a feature
- `test(scope):` Adding missing tests or correcting existing tests
- `chore(scope):` Changes to the build process or auxiliary tools

### Pull Requests

- Keep PRs focused on a single logical change.
- Provide a concise summary of changes and why they were made.
- Ensure all pre-commit hooks pass.

---

## 🤖 Agent Workflow

### Skill Delegation

This repository is optimized for agentic workflows. When performing complex tasks, consider using specialized skills located in `.agent/skills/` or `.opencode/skills/`:

- `frontend-design`: For UI/UX improvements.
- `tdd-standard`: For implementing new features with tests.
- `security-review`: For auditing Gemini API integration or data handling.

### Interactive Prompts

Never bypass interactive prompts from scripts (e.g., git confirmations). Recognize waiting states and inform the user if input is required.

### Reference Instructions

Detailed coding instructions for specific languages and tools can be found in:

- `.github/copilot-instructions.md`: Global coding guidelines.
- `.github/instructions/javascript.instructions.md`: JS/TS specific practices.
- `.github/instructions/test.instructions.md`: Testing best practices.
