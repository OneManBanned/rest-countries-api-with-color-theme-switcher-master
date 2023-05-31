import { useEffect, useState } from "react"

function App() {
  const [countryData, setCountryData] = useState(null)
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

  console.log(typeof countryData)

  return (
    <>
      <h1>Hello World</h1>
      <ul>
        {/* {!isLoading ?

          countryData.map((country, index) => {
            return <li key={index}>{country[index]}</li>
          })
          : <li>loading...</li>
        } */}
      </ul>
    </>
  )
}

export default App
