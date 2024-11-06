import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="mt-28">{children}</div>
      <Footer />
    </div>
  );
}
