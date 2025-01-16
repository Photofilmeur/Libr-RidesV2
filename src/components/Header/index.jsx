//import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { HiMenuAlt2 } from 'react-icons/hi'
import { motion } from 'framer-motion'
import Image from '../designLayouts/Image'
import { navBarList } from '../../constants/navBarList'
import logo from '../../assets/images/logo.webp'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [sidenav, setSidenav] = useState(false)
  const location = useLocation()
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false)
      } else {
        setShowMenu(true)
      }
    }
    ResponsiveMenu()
    window.addEventListener('resize', ResponsiveMenu)
  }, [])

  return (
    <div className="w-screen h-20 bg-black bg-opacity-70 fixed top-0 z-50  border-b-gray-200 ">
      <nav className="h-full px-10 max-w-screen relative">
        <div className="flex items-center justify-between h-full w-full">
          <div>
            <Link to="/">
              <Image
                className="w-20 object-cover filter invert"
                imgSrc={logo}
              />
            </Link>
          </div>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-0"
              >
                <>
                  {navBarList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className="flex font-title font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#FFFFFF] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#b81717]  md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 "
                      to={link}
                      state={{ data: location.pathname.split('/')[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </>
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="text-white inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-10"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-20 mb-6 inverted-image"
                      src={logo}
                      alt="logo"
                    />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split('/')[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
