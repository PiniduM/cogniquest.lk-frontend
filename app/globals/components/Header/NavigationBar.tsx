interface Iprops {

}

const NavigationBar:React.FC<Iprops> = () => {
  return (
    <nav className='flex text-[#066AE0] font-semibold text-lg gap-2'>
        <span className='v-nav_link'>Home</span>
        <span className='v-nav_link'>Competitions</span>
        <span className='v-nav_link'>About us</span>
    </nav>
  )
}

export default NavigationBar