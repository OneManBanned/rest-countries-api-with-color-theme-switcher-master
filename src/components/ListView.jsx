import { useEffect, useState } from 'react'

function ListView() {

    const [countryData, setCountryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        callAPI()

    }, [isLoading])

    function callAPI() {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountryData(data))
        setIsLoading(false)
    }

    return (
        <>
            {isLoading
                ? <div>Loading...</div>
                : countryData.map((country, index) => {
                    return <div
                        onClick={(e) => detailView(e)}
                        className="countryContainer" key={index}>
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
        </>
    )
}

export default ListView

