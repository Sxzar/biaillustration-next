import React from "react";
import Image from "next/image";
import Logo from "@/assets/svg/logo-black.svg";
import Link from "next/link";
import TopNav from "./TopNav";

const Header = () => {
  return (
    <header className="p-4">
      <div className="container mx-auto flex justify-between content-center">
        <Link href="/">
          <Image src={Logo} alt="logo" width={100} height={100} />
        </Link>
        <TopNav />
      </div>
    </header>
  );
};

export default Header;
