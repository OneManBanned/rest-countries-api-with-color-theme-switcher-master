import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import callAPI from "../js/caller";

export default function Root() {
    const [isLoading, setIsLoading] = useState(true)
    const [listCountryData, setListCountryData] = useState([])
    const [filteredCountryList, setFilterCountryList] = useState([])

    let countryView = filteredCountryList.length > 0
        ? filteredCountryList
        : listCountryData

    useEffect(() => {
        callAPI('https://restcountries.com/v3.1/independent?status=true&fields=name,flags,region,capital,borders,population', setListCountryData)
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
            let target = e.target.value
            return name.toLowerCase() === target.toLowerCase()
        })
        setFilterCountryList(filteredList)
    }

    function emptyValue(e) {
        e.target.value = ''
    }

    return (
        <>
            <header>
                <h1>Where in the world?</h1>
                <fieldset>
                    <label htmlFor="light"></label>
                    <input type="radio" name="theme" id="light" defaultChecked />
                    <label htmlFor="dark"></label>
                    <input type="radio" name="theme" id="dark" />
                </fieldset>
            </header>
            <main >
                <div>
                    <fieldset>
                        <label htmlFor="search"></label>
                        <input
                            onChange={(e) => countrySearch(e)}
                            onBlur={(e) => emptyValue(e)}
                            type="text" name="search" id="search" />
                    </fieldset>
                    <fieldset>
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
                    ? <div>Loading...</div>
                    : countryView.map((country, index) => {
                        return <Link
                            key={index}
                            to={'../detailView/'}
                            state={{
                                country: country.name.common,
                                borders: [country.borders]
                            }}>
                            <div
                                onClick={(e) => detailView(e)}
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
        </>
    );
}
