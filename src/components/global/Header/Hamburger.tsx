interface Iprops {
  clickTrigger: () => void;
}

const Hamburger: React.FC<Iprops> = (props) => {
  const { clickTrigger } = props;

  const handleClick = () => {
    clickTrigger();
  };
  return (
    <div onClick={handleClick} className="flex flex-col gap-1">
      <div className="w-5 h-[3px] bg-[var(--blue)]"></div>
      <span className="w-5 h-[3px] bg-[var(--blue)]"></span>
      <span className="w-5 h-[3px] bg-[var(--blue)]"></span>
    </div>
  );
};

export default Hamburger;
