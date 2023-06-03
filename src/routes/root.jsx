import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Root() {
    const [listCountryData, setListCountryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        callAPI()
    }, [isLoading])

    function callAPI() {
        fetch('https://restcountries.com/v3.1/all?fields=name,population,flags,capital,region')
            .then(res => res.json())
            .then(data => setListCountryData(data))
        setIsLoading(false)
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
                    <select name="region" id="region-select">
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                {isLoading
                    ? <div>Loading...</div>
                    : listCountryData.map((country, index) => {
                        return <div
                            onClick={(e) => detailView(e)}
                            className="countryContainer" key={index}>
                            <Link to={'/detailView'} state={{ country: country.name.common }}>Link</Link>
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
                        </div>
                    })
                }
            </main>
        </>
    );
}
