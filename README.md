# 🌟 Lumin LMS - AI Bootcamp Learning Management System

A modern, full-stack Learning Management System built for AI bootcamps and technical education platforms. Features a comprehensive course management system, real-time progress tracking, and a beautiful, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.1-2D3748?style=flat-square&logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Database Schema](#-database-schema)
- [Authentication System](#-authentication-system)
- [Project Structure](#-project-structure)
- [Key Implementation Details](#-key-implementation-details)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-provider Authentication**: Email/password and OAuth (Google, GitHub, etc.) via Supabase Auth
- **Role-based Access Control**: Student, Teacher, and Admin roles with granular permissions
- **Secure Session Management**: JWT-based authentication with automatic token refresh
- **Protected Routes**: Server-side middleware authentication checks
- **User Profile Management**: Complete profile system with avatars and personal information

### 📚 Course Management
- **Course Catalog**: Browse and enroll in AI/ML courses
- **Session-based Learning**: Organize content into sequential sessions (lectures)
- **Video Integration**: Embedded video content for lectures
- **Progress Tracking**: Track completion status for each session
- **Sequential Unlocking**: Lock/unlock sessions based on prerequisite completion

### 📝 Assignment System
- **Multiple Assignment Types**:
  - Multiple Choice Questions (MCQ)
  - File Upload submissions
  - Mixed format assignments
- **Question Bank**: Store and manage assignment questions with options
- **Auto-grading**: Automatic grading for multiple choice questions
- **Manual Review**: Teacher review and grading workflow
- **Submission Management**: Track submission status (pending, graded, in review)
- **Detailed Feedback**: Teachers can provide comprehensive feedback on submissions

### 🎓 Student Features
- **Personalized Dashboard**: View enrolled courses and progress
- **Course Progress Visualization**: Track completion percentage
- **Assignment Submission**: Submit assignments with file uploads
- **Grade Tracking**: View grades and feedback
- **Certificate Generation**: Earn certificates upon course completion
- **Activity Log**: Track learning activities and engagement

### 👨‍🏫 Teacher Features
- **Course Creation**: Create and manage courses with full content control
- **Session Management**: Organize course content into structured sessions
- **Assignment Creation**: Design assignments with various question types
- **Grading Interface**: Review and grade student submissions
- **Announcements**: Post course-wide announcements
- **Student Analytics**: Track student progress and performance

### 🎨 UI/UX Features
- **Modern Design System**: Built with shadcn/ui components
- **Dark Mode Support**: Seamless theme switching
- **Responsive Layout**: Mobile-first design that works on all devices
- **Animated Interactions**: Smooth animations with Framer Motion
- **Accessible Components**: WCAG compliant UI components
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Client and server-side validation with Zod

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14.2](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 3.4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Animations**: [Framer Motion 11.15](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [Tabler Icons](https://tabler-icons.io/)
- **Form Handling**: [React Hook Form 7.54](https://react-hook-form.com/)
- **Validation**: [Zod 3.24](https://zod.dev/)

### Backend
- **Runtime**: Node.js with Next.js Server Components and Server Actions
- **Database**: PostgreSQL (via Supabase)
- **ORM**: [Prisma 6.1](https://www.prisma.io/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **API**: Next.js Server Actions for type-safe server functions

### DevOps & Tooling
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript strict mode
- **Database Migrations**: Prisma Migrate

## 🏗 Architecture

### Application Architecture
Lumin LMS follows a modern, server-centric architecture leveraging Next.js 14's App Router:

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React Components (Client + Server Components)         │ │
│  │  - Server Components (default, SEO-friendly)           │ │
│  │  - Client Components (interactive, use client)         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Next.js 14 Server                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  App Router (src/app/)                                 │ │
│  │  - Page Routes                                         │ │
│  │  - API Routes (Route Handlers)                        │ │
│  │  - Middleware (Authentication)                        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Server Actions (src/actions/)                        │ │
│  │  - Type-safe server functions                         │ │
│  │  - Direct database operations                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
         ┌──────────────────┐  ┌──────────────────┐
         │  Supabase Auth   │  │  PostgreSQL DB   │
         │  - JWT Tokens    │  │  - Prisma ORM    │
         │  - OAuth         │  │  - RLS Policies  │
         └──────────────────┘  └──────────────────┘
```

### Data Flow
1. **Authentication**: Supabase handles auth, Next.js middleware validates sessions
2. **Database Access**: Server Actions use Prisma to interact with PostgreSQL
3. **UI Rendering**: Server Components fetch data, Client Components handle interactivity
4. **Real-time Updates**: Optimistic UI updates with React Hook Form

### Security Model
- **Row Level Security (RLS)**: Database-level access control via Supabase
- **Server-side Validation**: All inputs validated with Zod schemas
- **CSRF Protection**: Built into Next.js Server Actions
- **Type Safety**: End-to-end TypeScript for compile-time safety

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17 or higher
- **pnpm**: v8.0 or higher
- **PostgreSQL**: Via Supabase or local instance
- **Supabase Account**: For authentication and database hosting

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamGu-NRX/Lumin-LMS.git
   cd Lumin-LMS
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Database
   DATABASE_URL=your_postgresql_connection_string
   DIRECT_URL=your_postgresql_direct_connection_string
   
   # Application
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpx prisma generate
   
   # Push schema to database
   pnpx prisma db push
   
   # (Optional) Seed database
   pnpx prisma db seed
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Setup Script

For convenience, you can use the provided setup script:

**Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

## 🗄 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id              String   @id @default(uuid())
  email           String   @unique
  role            Role     // student | teacher | admin
  fullName        String
  profileImageUrl String?
  phoneNumber     String?
  isActive        Boolean  @default(true)
  
  // Relations
  Submissions     Submission[]
  ProgressRecords UserSessionsProgress[]
  Certificates    Certificate[]
  ActivityLogs    ActivityLog[]
}
```

#### Course Model
```prisma
model Course {
  id                String   @id @default(uuid())
  title             String
  description       String?
  thumbnailImageUrl String?
  startDate         DateTime?
  endDate           DateTime?
  
  // Relations
  Sessions      Session[]
  Announcements Announcement[]
  Certificates  Certificate[]
}
```

#### Session Model (Lectures)
```prisma
model Session {
  id                String   @id @default(uuid())
  courseId          String
  title             String
  description       String?
  videoUrl          String?
  sequenceOrder     Int      @default(1)
  isLockedByDefault Boolean  @default(true)
  
  // Relations
  Course            Course
  Assignments       Assignment[]
  ProgressRecords   UserSessionsProgress[]
}
```

#### Assignment Model
```prisma
model Assignment {
  id              String          @id @default(uuid())
  sessionId       String
  assignmentType  AssignmentType  // multiple_choice | file_upload | mixed
  title           String
  instructions    String?
  dueDate         DateTime?
  maxScore        Int             @default(100)
  isPublished     Boolean         @default(false)
  requiresReview  Boolean         @default(true)
  
  // Relations
  Session         Session
  Submissions     Submission[]
  Questions       AssignmentQuestion[]
}
```

### Supporting Models
- **UserSessionsProgress**: Tracks student progress through course sessions
- **Submission**: Stores student assignment submissions
- **AssignmentQuestion**: Question bank for assignments
- **AssignmentQuestionOption**: Multiple choice options
- **SubmissionAnswers**: Student answers to assignment questions
- **Certificate**: Course completion certificates
- **Announcement**: Course announcements
- **ActivityLog**: User activity tracking

For the complete schema, see [`prisma/schema.prisma`](prisma/schema.prisma).

## 🔐 Authentication System

### Implementation Overview

Lumin LMS uses **Supabase Auth** for a robust, production-ready authentication system:

```typescript
// Server-side authentication check
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/login');
  }
  
  return user;
}
```

### Authentication Flow

1. **User Registration** (`src/actions/auth.ts`)
   - Validates input with Zod schema
   - Creates Supabase auth user
   - Automatically creates corresponding Prisma user record
   - Handles transaction rollback on failure

2. **Login** 
   - Email/password authentication via Supabase
   - OAuth providers (Google, GitHub) with redirect handling
   - JWT token management (httpOnly cookies)

3. **Session Management** (`middleware.ts`)
   - Automatic session validation on every request
   - Token refresh handling
   - Protected route enforcement

4. **Database Sync**
   - Supabase Auth users sync with Prisma User table
   - Custom user metadata stored in PostgreSQL
   - Row Level Security (RLS) policies enforce access control

### OAuth Configuration

```typescript
export async function signInWithOAuth(provider: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as any,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  
  return { url: data.url, error };
}
```

## 📁 Project Structure

```
Lumin-LMS/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── actions/               # Server Actions
│   │   └── auth.ts           # Authentication actions
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/        # Student dashboard
│   │   ├── private/          # Protected routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/           # React components
│   │   ├── auth/            # Authentication forms
│   │   ├── dashboard/       # Dashboard components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── navigation.tsx   # Navigation bar
│   │   └── theme-provider.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── use-toast.ts     # Toast notifications
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.ts        # Prisma client
│   │   ├── supabase/        # Supabase clients
│   │   │   ├── server.ts    # Server-side client
│   │   │   ├── client.ts    # Client-side client
│   │   │   └── middleware.ts # Auth middleware
│   │   └── utils.ts         # Utility functions
│   └── schema/               # Zod validation schemas
│       └── auth.ts          # Auth schemas
├── middleware.ts             # Next.js middleware
├── tailwind.config.ts        # Tailwind configuration
├── components.json           # shadcn/ui config
└── package.json             # Dependencies
```

## 🔑 Key Implementation Details

### Server Actions for Type-Safe APIs

Instead of traditional REST APIs, Lumin LMS uses Next.js Server Actions for type-safe, direct server function calls:

```typescript
// src/actions/auth.ts
"use server";

export async function registerAction(data: RegisterFormValues) {
  // Validate with Zod
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  // Create auth user
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  // Sync to database
  await db.user.create({
    data: {
      id: authData.user.id,
      email: data.email,
      fullName: `${data.firstName} ${data.lastName}`,
      role: "student",
    },
  });

  return { success: true };
}
```

### Component Patterns

**Server Components** (default):
```typescript
// src/app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch data directly in component
  const courses = await db.course.findMany({
    where: { /* ... */ }
  });
  
  return <Dashboard courses={courses} user={user} />;
}
```

**Client Components** (interactive):
```typescript
// src/components/auth/index.tsx
"use client";

export function Auth() {
  const { toast } = useToast();
  const router = useRouter();
  
  const handleLogin = async (data: LoginFormValues) => {
    const result = await loginAction(data);
    
    if (result.error) {
      toast({ title: "Error", description: result.error });
      return;
    }
    
    router.push("/dashboard");
  };
  
  return <LoginForm onSubmit={handleLogin} />;
}
```

### Form Validation with Zod

```typescript
// src/schema/auth.ts
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
```

### Toast Notification System

Custom toast hook inspired by react-hot-toast:

```typescript
// Usage
const { toast } = useToast();

toast({
  title: "Success",
  description: "Your account has been created!",
  variant: "default", // or "destructive"
});
```

### Theme Support

Dark mode implementation with next-themes:

```typescript
// src/components/theme-provider.tsx
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

## 💻 Development

### Available Scripts

```bash
# Development server with hot reload
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format

# Generate Prisma client
pnpx prisma generate

# Push schema changes to database
pnpx prisma db push

# Open Prisma Studio (database GUI)
pnpx prisma studio
```

### Code Style

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Automatic code formatting with Tailwind plugin
- **TypeScript**: Strict mode enabled for maximum type safety

### Adding New UI Components

This project uses shadcn/ui. To add new components:

```bash
# Add a new component
pnpx shadcn-ui@latest add button

# Add multiple components
pnpx shadcn-ui@latest add card dialog dropdown-menu
```

### Database Changes

1. Modify `prisma/schema.prisma`
2. Generate migration:
   ```bash
   pnpx prisma migrate dev --name description_of_change
   ```
3. Update TypeScript types:
   ```bash
   pnpx prisma generate
   ```

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (from Supabase or custom PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database
DIRECT_URL=postgresql://user:password@host:5432/database

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: OAuth Providers (configure in Supabase dashboard)
# These are managed in Supabase, not in .env
```

### Getting Supabase Credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key
4. Go to Project Settings > Database to get connection strings

## 🎯 What I Did

This project represents a comprehensive implementation of a modern LMS with the following highlights:

### 1. **Full-Stack Architecture**
   - Implemented Next.js 14 App Router with Server Components
   - Created type-safe Server Actions eliminating traditional REST APIs
   - Built middleware-based authentication system

### 2. **Authentication System**
   - Integrated Supabase Auth with multiple providers
   - Synchronized Supabase Auth with Prisma database
   - Implemented protected routes and role-based access control
   - Built custom registration flow with proper error handling

### 3. **Database Design**
   - Designed comprehensive Prisma schema with 11 models
   - Implemented proper relationships and constraints
   - Added support for multiple assignment types
   - Created progress tracking system

### 4. **UI/UX Implementation**
   - Integrated shadcn/ui component library (25+ components)
   - Built animated authentication forms with Framer Motion
   - Implemented dark mode with system preference detection
   - Created responsive layouts for all screen sizes
   - Added toast notification system

### 5. **Form Handling**
   - Integrated React Hook Form for performant forms
   - Implemented Zod validation schemas
   - Created reusable form components
   - Added client and server-side validation

### 6. **Course Management**
   - Designed session-based course structure
   - Implemented progress tracking system
   - Created assignment submission workflow
   - Built grading and feedback system

### 7. **Developer Experience**
   - Set up TypeScript with strict mode
   - Configured ESLint and Prettier
   - Created setup scripts for quick onboarding
   - Organized project structure for scalability

### 8. **Security Implementation**
   - Implemented Row Level Security policies
   - Added CSRF protection via Server Actions
   - Secured all API endpoints with authentication
   - Validated all inputs with Zod schemas

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style (ESLint + Prettier)
- Write meaningful commit messages
- Add tests for new features (when test infrastructure is added)
- Update documentation as needed
- Ensure TypeScript compilation passes with no errors

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ for AI education**
