"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({ className }) => {
  const pathname = usePathname();

  const navLinks = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/services", label: "Services" },
    // { id: 3, url: "/projects", label: "Project" },
    { id: 4, url: "/projectShowcase", label: "Project Showcase" },
    { id: 5, url: "/successStory", label: "Success" },
    { id: 6, url: "/blogs", label: "Blog" },
    { id: 7, url: "/about-us", label: "About Us" },
    { id: 8, url: "/contactUs", label: "Contact Us" },
    { id: 9, url: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="flex flex-col items-center md:flex-row">
        {navLinks.map((link) => (
          <Button
            asChild
            variant="link"
            key={link.id}
            className={cn(pathname === link.url ? "underline" : "")}
          >
            <Link href={link.url} className="font-semibold">
              {link.label}
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-2 block md:hidden">
        <Link href="/AboutUs#contact-section">
          {" "}
          <Button variant="dcl_pi">Contact Us</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavItems;
