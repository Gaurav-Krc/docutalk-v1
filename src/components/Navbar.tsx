import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton  } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>docuchat.</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Pricing
                </Link>
                <SignInButton>
                  <Button
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Sign in
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className={buttonVariants({ size: "sm" })}>
                    Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Button>
                </SignUpButton>

              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Dashboard
                </Link>
                <UserAccountNav
                  name={
                    !user.firstName || !user.lastName
                      ? "Your Account"
                      : `${user.firstName} ${user.lastName}`
                  }
                  email={String(user.emailAddresses[0]) ?? ""}
                  imageUrl=""
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
