import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MobileNav from "./MobileNav"
import NavItems from "./NavItems"

const Header = () => {
  return (
    <header className="w-full border-b p-5">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          JobTracker
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden md:block w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header