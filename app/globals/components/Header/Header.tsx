"use client";
import Image from "next/image";

import Hamburger from "./Hamburger";

import logoImg from "@/public/images/logo.png"
import NavigationBar from "./NavigationBar";
import ProfileMenu from "./ProfileMenu";

const Header: React.FC = () => {
    const toggleNavigationBar = () => {}

    return (
        <header className="py-2 px-4 grid grid-cols-[auto,auto,1fr,auto,auto] items-center gap-4 shadow-md">
            <Hamburger clickTrigger={toggleNavigationBar} />
            <Image src={logoImg} alt="cogniquest logo" width={32} className="h-auto"/>
            <div></div>{/* gap */}
            <NavigationBar />
            <ProfileMenu />
        </header>
    )
}

export default Header;