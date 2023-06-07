import { useEffect, useState, createContext } from "react"
import { Link } from "react-router-dom";
import callAPI from "../js/caller";
import '@fontsource/roboto/300.css';
import CssBaseline from '@mui/material/CssBaseline';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const ThemeContext = createContext(null);

export default function Root() {
    const [isLoading, setIsLoading] = useState(true)
    const [listCountryData, setListCountryData] = useState([])
    const [filteredCountryList, setFilterCountryList] = useState([])
    const [theme, setTheme] = useState('light')

    let countryView = filteredCountryList.length > 0
        ? filteredCountryList
        : listCountryData

    useEffect(() => {
        callAPI('https://restcountries.com/v3.1/independent?status=true&fields=name,flags,region,capital,borders,population,cca3', setListCountryData)
        setIsLoading(false)
    }, [isLoading])

    useEffect(() => {

    }, [filteredCountryList])

    function filterByRegion(e) {
        const filteredList = listCountryData.filter(country => {
            return country.region === e.target.value
        })
        setFilterCountryList(filteredList)
    }

    function countrySearch(e) {
        const filteredList = listCountryData.filter(country => {
            let name = country.name.common
            name = name.toLowerCase()
            let target = e.target.value
            let regex = new RegExp(`^${target.toLowerCase()}`)
            return regex.test(name)
        })
        setFilterCountryList(filteredList)
    }

    function emptyValue(e) {
        e.target.value = ''
    }

    function toggleTheme() {
        setTheme(curr => curr === 'light' ? 'dark' : 'light')
    }

    console.log(theme)

    return (
        <>
            <CssBaseline />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>

                <header >
                    <h1>Where in the world?</h1>
                    <fieldset>
                        <label htmlFor="light"></label>
                        <input type="checkbox" onClick={toggleTheme} name="theme" />
                    </fieldset>
                </header>
                <main id={theme}>
                    <div className="search-container">
                        <fieldset>
                            <label htmlFor="search"></label>
                            <input
                                onChange={(e) => countrySearch(e)}
                                onBlur={(e) => emptyValue(e)}
                                type="text" name="search" id="search" />
                        </fieldset>
                        {/* <fieldset>
                        <select onChange={(e) => filterByRegion(e)} name="region" id="region-select">
                            <option value="">Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </fieldset> */}
                        <FormControl className="formControl" fullWidth>
                            <InputLabel id="region filter">Filter by Region</InputLabel>
                            <Select
                                labelId="region filter"
                                id="demo-simple-select"
                                label="region-select"
                                onChange={(e) => filterByRegion(e)}
                            >
                                <MenuItem value='Africa'>Africa</MenuItem>
                                <MenuItem value='Americas'>Americas</MenuItem>
                                <MenuItem value='Asia'>Asia</MenuItem>
                                <MenuItem value='Europe'>Europe</MenuItem>
                                <MenuItem value='Oceania'>Oceania</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {isLoading
                        ? <div>Loading...</div>
                        : countryView.map((country, index) => {
                            return <Link
                                key={index}
                                to={`/${country.cca3}/${country.borders}`}
                            >
                                <div
                                    className="countryContainer" >
                                    <img className="countryContainer-flag" src={country.flags.png} alt={country.flags.alt} />
                                    <div>
                                        <h2 className="countryContainer-heading">{country.name.common}</h2>
                                        <dl className="countryContainer-stats">
                                            <div>
                                                <dd>Population:</dd><dt>{country.population}</dt>
                                            </div>
                                            <div>
                                                <dd>Region:</dd><dt>{country.region}</dt>
                                            </div>
                                            <div>
                                                <dd>Capital:</dd><dt>{country.capital}</dt>
                                            </div>
                                        </dl>
                                    </div>
                                </div></Link>
                        })
                    }
                </main>
            </ThemeContext.Provider>
        </>
    );
}
