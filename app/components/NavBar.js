import React from 'react'
import { ThemeConsumer } from '../context/theme'

export default function NavBar() {
   
        return (
            <ThemeConsumer>
                {
                    (
                        { theme, toggleTheme}
                    ) => (
                        <nav>
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