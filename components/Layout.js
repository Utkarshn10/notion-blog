import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({children}){
    return (
      <div className="flex flex-col items-center justify-center w-full bg-[#fff6ed]">
        <div className="w-4/5">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    );
}