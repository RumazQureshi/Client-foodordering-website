# Shan Fast Food - Restaurant Ordering Platform

## Overview

Shan Fast Food is a modern full-stack web application for a fast food restaurant. The platform allows customers to browse the menu, add items to their cart, place orders, and contact the restaurant. It features a sleek, dark-themed UI with a focus on user experience and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **UI Library:** Shadcn/ui components built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design tokens
- **State Management:** TanStack Query (React Query) for server state
- **Forms:** React Hook Form with Zod validation

**Design System:**
- Dark theme with golden (#FFD700) primary accent color
- Custom fonts: Poppins for headings, Montserrat for body text
- Responsive design with mobile-first approach
- Component library includes 40+ pre-built UI components (buttons, forms, dialogs, etc.)

**Key Features:**
- Single-page application with smooth scrolling navigation
- Shopping cart with local storage persistence
- Real-time cart updates and quantity management
- Form validation for orders and contact messages
- Toast notifications for user feedback
- Responsive sidebar cart

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript with ES modules
- **Database ORM:** Drizzle ORM
- **Database:** PostgreSQL (via Neon serverless driver)
- **Validation:** Zod schemas shared between frontend and backend

**API Design:**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Error handling with appropriate HTTP status codes
- Request logging middleware for API routes

**Storage Layer:**
- Dual implementation pattern: `MemStorage` (in-memory) and database-backed storage
- `IStorage` interface defines contract for data operations
- Menu items initialized with seed data in memory storage
- Orders and contact messages persisted to database

**Key Endpoints:**
- `GET /api/menu` - Fetch all menu items
- `GET /api/menu/:category` - Fetch items by category
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Fetch order by ID
- `POST /api/contact` - Submit contact message

### Database Schema

**Tables:**
- `menu_items`: Restaurant menu with categories (burgers, sandwiches, rolls, pizzas, drinks, specials)
- `orders`: Customer orders with items (JSONB), pricing, and delivery information
- `contact_messages`: Customer inquiries and feedback

**Schema Features:**
- UUID primary keys with PostgreSQL `gen_random_uuid()`
- JSONB for flexible order items storage
- Timestamp fields with `CURRENT_TIMESTAMP` defaults
- Zod schemas generated from Drizzle tables for runtime validation

### Development Environment

**Build System:**
- **Bundler:** Vite for frontend with React plugin
- **Server Bundler:** esbuild for backend production builds
- **Dev Server:** Vite middleware mode integrated with Express
- **Type Checking:** TypeScript with strict mode enabled

**Replit-Specific:**
- Custom Vite plugins for Replit environment (cartographer, dev banner, runtime error overlay)
- Hot module replacement (HMR) configured with server integration

**Path Aliases:**
- `@/*` → client/src/*
- `@shared/*` → shared/*
- `@assets/*` → attached_assets/*

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives (30+ components including dialog, dropdown, popover, toast, etc.)
- Class Variance Authority for component variant management
- Tailwind CSS for utility-first styling

**Form & Validation:**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integration

**Data Fetching:**
- TanStack Query v5 for server state management
- Custom query client with fetch wrapper

**Database:**
- Neon Serverless PostgreSQL driver
- Drizzle ORM for type-safe database queries
- Drizzle-Zod for schema-to-validation integration

**Other Libraries:**
- date-fns for date manipulation
- cmdk for command palette functionality
- embla-carousel-react for carousels
- wouter for client-side routing
- lucide-react and react-icons for iconography

**Session Management:**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used in current implementation)