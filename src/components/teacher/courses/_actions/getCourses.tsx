import { db } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { Course } from ".."


/**
 * Fetches all courses from the database and returns them formatted for frontend consumption.
 *
 * Retrieves courses ordered by title ascending and maps each record to the Course shape expected by consuming components.
 *
 * @returns An array of Course objects with fields: id, title, description, bootcampName, session, cohort, students, and progress.
 */
export async function getCourses(): Promise<Course[]> {
  // For example, if you have a `courses` table in Prisma:
  // (Pseudo-code, adapt to your schema)
  const supabase = await createClient();

  // If you need user session checks, do it here.
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) { /* handle not logged in */ }

  const allCourses = await db.course.findMany({
    orderBy: {
      title: "asc",
    },
  })

  // Return them in the shape your React components expect
  return allCourses.map((course: Course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    bootcampName: course.bootcampName,
    session: course.session,
    cohort: course.cohort,
    students: course.students,
    progress: course.progress,
  }))
}