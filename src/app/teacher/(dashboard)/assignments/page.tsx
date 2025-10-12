import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/prisma";
import AssignmentsClient from "@/components/teacher/assignment";

/**
 * Render the teacher assignments page by fetching assignments from Prisma and Supabase and passing them to the client component.
 *
 * Fetches all assignments (including related questions) via Prisma and performs an additional Supabase query on the "assignments" table.
 *
 * @returns A React element that renders the assignments UI: `serverAssignments` contains the Prisma results and `supabaseAssignments` contains the Supabase results (or an empty array if the Supabase query returned no data).
 */
export default async function AssignmentsPage() {
  // 1) Create a Supabase client scoped to the current user's session (SSR).
  const supabase = await createClient();

  // 2) Example Supabase query (adjust table name/columns as needed).
  const { data: supabaseData, error: supabaseError } = await supabase
    .from("assignments")
    .select("*");

  if (supabaseError) {
    console.error("Supabase error:", supabaseError);
    // Optionally handle error
  }

  // 3) Example Prisma query (adjust your model name/fields).
  const allAssignments = await db.assignment.findMany({
    include: {
      questions: true,
    },
  });

  // 4) Merged or separate data
  // For illustration, let's assume you want to pass `allAssignments`.
  // In real code, you might merge data from both queries or just use one.
  // (allAssignments is an array of Assignment objects.)

  return (
    <AssignmentsClient
      serverAssignments={allAssignments}
      supabaseAssignments={supabaseData ?? []}
    />
  );
}