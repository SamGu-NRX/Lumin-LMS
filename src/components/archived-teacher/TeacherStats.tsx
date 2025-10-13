"use client";

import { Card } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  FileCheck, 
  GraduationCap 
} from "lucide-react";

/**
 * Renders a responsive grid of four statistic cards for a course.
 *
 * Each card displays a title, an icon, a numeric value (safely read from `courseData` with a fallback of `0`), and a short description.
 *
 * @param courseData - Object containing optional arrays `enrollments`, `sessions`, `assignments`, and `submissions`; each array's first element may include a `count` number used for the corresponding stat.
 * @returns A JSX element containing the grid of statistic cards: Total Students, Total Sessions, Assignments, and Submissions.
 */
export function TeacherStats({ courseData }) {
  const stats = [
    {
      title: "Total Students",
      value: courseData?.enrollments?.[0]?.count || 0,
      icon: Users,
      description: "Active enrollments",
    },
    {
      title: "Total Sessions",
      value: courseData?.sessions?.[0]?.count || 0,
      icon: BookOpen,
      description: "Course content",
    },
    {
      title: "Assignments",
      value: courseData?.assignments?.[0]?.count || 0,
      icon: FileCheck,
      description: "Total assignments",
    },
    {
      title: "Submissions",
      value: courseData?.submissions?.[0]?.count || 0,
      icon: GraduationCap,
      description: "Pending review",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}