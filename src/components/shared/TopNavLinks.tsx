"use client";

import React from "react";
import { NavLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const TopNavLinks = () => {
  const pathname = usePathname();
  return (
    <ul>
      {NavLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${isActive && "link-active"} font-oswald whitespace-nowrap font-bold py-2`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TopNavLinks;
