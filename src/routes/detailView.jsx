import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import callAPI from '../js/caller';

export default function DetailView() {

    const params = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [countryData, setCountryData] = useState([])
    const [borderCountries, setBorderCountries] = useState([])

    useEffect(() => {
        callAPI(`https://restcountries.com/v3.1/alpha?codes=${params.country}&fields=name,population,flags,capital,region,subregion,currencies,languages,tld`, setCountryData)
        let borderApiCall = String(params.borders)
        if (borderApiCall !== '' && params.borders) {
            callAPI(`https://restcountries.com/v3.1/alpha?codes=${borderApiCall}&fields=name,borders,cca3`, setBorderCountries)
        }
        setIsLoading(false)
    }, [isLoading, params])

    return (
        <main>
            <Link to={'/'}>Back</Link>
            {isLoading
                ? <div>loading...</div>
                : countryData.map((country, index) => {
                    return <div key={index}>
                        <h1>{country.name.common}</h1>
                        <ol>
                            {
                                borderCountries.map((country, index) => {
                                    return <li key={index}><Link
                                        to={`/${country.cca3}/${country.borders}`}
                                    >{country.name.common}</Link></li>
                                })
                            }
                        </ol>
                    </div>
                })
            }
        </main>
    );
}
