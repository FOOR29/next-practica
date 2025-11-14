"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarHome = () => {

    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
    ];
    return (
        <nav className="flex gap-4">
            {navLinks.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (pathname.startsWith(link.href) && link.href !== "/");
                return (
                    <Link
                        href={link.href}
                        key={link.name}
                        className={`${isActive ? "text-white bg-blue-900 py-0.5 px-2.5 rounded-2xl" : "text-gray-300 hover:text-white"}`}
                        replace>
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    )
}

export default NavbarHome