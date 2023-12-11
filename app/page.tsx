"use client";

import robotVector from "../public/images/robot_image.png";
import { AuthContext } from "../src/contexts/AuthContext";
// import heroCover from "@public/images/hero/hero_cover.svg";
import Image from "next/image";
import { useContext } from "react";
import Button from "../src/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  const { loginToken } = useContext(AuthContext);

  return (
    <>
      <section className="dark:text-white text-black flex md:flex-row flex-col justify-evenly items-center py-10 mb-10 hero ">
        <div className="relative md:w-2/4 w-full">
          <div className="image_container max-w-3xl m-auto">
            <Image
              className="w-full h-full"
              src={"/images/hero/hero_content.png"}
              alt="hero-pic-cover"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="md:w-1/2 w-full items-center flex flex-col text-center">
          <h1 className="text-5xl mb-6 font-semibold md:mr-3">
            If you can dream it you can do it
          </h1>
          <p className="text-2xl font-normal text-gray-800 dark:text-white mb-5">
            Ignite your creativity
            <br /> with project based
            <br /> competitions
          </p>
          <Button
            onClick={() => {}}
            className="text-gray-800 dark:text-white border-2 border-x-cyan-50"
            style={{
              background:
                "linear-gradient(rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
              borderRadius: 45,
            }}
            icon={<FontAwesomeIcon icon={faChevronRight} />}
          >
            Read More
          </Button>
        </div>
      </section>
      <section className="w-full flex justify-evenly items-center md:flex-row flex-col pb-12">
        <div>
          <Image src={robotVector} alt="teamwork" width={400} />
        </div>
        <div className="flex md:justify-end flex-col md:items-end items-center md:w-auto w-full justify-center">
          <h1 className="text-4xl mb-6 font-semibold dark:text-white text-black">
            A platform to ignite
            <br />
            <span className=" w-full flex md:justify-end justify-center">
              <span className="text-5xl text-yellow-400">creativity</span>
            </span>
          </h1>
          <p className="text-xl leading-6 font-normal text-gray-800 dark:text-white md:text-right text-center mb-5">
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
          <Button
            onClick={() => {}}
            className="text-gray-800 dark:text-white"
            icon={<FontAwesomeIcon icon={faChevronRight} />}
            style={{
              borderRadius: 45,
              background:
                "linear-gradient(rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
              maxWidth: 500,
            }}
          >
            Competitions
          </Button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
