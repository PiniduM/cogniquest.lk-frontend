interface Iprops {
    clickTrigger : () => void;
}

const Hamburger:React.FC<Iprops> = (props) => {
    const {clickTrigger} = props;

    const handleClick = () => {
        clickTrigger();
    }
  return (
    <div onClick={handleClick} className="flex flex-col gap-1">
        <span className="w-5 h-[3px] bg-[#066AE0]"></span>
        <span className="w-5 h-[3px] bg-[#066AE0]"></span>
        <span className="w-5 h-[3px] bg-[#066AE0]"></span>
    </div>
  )
}

export default Hamburger