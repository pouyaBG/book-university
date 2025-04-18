import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export default async function Home() {
  const result = await db.select().from(users);
  // console.log("🚀 ~ Home ~ result:", JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
