"use client";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Render skeleton placeholders for the dashboard loading state.
 *
 * Displays a top bar skeleton and a responsive two-column grid of tile skeletons
 * to indicate content is loading.
 *
 * @returns A React element containing skeleton placeholders for the dashboard.
 */
export default function Loading() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <Skeleton className="h-12 w-[250px]" />
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-[200px]" />
        ))}
      </div>
    </div>
  );
}