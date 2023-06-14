import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { callAPI, popFormat } from "../js/caller";


export default function ListView() {
    const [isLoading, setIsLoading] = useState(true)
    const [listCountryData, setListCountryData] = useState([])
    const [filteredCountryList, setFilterCountryList] = useState([])

    let countryView = filteredCountryList.length > 0
        ? filteredCountryList
        : listCountryData

    useEffect(() => {
        callAPI('https://restcountries.com/v3.1/independent?status=true&fields=name,flags,region,capital,borders,population,cca3', setListCountryData)
        setIsLoading(false)
    }, [isLoading])

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

    return (
        <>
            <div className="mainContainer">
                <div className="searchContainer">
                    <fieldset className="searchContainer_country">
                        <label htmlFor="search"></label>
                        <input
                            onChange={(e) => countrySearch(e)}
                            onBlur={(e) => emptyValue(e)}
                            type="text" name="search" id="search" />
                    </fieldset>
                    <fieldset className="searchContainer_region">
                        <select onChange={(e) => filterByRegion(e)} name="region" id="region-select">
                            <option value="">Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </fieldset>
                </div>
                {isLoading
                    ? <div className="loading">Loading...</div>
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
                                        <dd>Population:</dd><dt>{popFormat(country.population)}</dt>
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
            </div>
        </>
    );
}
