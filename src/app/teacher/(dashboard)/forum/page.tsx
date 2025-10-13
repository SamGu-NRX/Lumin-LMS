import { Suspense } from "react"
import { Metadata } from "next"
import { motion } from "framer-motion"

import { getForumPosts } from "@/components/teacher/forums/_actions/getForumPosts"
import LoadingSkeleton from "./loading"
import ForumClient from "@/components/teacher/forums"

export const metadata: Metadata = {
  title: "Forum",
  description: "Forum page for user discussions",
}

/**
 * Server component that fetches forum posts and renders the forum UI inside a Suspense boundary with an animated loading fallback.
 *
 * @returns A JSX element containing a Suspense-wrapped ForumClient initialized with server-fetched posts and an animated LoadingSkeleton fallback.
 */
export default async function ForumPage() {
  // Fetch your data on the server side
  const posts = await getForumPosts()

  return (
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
      <ForumClient serverPosts={posts} />
    </Suspense>
  )
}