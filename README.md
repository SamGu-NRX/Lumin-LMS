# Lumin LMS - AI Bootcamp Learning Management System

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.1-brightgreen)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

A comprehensive Learning Management System designed for AI development bootcamps. Built with modern web technologies, Lumin LMS provides an interactive platform for students to learn AI development through structured courses, assignments, and progress tracking.

## ✨ Features

### For Students
- **🎓 Interactive Learning Sessions** - Engage with video content, exit tickets, and resources
- **📝 Assignment Submission** - Upload and submit assignments with file support (.pdf, .doc, .docx)
- **📊 Progress Tracking** - Monitor your learning progress and performance analytics
- **🎯 Exit Tickets** - Test your knowledge with interactive quizzes after each session
- **🏆 Certificates** - Earn certificates upon course completion
- **📱 Mobile-Friendly Design** - Access your courses on any device

### For Teachers
- **👥 Student Management** - View and manage enrolled students
- **📋 Assignment Management** - Create and grade assignments
- **📈 Analytics Dashboard** - Track student progress and performance
- **🎬 Course Content Management** - Organize sessions, resources, and materials
- **✅ Grading System** - Review and grade student submissions

### Platform Features
- **🤖 AI-Generated Question Difficulties** - Adaptive AI assesses question difficulty levels
- **💾 Popup for Saving Questions** - Contribute to a shared question database
- **🎨 Customizable Study Plans** - Create personalized learning paths
- **🔐 Secure Authentication** - Powered by Supabase Auth
- **🌙 Dark Mode Support** - Easy on the eyes with theme toggle
- **⚡ Fast Performance** - Built with Next.js 14 and Turbopack

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth)
- **API**: Next.js API Routes

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **PostgreSQL** database
- **Supabase** account (for authentication)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/SamGu-NRX/Lumin-LMS.git
cd Lumin-LMS
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lumin_lms"
DIRECT_URL="postgresql://user:password@localhost:5432/lumin_lms"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Stripe (optional, for payments)
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

### 4. Set up the database
```bash
# Generate Prisma client
pnpx prisma generate

# Push database schema
pnpx prisma db push
```

### 5. Start the development server
```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Configure authentication providers in Authentication > Providers
4. Update your `.env` file with the credentials

### Database Migrations
The project uses Prisma for database management. The schema is located at `prisma/schema.prisma`.

```bash
# Generate Prisma client
pnpx prisma generate

# Push schema changes to database
pnpx prisma db push

# View database in Prisma Studio
pnpx prisma studio
```

## 📖 Usage

### For Students
1. **Register/Login**: Create an account or sign in
2. **Browse Courses**: View available courses and enroll
3. **Access Sessions**: Watch videos, complete exit tickets
4. **Submit Assignments**: Upload your work for grading
5. **Track Progress**: Monitor your learning journey

### For Teachers
1. **Login**: Sign in with teacher credentials
2. **Manage Students**: View enrolled students and their progress
3. **Create Content**: Add sessions, resources, and assignments
4. **Grade Submissions**: Review and provide feedback
5. **View Analytics**: Monitor class performance

### For Admins
1. **User Management**: Manage user roles and permissions
2. **Course Administration**: Oversee all courses and content
3. **System Monitoring**: Track platform usage and performance

## 📁 Project Structure

```
Lumin-LMS/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # Student dashboard
│   │   ├── sessions/          # Session content pages
│   │   └── teacher/           # Teacher portal
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── auth/             # Authentication components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── sessions/         # Session components
│   │   ├── assignments/      # Assignment components
│   │   └── teacher/          # Teacher components
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── actions/              # Server actions
│   ├── schema/               # Validation schemas (Zod)
│   ├── data/                 # Static data
│   ├── email/                # Email templates
│   └── supabase/             # Supabase configuration
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                    # Static assets
└── package.json              # Project dependencies
```

## 🔨 Development Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint            # Run ESLint
pnpm prettier-fix    # Format code with Prettier

# Database
pnpx prisma generate           # Generate Prisma client
pnpx prisma db push           # Push schema to database
pnpx prisma studio            # Open Prisma Studio

# Supabase
pnpm supabase:start           # Start local Supabase
pnpm supabase:stop            # Stop local Supabase
pnpm supabase:status          # Check Supabase status
pnpm supabase:reset           # Reset database
pnpm supabase:generate-types  # Generate TypeScript types

# Stripe
pnpm stripe:login             # Login to Stripe CLI
pnpm stripe:listen            # Listen for webhook events
pnpm stripe:fixtures          # Load test fixtures
```

## 🎨 Key Components

### Authentication
- Register/Login forms with validation
- OAuth integration (Google, GitHub)
- Password reset functionality
- Role-based access control (Student, Teacher, Admin)

### Session Management
- Video player with controls
- Exit tickets/quizzes
- Resource links and downloads
- Progress tracking

### Assignment System
- File upload with drag-and-drop
- Multiple choice questions
- Mixed assignment types
- Submission tracking and grading

### Dashboard
- Student progress overview
- Course enrollment status
- Assignment deadlines
- Performance analytics

## 🤝 Contributing

We welcome contributions to Lumin LMS! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Code Style Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add JSDoc comments for complex functions
- Ensure code passes linting (`pnpm lint`)
- Format code with Prettier (`pnpm prettier-fix`)

## 🔒 Security

- All passwords are hashed using Supabase Auth
- API routes are protected with authentication middleware
- Role-based access control for sensitive operations
- Environment variables for sensitive data
- CSRF protection on forms

## 📄 License

This project is currently proprietary. All rights reserved.

## 👥 Team

**LuminAI Bootcamps**
- Twitter: [@LuminAI](https://twitter.com)
- LinkedIn: [LuminAI](https://www.linkedin.com/company/studycoachai)
- Discord: [Join our community](https://discord.gg)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Supabase](https://supabase.com/) - Backend as a service
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact us through the support portal
- Join our Discord community

---

Built with ❤️ by the LuminAI team
