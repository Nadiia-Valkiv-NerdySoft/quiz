# **Quiz App**

This is an Angular-based quiz application that allows users to explore various quizzes, answer questions, and see the statistics.

## **Project Overview**

The project enables users to participate in quizzes, track their progress, and get statistics about their performance. The app fetches questions dynamically from an API and organizes them into various quizzes, each with a set of random questions. It also provides a fun interactive experience with modern UI components.

The quiz questions are retrieved from the [Open Trivia API](https://opentdb.com/api_config.php), ensuring a diverse range of topics and difficulty levels.

You can check out the live version of the app here: [Quiz App on Firebase](https://quiz-app-nerdysoft.web.app/)

## **Table of Contents**

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Usage Guidelines](#usage-guidelines)
- [Technologies Used](#technologies-used)
- [Development Server](#development-server)
- [Build](#build)
- [Running Tests](#running-tests)
- [Linting & Formatting](#linting--formatting)

## **Setup Instructions**

1. **Clone the repository:**

```bash
git clone https://github.com/Nadiia-Valkiv-NerdySoft/quiz.git
```

2. **Navigate to the project directory:**

```bash
cd quiz
```

3. **Install dependencies:**

```bash
npm install
```

## **Usage Guidelines**

1. **Start the development server:**

```bash
ng serve
```

2. **Access the app:**

Open your browser and navigate to `http://localhost:4200/` to access the application.

3. **Start taking quizzes:**
   Follow the on-screen instructions to take the quizzes and track your progress.

## **Technologies Used**

- **Angular 18.2.0**
- **TypeScript**
- **Tailwind CSS**
- **SCSS**
- **Angular Material**
- **Husky & Lint-Staged** for Git hooks
- **ESLint & Prettier** for code formatting
- **Jest** for code unit testing
- **GitHub Actions** for CI/CD

## **Development Server**

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The application will automatically reload if you change any of the source files.

## **Code Scaffolding**

To generate a new component, directive, pipe, service, class, guard, interface, enum, or module, use the Angular CLI:

```bash
ng generate component component-name
```

## **Build**

To build the project for production, use:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## **Running Tests**

To run tests once:

```bash
npm run test
```

To run tests with coverage report:

```bash
npm run test:coverage
```

To run tests in watch mode:

```bash

npm run test:watch
```

## **Linting & Formatting**

To check for linting issues (ESLint & Stylelint), run:

```bash
npm run lint
```

To fix linting issues automatically, use:

```bash
npm run lint:fix
```

To check styles only:

```bash
npm run lint:styles
```

To fix style issues automatically:

```bash
npm run lint:styles:fix
```
