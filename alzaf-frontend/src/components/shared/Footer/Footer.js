import Link from "next/link";
import { FaFacebook, FaHome, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: "url('https://i.postimg.cc/xdsS0MDy/dna-Footer.png')",
      }}
      className="w-full bg-cover bg-no-repeat"
    >
      <div className="bg-[#0A2F4D]">
        <div className="flex flex-wrap gap-x-28 gap-y-10 py-10 ">
          {/* First Column */}
          <ul className="flex flex-col gap-3">
            <li className="flex gap-2 text-3xl font-bold text-white">
              DCL Engineering
            </li>
            <li className="max-w-80">
              <p className="mt-5 font-medium leading-7 text-gray-300">
                Focusing on medium to large-scale commercial construction
                projects, we work with both investors and developers to create
                landmarks that make an impact.
              </p>
            </li>
          </ul>

          {/* Second Column */}
          <ul className="flex flex-col gap-y-3">
            <li className="text-2xl font-bold text-white">Links</li>
            <li className="mt-5">
              <Link href="/" className="text-gray-300">
                Home
              </Link>
            </li>

            <li className="">
              <Link href="/services" className="text-gray-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-gray-300">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="text-gray-300">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/sucess" className="text-gray-300">
                Success
              </Link>
            </li>
          </ul>

          {/* Third Column */}
          <ul className="grid gap-y-3">
            <li className="text-2xl font-bold text-white">
              Contact Information
            </li>
            <li className="max-w-80">
              {" "}
              <p className="mt-5 font-medium leading-7 text-gray-300">
                You Can Always contact with us via email or phone. Get in touch
                with contact and get a quote form
              </p>
            </li>
            <li className="mt-5 flex gap-x-3 text-gray-300">
              <FaHome className="mt-1 text-xl text-white" />
              HM Plaza, (13th Floor) Sector-03 <br /> Uttara, Dhaka-1230
            </li>
            <li className="flex gap-x-3 text-gray-300">
              <IoCall className="mt-1 text-xl text-white" />
              +880 1700978687
            </li>
            <li className="flex gap-x-3 text-gray-300">
              <IoMdMail className="mt-1 text-xl text-white" />
              dclengineering@gmail.com
            </li>
          </ul>

          {/* Socials */}
          <ul className="flex flex-col gap-y-3">
            <li className="text-2xl font-bold text-white">Socials</li>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1824.3485041533095!2d90.39577399358598!3d23.864890637620633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c411fec45ab9%3A0xa29fdaaa39a7c771!2sSector-04%2CUttara!5e0!3m2!1sen!2sbd!4v1727179036164!5m2!1sen!2sbd"
              width="250"
              height="170"
              style={{ border: 0, marginTop: "0px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <li className="mt-5 flex gap-4">
              <Link href="https://www.facebook.com/" target="_blank">
                {" "}
                <div className="rounded-sm border p-1.5">
                  <FaFacebook className="text-xl text-white" />
                </div>
              </Link>

              <Link href="https://www.instagram.com/" target="_blank">
                {" "}
                <div className="rounded-sm border p-1.5">
                  <FaInstagram className="text-xl bg-white rounded-md text-[#0A2F4D]" />
                </div>
              </Link>
              <Link href="https://www.linkedin.com/" target="_blank">
                {" "}
                <div className="rounded-sm border p-1.5">
                  <FaLinkedinIn className="text-xl text-white" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-t bg-[#0A2F4D] border-gray-300 p-5">
          <h1 className="text-center font-semibold text-gray-300">
            {" "}
            &copy; Copyright DCL Engineering 2023 . All right reserved.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
