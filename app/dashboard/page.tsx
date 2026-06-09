import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@/lib/db";
import DashboardPage from "@/components/dashboardPage";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [userRows, wordCountRows, textCountRows, recentWordRows, recentTextRows] =
    await Promise.all([
      sql`SELECT username, email FROM users WHERE id = ${userId}`,
      sql`SELECT COUNT(*) AS count FROM words WHERE user_id = ${userId}`,
      sql`SELECT COUNT(*) AS count FROM user_texts WHERE user_id = ${userId}`,
      sql`SELECT word, language, created_at FROM words WHERE user_id = ${userId} ORDER BY id DESC LIMIT 3`,
      sql`SELECT id, title FROM user_texts WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`,
    ]);

  const user = userRows[0] as { username: string; email: string };
  const wordsLearned = Number(wordCountRows[0]?.count ?? 0);
  const textsRead = Number(textCountRows[0]?.count ?? 0);

  const recentWords = (recentWordRows as { word: string; language: string; created_at: string }[]).map(
    (w) => ({
      word: w.word,
      language: w.language,
      date: w.created_at
        ? new Date(w.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "",
    })
  );


  return (
    <DashboardPage
      data={{
        user: { name: user.username || session?.user?.name || "User", email: user.email },
        stats: { wordsLearned, textsRead },
        recentWords,
      }}
    />
  );
}