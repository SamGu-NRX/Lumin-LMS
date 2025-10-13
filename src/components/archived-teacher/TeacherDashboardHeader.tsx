"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";

/**
 * Render the header bar for the Teacher Dashboard with title and action buttons.
 *
 * The header contains the "Teacher Dashboard" title on the left and two action buttons on the right:
 * "Course Settings" (outline variant with a Settings icon) and "New Session" (primary variant with a PlusCircle icon).
 *
 * @returns The header element containing the dashboard title and the two action buttons.
 */
export function TeacherDashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Course Settings
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>
      </div>
    </header>
  );
}