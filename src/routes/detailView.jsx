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

    console.log(countryData[0])

    return (
        <>
            {isLoading
                ? <div>loading...</div>
                : countryData.map((country, index) => {
                    return <div key={index}
                        className='detailView'>
                        <Link
                            to={'/'}
                            className='backBtn'
                        >Back</Link>
                        <div className='imgContainer'>
                            <img src={country.flags.png} alt={country.flags.alt} />
                        </div>
                        <section>
                            <h1>{country.name.common}</h1>
                            <div>
                                <dl>
                                    <div>
                                        <dd>Native Name:</dd>
                                        {Object.keys(country.name.nativeName).map((val, index) => {
                                            if (index === 0) {
                                                return <dt>{country.name.nativeName[val].common}</dt>
                                            }
                                        })}
                                    </div>
                                    <div>
                                        <dd>Population:</dd>
                                        <dt>{Number(country.population).toLocaleString()}</dt>
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
                                        <dt>{country.capital[0]}</dt>
                                    </div>
                                    <div className='topLevel'>
                                        <dd>Top Level Domain:</dd>
                                        <dt>{country.tld[0]}</dt>
                                    </div>
                                    <div>
                                        <dd>Currencies:</dd>
                                        <dt>{Object.keys(country.currencies).map((val, index, arr) => {
                                            if (index !== arr.length - 1) {
                                                return <span key={index}>{`${country.currencies[val].name}, `}</span>
                                            } else {
                                                return <span key={index}>{`${country.currencies[val].name}`}</span>
                                            }
                                        })}</dt>
                                    </div>
                                    <div>
                                        <dd>Languages:</dd>
                                        <dt>{Object.keys(country.languages).map((val, index, arr) => {
                                            if (index !== arr.length - 1) {
                                                return <span key={index}>{`${country.languages[val]}, `}</span>
                                            } else {
                                                return <span key={index}>{`${country.languages[val]}`}</span>
                                            }
                                        })}</dt>
                                    </div>
                                    <div className='bordering'>
                                        <dd>Border Countries</dd>
                                        <dt>
                                            {
                                                borderCountries.map((country, index) => {
                                                    return <span key={index}><Link
                                                        className='spanLink'
                                                        to={`/detailView/${country.cca3}/${country.borders}`}
                                                    >{country.name.common}</Link></span>
                                                })
                                            }
                                        </dt>
                                    </div>
                                </dl>
                            </div>
                        </section>
                    </div>
                })
            }
        </>
    );
}
