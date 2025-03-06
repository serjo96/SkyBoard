# Notes & Tasks Application

A React application for managing notes and tasks with D3.js data visualization.

---

## Features

- Task management (create, edit, delete)
- Categories and subcategories
- Task visualization in different views
- Task status tracking
- D3.js data visualization
- Responsive design

---

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- D3.js
- SASS
- Date-fns

---

## Getting Started

### Prerequisites

- Node.js >= 14
- npm >= 6

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```
2. Navigate to project directory
```bash
cd notes-tasks-app
```
3. Install dependencies
```bash
npm install
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Run linter |
| `npm run lint:fix` | Fix linting errors |
| `npm run format` | Format code |

---

## Project Structure
```
src/
├── components/ # Reusable components
│ ├── Layout/ # Layout components
│ ├── TaskComponents/ # Task-related components
│ ├── CategoryComponents/ # Category-related components
│ └── Visualization/ # D3.js visualization components
├── pages/ # Page components
│ ├── Dashboard/
│ ├── TaskList/
│ ├── TaskDetails/
│ └── CategoryManager/
├── store/ # Redux store
│ ├── index.ts
│ └── slices/
├── types/ # TypeScript types
├── utils/ # Helper functions
├── hooks/ # Custom hooks
├── constants/ # Constants and configs
└── styles/ # Global styles
```

---

## Environment Variables

Create a `.env` file in the root directory:
REACT_APP_API_URL=http://localhost:3000
REACT_APP_VERSION=$npm_package_version



---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.