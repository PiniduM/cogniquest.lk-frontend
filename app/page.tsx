"use client";

import robotVector from "../public/images/robot_image.svg";
import { AuthContext } from "../src/contexts/AuthContext";
// import heroCover from "@public/images/hero/hero_cover.svg";
import Image from "next/image";
import { useContext } from "react";
import Button from "../src/ui/button";

const HomePage: React.FC = () => {
  const { loginToken } = useContext(AuthContext);

  return (
    <>
      <section className="dark:text-white text-black flex justify-evenly items-center py-10 mb-10 hero bg-gradient-to-r from-[#7474FF] to-[#fff] dark:from-[#7045A3] dark:to-[#25132F] ">


        
        <div className="relative w-2/4">
          <div className="image_container">
            <Image
              className="w-full h-full"
              src={"/images/hero/hero_content.png"}
              alt="hero-pic-cover"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div>
          <h1 className="text-5xl mb-6 font-semibold mr-3">
            If you can dream it you can do it
          </h1>
          <p className="text-2xl font-semibold text-gray-500">
            Ignite your creativity
            <br /> with project based
            <br /> competitions
          </p>
          <Button onClick={() => {}}>ReadMore</Button>
        </div>
      </section>
      <section className="w-full flex justify-evenly items-center">
        <div className="">
          <h1 className="text-4xl mb-6 font-semibold">
            A platform to ignite
            <br />
            <span className="text-5xl text-yellow-400">creativity</span>.
          </h1>
          <p className="text-xl leading-6 font-semibold text-gray-500">
            Cogniquest is designed to
            <br />
            streamline the project based
            <br />
            competition hosting so that
            <br />
            both hosts and participants
            <br />
            can enjoy the competitions
            <br />
            without struggling technical issues.
          </p>
        </div>
        <div>
          <Image src={robotVector} alt="teamwork" width={400} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
