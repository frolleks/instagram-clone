import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";
import { SignOutButton } from "@/components/sign-out-button";
import { getUser } from "@/db/query/get-user";
import { users } from "@/db/schema";

export default async function Home() {
  const session = await auth();
  let user: typeof users.$inferSelect | null = null;

  if (session?.user?.id) {
    try {
      user = await getUser(session.user.id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <main className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full gap-y-1.5">
        {session ? (
          <>
            <SignOutButton />
            <p className="text-sm">
              You&apos;re signed in as {session.user?.name}
            </p>
          </>
        ) : (
          <>
            <SignInButton />
            <p className="text-sm">You&apos;re not signed in</p>
          </>
        )}
      </div>
    </main>
  );
}
