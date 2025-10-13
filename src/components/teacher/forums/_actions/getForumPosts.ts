import { db } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { ForumPost } from '..';

/**
 * Fetches forum posts and returns them formatted for UI consumption.
 *
 * @returns An array of forum post objects each containing `id`, `title`, `content`, `author`, `date` (formatted as `YYYY-MM-DD`), `course`, `isFlagged`, and `isLocked`.
 */
export async function getForumPosts() {
  // Example: Using a supabase client for session or user checks
  const supabase = await createClient();
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) { throw new Error("Not authenticated") }

  // Retrieve from your Prisma model "forumPost" or similar
  const forumPosts = await db.forumPost.findMany({
    orderBy: {
      date: 'desc'
    }
  });

  // Return in the shape your UI expects
  return forumPosts.map((post: ForumPost) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    date: post.date.split('T')[0],
    course: post.course,
    isFlagged: post.isFlagged,
    isLocked: post.isLocked
  }));
}