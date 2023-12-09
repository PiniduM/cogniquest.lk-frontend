"use client";

import heroVector from "@/public/images/hero/hero_image.png";
import robotVector from "@/public/images/robot_image.svg";
import { AuthContext } from "@/src/contexts/AuthContext";
// import heroCover from "@public/images/hero/hero_cover.svg";
import Image from "next/image";
import { useContext } from "react";
import "./hero.css"

const HomePage: React.FC = () => {
  const { loginToken } = useContext(AuthContext);

  return (
    <>
      <section className="flex justify-evenly items-center py-10 mb-10 hero">
        <div className="relative">
          <Image src={heroVector} alt="teamwork" width={500} />
        </div>
        <div>
          <h1 className="text-5xl mb-6 font-semibold">Cogniquest.lk</h1>
          <p className="text-2xl font-semibold text-gray-500">
            Ignite your creativity
            <br /> with project based
            <br /> competitions
          </p>
        </div>
      </section>
      <section className="flex justify-evenly items-center px-8 mx-4">
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
