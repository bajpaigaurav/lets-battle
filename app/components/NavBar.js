import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import {  NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../context/theme'

const activeStyle = {
    color: 'rgb(187,46,31)'
}

export default function NavBar() {
   
        return (
            <ThemeConsumer>
                {
                    (
                        { theme, toggleTheme}
                    ) => (
                        <nav className='row space-between'>
                            <ul className='row nav'>

                                <li>
                                    <NavLink activeStyle={activeStyle} exact to='/' className='nav-link'>Popular</NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={activeStyle} to='/battle' className='nav-link'>Battle</NavLink>
                                </li>
                            </ul>
                            <button
                            style={{fontSize: 30}}
                            className='btn-clear'
                            onClick={toggleTheme}
                            >
                                { theme === 'light' ? '🔦' :'💡' }
                            </button>
                        </nav>
                    )}
            </ThemeConsumer>
        )

}