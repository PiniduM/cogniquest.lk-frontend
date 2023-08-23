import React from 'react'

import Image from "next/image"

import profileIconImg from "@/public/images/profileIcon.png"

const ProfileMenu = () => {
  return (
    <div>
        <div className='p-1 border-2 border-[rgb(6,108,224,0.3)] rounded-[0.4rem]'>
        <Image src={profileIconImg} alt='profile' width={24}/>
        </div>
    </div>
  )
}

export default ProfileMenu