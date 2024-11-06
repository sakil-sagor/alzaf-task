import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const TopNavbar = () => {
  const navLinksLeft = [
    {
      id: 1,
      url: "/shop",
      label: (
        <>
          <div className="flex items-center ">
            <p>Language </p>
            <IoIosArrowDown />
          </div>
        </>
      ),
    },
    { id: 2, url: "/shop", label: "Help Center" },
    { id: 3, url: "/shop", label: "Helpline: 0964781656" },
  ];
  const navLinksRight = [
    { id: 4, url: "/shop", label: "Become a Seller" },
    { id: 5, url: "/shop", label: "Order Track" },
  ];

  return (
    <div className="bg-[#F0F1F1]">
      <div className="hidden md:flex flex-col items-center justify-between  md:flex-row container mx-auto px-2 ">
        <div className="flex flex-col items-center md:flex-row">
          {navLinksLeft.map((link) => (
            <Button asChild variant="link" key={link.id}>
              <Link href={link.url} className=" ">
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex flex-col items-center md:flex-row">
          {navLinksRight.map((link) => (
            <Button asChild variant="link" key={link.id}>
              <Link href={link.url} className=" ">
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="text-orange-500 text-sm">
            <Link href="/login" className="  text-orange-500">
              Login
            </Link>

            <span className="mr-1"> /</span>

            <Link href="/registration" className="  text-orange-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
