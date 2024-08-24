import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await auth();

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
