interface Iprops {

}

const NavigationBar:React.FC<Iprops> = () => {
  return (
    <nav className='flex text-[var(--blue)] font-semibold text-lg gap-2'>
        <span className='v-nav_link text-md'>Home</span>
        <span className='v-nav_link'>Competitions</span>
        <span className='v-nav_link'>About us</span>
    </nav>
  )
}

export default NavigationBar