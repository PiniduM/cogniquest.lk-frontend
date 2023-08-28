import NavigationCard from "./NavigationCard";


// not yet implimented

const NavigationMenu = () => {
  const navigationLinks = ["login", "register", "home", "About Us"];

  return (
    <nav className="hhidden fixed top-0 right-0 w-full h-full bg-[rgba(255,255,255,0.7)]">
      {/* <div className="v-backdrop-window"></div> */}
      <div className="flex items-center justify-center mt-14 w-full h-full">
        <div className="v-nav_menu_frame w-[90%] overflow-scroll">
        {/* <div className="v-frame_blur fixed w-full h-full top-0 right-0"></div> */}
          <div
            className={`grid grid-cols-[repeat(${
              navigationLinks.length + 2
            },auto)]  gap-[1rem]`}
          >
            <div className="w-[calc(45vw-10rem)]"></div>
            {navigationLinks.map((link) => (
              <NavigationCard>{link}</NavigationCard>
            ))}
            <div className="w-[calc(45vw-10rem)]"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
