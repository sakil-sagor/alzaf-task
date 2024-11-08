"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logOut } from "@/utils/action/authAction";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";

const SideNavbar = ({ session }) => {
  const router = useRouter();
  let user;
  const isDropdownItemActive = (dropdownItems) => {
    return dropdownItems.some((item) => location.pathname === item.href);
  };

  const handleLogOut = async () => {
    await logOut();
    // setUser(null);
    router.push("/");
  };

  const links = [
    { id: 1, href: "/", label: "Home" },

    {
      id: 3,
      href: "/dashboard/banner-page",
      label: "Banner",
    },

    {
      id: 13,
      href: "/dashboard/user-page",
      label: "Users",
    },
  ];

  return (
    <>
      <section className="sticky top-0 z-50 hidden min-h-screen w-[250px] min-w-[250px] border-r px-2.5 py-5 md:min-h-screen lg:block">
        <div className="my-5 flex items-center justify-between gap-2 rounded-lg border bg-background p-2">
          <Avatar>
            <AvatarImage
              src={session?.user?.image || ""}
              alt="profile-picture"
            />
            <AvatarFallback className="bg-blue-600 font-semibold text-white">
              {session?.user?.name}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold ">Admin Dashboard</p>
        </div>

        {/* Mapping over links */}
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Button
              key={link.id}
              variant="secondary"
              asChild
              className="justify-start"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <Button
          className="mt-5 w-full gap-2"
          variant="destructive"
          onClick={() => signOut()}
        >
          Logout <IoIosLogOut size={25} />
        </Button>
      </section>

      {/* //* For Smaller Devices */}
      <section className="px-2.5 py-4 flex lg:hidden justify-between items-center w-full sticky top-0 z-50 bg-background border-b">
        {/* //* Slider */}
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HiMenuAlt1 size={30} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mt-5 flex flex-col gap-2">
                {/* Map over routes and generate links */}
                {links.map((link) => (
                  <Button
                    key={link.id}
                    variant="secondary"
                    asChild
                    className="justify-start"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>

              <Button
                className="my-5 w-full gap-2"
                variant="destructive"
                onClick={() => signOut()}
              >
                Logout <IoIosLogOut size={25} />
              </Button>
            </SheetContent>
          </Sheet>
        </div>

        {/* //* LOGO */}
        <Link href={"/"}>
          <div className="flex items-center gap-1">
            <Image
              src="/alzaf-logo.png"
              alt="alzaf logo"
              width={150}
              height={150}
              className="siz"
            />
          </div>
        </Link>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {/* <AvatarImage src={user?.profile || ""} alt="profile-picture" /> */}
                <AvatarFallback className="bg-blue-600 font-semibold text-white">
                  {/* {user?.fullName?.split("")[0]} */}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-1.5">
              <DropdownMenuLabel>
                {/* {user?.fullName || "Not Available"} */}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/"}>
                <DropdownMenuItem asChild>
                  <Button className="my-1 w-full">Home</Button>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem asChild>
                <Button
                  className="my-1 w-full gap-2"
                  variant="destructive"
                  onClick={() => signOut()}
                >
                  Logout <IoIosLogOut size={25} />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </>
  );
};

export default SideNavbar;
