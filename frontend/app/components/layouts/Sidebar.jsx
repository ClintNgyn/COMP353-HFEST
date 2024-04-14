"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const Sidebar = ({ className }) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/facilities", label: "Facilities" },
    { href: "/residences", label: "Residences" },
    { href: "/persons", label: "Persons" },
    { href: "/employees", label: "Employees" },
    { href: "/scheduled", label: "Scheduled" },
    { href: "/vaccinations", label: "Vaccinations" },
    { href: "/infections", label: "Infections" },
  ];

  return (
    <Navbar className={`${className} text-blue-950`} height={null} isBordered position="sticky">
      <NavbarContent className="flex flex-col gap-4 justify-between">
        <NavbarBrand className="">
          <h1 className="text-3xl p-2 font-black text-center tracking-wide">HFESTS</h1>
        </NavbarBrand>
        {navItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link className="text-sm p-0" href={item.href} color={pathname === item.href ? "blue" : "foreground"}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};

export default Sidebar;
