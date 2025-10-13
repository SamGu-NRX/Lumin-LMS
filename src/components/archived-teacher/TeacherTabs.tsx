"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionsManager } from "./sessions/SessionsManager";
import { AssignmentsManager } from "./assignments/AssignmentsManager";
import { SubmissionsManager } from "./submissions/SubmissionsManager";
import { StudentsManager } from "./students/StudentsManager";

/**
 * Render a tabbed interface that switches between teacher manager views.
 *
 * Renders four tabs — "Sessions", "Assignments", "Submissions", and "Students" — each displaying its corresponding manager component. The default active tab is "Sessions".
 *
 * @returns A JSX element that contains the tabs and their corresponding manager components.
 */
export function TeacherTabs() {
  return (
    <Tabs defaultValue="sessions" className="space-y-4">
      <TabsList>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="submissions">Submissions</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>

      <TabsContent value="sessions">
        <SessionsManager />
      </TabsContent>

      <TabsContent value="assignments">
        <AssignmentsManager />
      </TabsContent>

      <TabsContent value="submissions">
        <SubmissionsManager />
      </TabsContent>

      <TabsContent value="students">
        <StudentsManager />
      </TabsContent>
    </Tabs>
  );
}