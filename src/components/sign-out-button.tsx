"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function SignOutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Sign out</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to sign out?</DialogTitle>
          <DialogDescription>
            You will sign out from this service.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => signOut()}>Sign out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
