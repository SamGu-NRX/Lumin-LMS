// app/teacher/certificates/_actions/getCertificates.ts
import { db } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { CertificateItem, CertificateStatus } from '..';

/**
 * Fetches certificates from the database and returns them mapped to the `CertificateItem` shape.
 *
 * Each returned item includes the certificate `id`, `studentName` (falls back to `"Unknown Student"` when no student is associated),
 * `certificateUrl` (if present), `issueDate` and `expirationDate` as ISO strings (expiration may be `undefined`),
 * `status`, and `gradeAtCompletion` (if present).
 *
 * @returns An array of certificate items with fields: `id`, `studentName`, `certificateUrl` (optional), `issueDate` (ISO string),
 * `expirationDate` (ISO string or `undefined`), `status`, and `gradeAtCompletion` (optional).
 */
export async function getCertificates(): Promise<CertificateItem[]> {
  // Optional: create Supabase client for session checks
  const supabase = createClient();
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) { throw new Error('Not authenticated') }

  // Retrieve all certificates, including the student relation
  const all = await db.certificate.findMany({
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc' // default ordering if desired
    }
  });

  // Map to a shape your React components expect
  const results: CertificateItem[] = all.map((c) => {
    const studentName = c.student
      ? `${c.student.firstName} ${c.student.lastName}`
      : 'Unknown Student';

    return {
      id: c.id,
      studentName,
      certificateUrl: c.certificateUrl ?? undefined,
      issueDate: c.issuedAt.toISOString(),
      expirationDate: c.expiresAt?.toISOString(),
      status: c.status as CertificateStatus, // cast from Prisma enum
      gradeAtCompletion: c.gradeAtCompletion ?? undefined
    };
  });

  return results;
}