interface Iprops {
    name: string;
    lable: string;
    type: string;
}

const TextInput:React.FC<Iprops> = ({name,lable,type}) => {
  return (
    <label className="flex flex-col w-full">
    <span className="text-lg font-semibold mb-1">{lable}</span>
    <input name={name} type={type}  className="p-1 border-2 border-[var(--lightBlue)]"/>
  </label>
  )
}

export default TextInput