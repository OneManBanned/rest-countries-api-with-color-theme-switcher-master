import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function DetailView() {
    let { state } = useLocation()
    const [countryData, setCountryData] = useState([])

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${state.country.toLowerCase()}`)
            .then(res => res.json())
            .then(data => setCountryData(data))
    }, [])

    return (
        <>
            <h1>Hello World</h1>
            <Link to={'/'}>Back</Link>
            <p>{state.country}</p>
        </>
    );
}
