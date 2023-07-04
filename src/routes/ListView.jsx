import { useEffect, useState, useContext } from "react"
import Select from "react-select";
import { Link } from "react-router-dom";
import { callAPI } from "../js/caller";
import { ThemeContext } from "../App";


export default function ListView() {

    const { theme } = useContext(ThemeContext)

    const [isLoading, setIsLoading] = useState(true)
    const [listCountryData, setListCountryData] = useState([])
    const [filteredCountryList, setFilterCountryList] = useState([])

    const options = [
        { value: "Africa", label: "Africa" },
        { value: "Americas", label: "America" },
        { value: "Asia", label: "Asia" },
        { value: "Europe", label: "Europe" },
        { value: "Oceania", label: "Oceania" },
    ]

    const colorStyles = theme === 'light' ? {
        control: (styles, state) => ({
            ...styles,
            backgroundColor: 'white',
            minHeight: '3.5rem',
            paddingInline: '.75rem',
            fontWeight: '600',
            border: 'none',
            fontSize: '.9rem',
            outline: state.isFocused ? '2px solid blue' : 'none',
            outlineOffset: state.isFocused ? '2px' : 'none',
            boxShadow: '0px 0px 6px -1px hsl(0, 0%, 52%)',
        }),
        indicatorSeparator: (styles) => {
            return {
                ...styles,
                display: 'none'
            }
        }
    }
        :
        {
            control: (styles, state) => ({
                ...styles,
                backgroundColor: 'hsl(209, 23%, 22%)',
                outline: state.isFocused ? '2px solid blue' : 'none',
                outlineOffset: state.isFocused ? '2px' : 'none',
                minHeight: '3.5rem',
                border: 'none',
                paddingInline: '.75rem',
                fontWeight: '600',
                fontSize: '.9rem',

            }),
            placeholder: (styles) => {
                return {
                    ...styles,
                    color: 'white'
                }
            },
            indicatorSeparator: (styles) => {
                return {
                    ...styles,
                    display: 'none'
                }
            },
            menu: (styles) => {
                return {
                    ...styles,
                    backgroundColor: 'hsl(209, 23%, 22%)',

                }
            },
            singleValue: (styles) => {
                return {
                    ...styles,
                    color: 'white'
                }
            },
            option: (styles, state) => {
                return {
                    ...styles,
                    backgroundColor: state.isFocused ? 'blue' : 'hsl(209, 23%, 22%)',
                }
            }

        }


    let countryView = filteredCountryList.length > 0
        ? filteredCountryList
        : listCountryData

    useEffect(() => {
        callAPI('https://restcountries.com/v3.1/independent?status=true&fields=name,flags,region,capital,borders,population,cca3', setListCountryData)
        setIsLoading(false)
    }, [isLoading])

    function filterByRegion(e) {
        console.log(e.value, listCountryData)
        const filteredList = listCountryData.filter(country => {
            return country.region === e.value
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

    return (
        <>
            <div className="mainContainer">
                <div className="searchContainer">
                    <fieldset className="searchContainer_country">
                        <label htmlFor="search"></label>
                        <input
                            onChange={(e) => countrySearch(e)}
                            onBlur={(e) => emptyValue(e)}
                            placeholder="Search for a country..."
                            aria-label="search"
                            maxLength='32'
                            type="search" name="search" id="search" />
                    </fieldset>
                    <fieldset className="searchContainer_region">
                        <Select
                            options={options}
                            styles={colorStyles}
                            placeholder="Filter by Region"
                            onChange={(e) => filterByRegion(e)}
                        />
                    </fieldset>
                </div >
                {
                    isLoading
                        ? <div className="loading"></div>

                        : countryView.map((country, index) => {
                            return <Link
                                key={index}
                                to={`detailView/${country.cca3}/${country.borders}`}
                                className="countryContainer"
                            >
                                <img src={country.flags.png} alt={country.flags.alt} loading="lazy" />
                                <div>
                                    <h2 className="countryContainer-heading">{country.name.common}</h2>
                                    <dl className="countryContainer-stats">
                                        <div>
                                            <dd>Population:</dd><dt>{Number(country.population).toLocaleString()}</dt>
                                        </div>
                                        <div>
                                            <dd>Region:</dd><dt>{country.region}</dt>
                                        </div>
                                        <div>
                                            <dd>Capital:</dd><dt>{country.capital[0]}</dt>
                                        </div>
                                    </dl>
                                </div>
                            </Link>
                        })
                }
            </div >
        </>
    );
}
