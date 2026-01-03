# LinguaCore

A comprehensive interactive English tense learning platform designed for Chinese-speaking learners.

## Overview

LinguaCore is a modern web application that helps learners systematically master 12 fundamental English tenses through interactive quizzes, smart progress tracking, and AI-powered grammar insights. Built with React, TypeScript, and Google Gemini AI.

## Features

- **📚 12 English Tenses Coverage**: Complete coverage of present, past, and future tenses with 4 variations each
- **🎯 Interactive Quiz System**: Customized practice questions for each tense with real-time feedback
- **📊 Smart Progress Tracking**: Visual progress indicators, streak tracking, and grammar mastery percentage
- **🤖 AI Grammar Summary**: Personalized grammar analysis and learning suggestions powered by Google Gemini
- **🔓 Progressive Unlocking**: Structured learning path with gradual tense unlocking mechanism
- **🎨 Modern UI**: Clean, dark-themed interface optimized for focused learning
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and production builds

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router DOM
- **AI Integration**: Google Gemini API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (implicit from design)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd LinguaCore
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```plaintext
LinguaCore/
├── components/      # Reusable React components
├── pages/          # Page components (Dashboard, Quiz, Progress, etc.)
├── constants.ts    # Tense definitions and configurations
├── types.ts        # TypeScript type definitions
├── geminiService.ts # AI service integration
└── App.tsx         # Main application component
```

## Features in Detail

### Tense Categories

- **Present Tenses**: Simple, Continuous, Perfect, Perfect Continuous
- **Past Tenses**: Simple, Continuous, Perfect, Perfect Continuous
- **Future Tenses**: Simple, Continuous, Perfect, Perfect Continuous

### Learning Progress

- Track your study streaks
- Monitor grammar mastery percentage
- Unlock new tenses as you progress
- Visual progress indicators for each tense

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Powered by Google Gemini AI
- Built with React and TypeScript
- UI inspired by modern learning platforms
