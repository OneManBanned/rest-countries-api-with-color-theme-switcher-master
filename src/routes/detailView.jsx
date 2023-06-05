import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import callAPI from '../js/caller';

export default function DetailView() {
    let { state } = useLocation()

    const [isLoading, setIsLoading] = useState(true)
    const [countryData, setCountryData] = useState([])
    const [borderCountries, setBorderCountries] = useState([])

    useEffect(() => {
        callAPI(`https://restcountries.com/v3.1/name/${state.country.toLowerCase()}?fields=name,population,flags,capital,region,subregion,currencies,languages,tld`, setCountryData)
        if (String(state.borders) !== '') {
            callAPI(`https://restcountries.com/v3.1/alpha?codes=${String(state.borders)}&fields=name`, setBorderCountries)
        }
        setIsLoading(false)
    }, [isLoading])
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
                                    return <li key={index}>{country.name.common}</li>
                                })
                            }
                        </ol>
                    </div>
                })
            }
        </main>
    );
}
