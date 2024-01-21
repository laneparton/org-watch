"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'

export function Header() {
    const pathname = usePathname()

    return (
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="/">
                    Org Watch
                </Link>
                <Link className={pathname === '/' ? 'font-bold' : 'text-gray-500 dark:text-gray-400'} href="/">
                    Home
                </Link>
                <Link className={pathname === '/companies' ? 'font-bold' : 'text-gray-500 dark:text-gray-400'} href="/companies">
                    Companies
                </Link>
            </nav>
            {/* <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="flex-1 ml-auto sm:flex-initial">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            placeholder="Search books..."
                            type="search"
                        />
                    </div>
                </form>
                <Button className="rounded-full" size="icon" variant="ghost">
                    <img
                        alt="Avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                    />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </div> */}
        </header>
    )
}