import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { callAPI } from '../js/caller';


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
    console.log(countryData)
    return (
        <>
            <Link to={'/'}>Back</Link>
            {isLoading
                ? <div>loading...</div>
                : countryData.map((country, index) => {
                    return <div key={index}>
                        <div>
                            <img src={country.flags.png} alt={country.flags.alt} />
                        </div>
                        <section>
                            <h1>{country.name.common}</h1>
                            <div>
                                <dl>
                                    <div>
                                        <dd>Native Name:</dd>
                                        <dt>{country.name.native}</dt>
                                    </div>
                                    <div>
                                        <dd>Population:</dd>
                                        <dt>{country.population}</dt>
                                    </div>
                                    <div>
                                        <dd>Region:</dd>
                                        <dt>{country.region}</dt>
                                    </div>
                                    <div>
                                        <dd>Sub Region:</dd>
                                        <dt>{country.subregion}</dt>
                                    </div>
                                    <div>
                                        <dd>Capital:</dd>
                                        <dt>{country.capital}</dt>
                                    </div>
                                    <div>
                                        <dd>Top Level Domain:</dd>
                                        <dt>{country.tld}</dt>
                                    </div>
                                    {/* <div>
                                        <dd>Currencies:</dd>
                                        <dt>{Object(country.currencies).keys()}</dt>
                                    </div> */}
                                    {/* <div>
                                        <dd>Languages:</dd>
                                        <dt>{country.languages}</dt>
                                    </div> */}
                                </dl>

                            </div>
                            <ol>
                                {
                                    borderCountries.map((country, index) => {
                                        return <li key={index}><Link
                                            to={`/detailView/${country.cca3}/${country.borders}`}
                                        >{country.name.common}</Link></li>
                                    })
                                }
                            </ol>
                        </section>
                    </div>
                })
            }
        </>
    );
}
