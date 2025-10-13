import { Sidebar } from '@/components/teacher/Sidebar'
import { Header } from '@/components/teacher/Header'

/**
 * Layout component that composes the teacher sidebar and header and provides a scrollable content area.
 *
 * @param children - Content to render inside the layout's main scrollable container
 * @returns The layout element containing the Sidebar, Header, and a padded main area that hosts `children`
 */
export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
