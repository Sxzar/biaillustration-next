"use client";
import React, { use } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import HamburgerMenuIcon from "@/assets/svg/hamburger.svg";
import LogoWide from "@/assets/svg/logo-wide.svg";
import TopNavLinks from "./TopNavLinks";

import { useState, useEffect } from "react";
import { checkUserLoggedInClient, logoutUser } from "@/lib/api";
import { get } from "http";

const TopNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkLoginStatus() {
      const isLoggedIn = await checkUserLoggedInClient();
      setLoggedIn(isLoggedIn);
    }

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav>
      <Sheet>
        <SheetTrigger>
          <Image src={HamburgerMenuIcon} alt="menu" width={34} height={34} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex items-center py-4">
            <Image src={LogoWide} alt="logo" width={200} height={100} />
          </SheetHeader>
          <TopNavLinks />
          <ul>
            {loggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default TopNav;
