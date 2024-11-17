# Alert Log Dashboard

responsive dashboard for monitoring and analyzing system alerts built with Next.js and TypeScript. 

![Dashboard Preview](public/UI.png)

## Tech Stack   

### Core Technologies
- **Next.js 14** - React framework for production
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - Reusable component system
- **Lucide React** - Icon library


## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── logs/
│   │       └── route.ts        # API endpoint for logs
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Main page component
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── dashboard/
│       ├── alert-selector/    # Alert selection component
│       ├── log-filters/       # Log filtering component
│       ├── log-table/         # Log display component
│       ├── pagination/        # Pagination component
│       └── index.tsx          # Main dashboard component
├── hooks/
│   └── use-logs.ts           # Custom hook for fetching logs
├── lib/
│   └── utils.ts              # Utility functions
└── types/
    └── logs.ts               # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone 
cd alert-log-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Install required shadcn/ui components:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input table badge command popover
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

## Features

### Alert Selection
- Searchable dropdown for alert selection
- Auto-complete functionality
- Clear selection option

### Log Filtering
- Filter by username
- Filter by event name
- Filter by source IP

### Log Display
- Color-coded event types
- Formatted timestamps
- Detailed event information
- Responsive table layout

## API Integration

The dashboard integrates with an API endpoint for fetching log data:

```typescript
endpoint: 'https://njwinkshi5hyldkqq4srpuoxrm0weqer.lambda-url.us-east-1.on.aws'
method: POST
body: { alert_id: string }
```