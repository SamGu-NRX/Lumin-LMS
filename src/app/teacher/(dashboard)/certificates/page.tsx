import { Metadata } from 'next';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

import CoursesClient from '@/components/teacher/courses';
import { getCourses } from '@/components/teacher/courses/_actions/getCourses';

import LoadingSkeleton from './loading';

// Optionally define some meta tags, etc.
export const metadata: Metadata = {
  title: 'Courses',
  description: 'Manage your courses in the AI Bootcamp'
};

/**
 * Server component that fetches courses and renders the client CoursesClient inside a Suspense boundary.
 *
 * Fetches course data on the server and passes it to the client component via the `serverCourses` prop.
 * While the client component is being prepared, a fading loading skeleton is shown as the Suspense fallback.
 *
 * @returns A React element that renders `CoursesClient` with server-fetched courses wrapped in a `Suspense` boundary; the fallback displays a loading skeleton with a brief fade-in animation.
 */
export default async function CoursesPage() {
  // Fetch data on the server side via Prisma + Supabase
  const courses = await getCourses();

  return (
    // We can wrap the client component in Suspense to show
    // a skeleton if the fetching takes a bit
    <Suspense
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingSkeleton />
        </motion.div>
      }
    >
      <CoursesClient serverCourses={courses} />
    </Suspense>
  );
}