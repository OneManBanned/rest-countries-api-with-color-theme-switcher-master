import React from "react"


function Navbar(props) {
    console.log(props.theme)
    function toggleTheme() {
        props.setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <header >
            <nav>
                <h1>Where in the world?</h1>
                <fieldset>
                    <input
                        type="checkbox"
                        name="theme"
                        id='theme'
                        onClick={toggleTheme}
                    />
                    <label htmlFor="theme"><span>Dark Mode</span></label>
                </fieldset>
            </nav>
        </header >
    )
}

export default Navbar
