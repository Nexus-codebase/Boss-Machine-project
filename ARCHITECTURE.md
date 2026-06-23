# Boss Machine - Project Architecture

## Overview
Boss Machine is a React-based web application that manages business operations including minions, meetings, and ideas. It features a modern client-server architecture with Redux state management and Express.js backend.

## Project Structure

```
boss-machine-start/
├── app.js                 # Express server setup and API routes
├── main.js               # Entry point for Node.js server
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── webpack.config.js     # Webpack bundling configuration
├── browser/              # Client-side code
│   ├── index.js         # React app initialization
│   ├── utils.js         # Utility functions
│   └── components/      # React components
│       ├── App.js              # Main app component
│       ├── Home.js             # Home page
│       ├── Heading.js          # Header component
│       ├── AllMinions.js       # Minions list view
│       ├── AllMeetings.js      # Meetings list view
│       ├── AllIdeas.js         # Ideas list view
│       ├── Minion.js           # Single minion container
│       ├── Meeting.js          # Single meeting container
│       ├── Idea.js             # Single idea container
│       ├── MinionDescription.js    # Minion detail view
│       ├── MinionEdit.js           # Minion edit form
│       ├── IdeaDescription.js      # Idea detail view
│       ├── IdeaEdit.js             # Idea edit form
│       ├── SingleWorkRow.js        # Work item display
│       ├── SingleWorkRowDescription.js  # Work detail
│       ├── SingleWorkRowEdit.js        # Work edit form
│       ├── IdeaListItem.js         # Idea list item
│       ├── Work.js                 # Work container
│       └── store/               # Redux store management
│           ├── index.js         # Store configuration
│           ├── appState.js      # App state reducer
│           ├── minions.js       # Minions reducer
│           ├── meetings.js      # Meetings reducer
│           ├── ideas.js         # Ideas reducer
│           ├── work.js          # Work reducer
│           ├── selectedMinion.js    # Selected minion state
│           └── selectedIdea.js      # Selected idea state
├── server/               # Backend API
│   ├── api.js                      # API route definitions
│   ├── db.js                       # Database/data initialization
│   └── checkMillionDollarIdea.js   # Validation middleware
├── public/               # Static assets
│   ├── css/
│   │   ├── reset.css     # CSS reset
│   │   └── style.css     # Main styles (Color theme: #ff1493 Pink)
│   ├── img/              # Images and icons
│   └── js/
│       └── bundle.js     # Webpack-compiled bundle
└── test/                 # Test files
    └── test.js          # Mocha/Chai tests
```

## Technology Stack

### Frontend
- **React 15.6.1** - UI library
- **Redux** - State management
- **React-Router 3.0.0** - Client-side routing
- **Redux-Thunk** - Async action middleware
- **Webpack 3.5.5** - Module bundler
- **Babel** - JavaScript transpiler

### Backend
- **Express 4.18.2** - Web framework
- **Body-Parser 1.20.2** - Request body parser
- **CORS 2.8.5** - Cross-Origin Resource Sharing
- **Morgan 1.10.0** - HTTP request logger
- **Nodemon 3.1.10** - Development server auto-reload

### Testing & Build
- **Mocha 11.7.1** - Test framework
- **Chai 4.3.10** - Assertion library
- **Supertest 7.1.3** - HTTP assertions
- **Faker 4.1.0** - Mock data generation

## Design Pattern

### Color Theme
- **Primary Accent Color**: `#ff1493` (Hot Pink)
- **Background**: `#333333` (Dark Gray)
- **Text**: `#ffffff` (White)

All interactive elements (buttons, borders, labels) use the pink accent color for visual consistency.

## Data Flow

1. **Redux Store** → Manages global application state
2. **React Components** → Dispatch actions and subscribe to state changes
3. **Express API** → Handles CRUD operations
4. **Database** → Persists data (via db.js)

## Key Features

### Minions Management
- View all minions in a grid layout
- Add new minions
- Edit minion details (name, title, salary, etc.)
- Assign work tasks to minions
- Delete minions

### Meetings Management
- Display scheduled meetings
- View meeting details (time, location, notes)
- Add new meetings
- Delete meetings

### Ideas Management
- List all business ideas with potential revenue
- View idea details and descriptions
- Edit idea information
- Calculate total potential revenue across all ideas
- Ideas must meet million-dollar minimum validation

### Work Management
- Track work assignments for minions
- Edit work details (title, description, hours)
- Delete work assignments
- Link work to specific minions

## API Routes

Base URL: `http://localhost:3000/api`

### Minions
- `GET /api/minions` - Get all minions
- `POST /api/minions` - Create new minion
- `GET /api/minions/:id` - Get specific minion
- `PUT /api/minions/:id` - Update minion
- `DELETE /api/minions/:id` - Delete minion

### Meetings
- `GET /api/meetings` - Get all meetings
- `POST /api/meetings` - Create new meeting
- `DELETE /api/meetings/:id` - Delete meeting

### Ideas
- `GET /api/ideas` - Get all ideas
- `POST /api/ideas` - Create new idea
- `GET /api/ideas/:id` - Get specific idea
- `PUT /api/ideas/:id` - Update idea
- `DELETE /api/ideas/:id` - Delete idea

### Work
- `GET /api/minions/:minionId/work` - Get minion's work
- `POST /api/minions/:minionId/work` - Add work to minion
- `PUT /api/minions/:minionId/work/:workId` - Update work
- `DELETE /api/minions/:minionId/work/:workId` - Delete work

## Build & Deployment

### Development
```bash
npm install
npm run start-dev    # Start with hot reload
```

### Production
```bash
npm run build
npm start
```

### Testing
```bash
npm test
```

## Version
- Version: 1.0.0
- License: ISC
- Author: Codecademy
