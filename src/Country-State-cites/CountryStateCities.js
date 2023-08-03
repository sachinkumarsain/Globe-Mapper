import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Style.css"

function CountryStateCities() {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cites, setCites] = useState([])
  const [selectState, setSelectState] = useState("")
  const [selectCountry, setSelectCountry] = useState("")
  const [selectCity, setSelectCity] = useState("")
  const [image, setImage] = useState({})
  useEffect(() => {
    axios.get('https://api.countrystatecity.in/v1/countries',
      {
        headers: {
          'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
        }
      })
      .then((result) => {
        console.log(result.data)
        setCountries(result.data)
      })

  }, [])


  useEffect(() => {
    if (selectCountry.length > 0) {
      axios.get(`https://api.countrystatecity.in/v1/countries/${selectCountry}/states/`,
        {
          headers: {
            'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
          }
        })
        .then((result) => {
          console.log(result.data)
          setStates(result.data)
        })
    }
  }, [selectCountry])



  useEffect(() => {
    if (selectCountry.length > 0 && selectState.length > 0) {
      axios.get(`https://api.countrystatecity.in/v1/countries/${selectCountry}/states/${selectState}/cities`,
        {
          headers: {
            'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
          }
        })
        .then((result) => {
          setCites(result.data)
        })
    }
  }, [selectState])
  // useEffect(() => {
  //   axios.get(` https://api.teleport.org/api/urban_areas/slug:${selectCity}/images/`)
  //     .then((result) => {
  //       console.log(result.data)
  //       setImage(result.data)
  //     })
  // }, [selectCity])
  console.log(selectState)

  console.log(states)
  // console.log(countries)
  console.log(cites)
  console.log(image)

  console.log(selectCountry)

  return (
    <>
      <div className='wapper'>

        <h1><span className='first'>Globe</span><span className='second'>Mapper</span></h1>

        <div className='total'>

          <select defaultValue={"select Country"} onChange={(e) => { setSelectCountry(e.target.value) }}>
            <option style={{ backgroundColor: "gray", color: "white" }} selected value=" select Country" disabled >Select Country</option>
            {
              countries.map((country) => {
                return <option value={country.iso2} >
                  {country.name}
                </option>
              })
            }
          </select>


          <select defaultValue={"Select State"} onChange={(e) => setSelectState(e.target.value)}>
            <option value="Select State" selected disabled>Select state</option>
            {
              states.map((state) => {
                if (selectCountry.length > 0) {
                  return <option value={state.iso2}>{state.name}</option>
                }
                else {
                  return <option value="NotFound">Not Found</option>
                }

              })
            }
          </select>


          <select defaultValue={"Select Value"} onChange={(e) => setSelectCity(e.target.value)}>
            <option selected disabled value={"Select value "}>Select City</option>
            {
              cites.map((city) => {
                if (selectCountry.length > 0 && selectState.length > 0) {
                  return <option value={city.name}>{city.name}</option>
                }

              })
            }
          </select>

        </div>
        <div className='cityImages'>
          {/* <img src={image._links.curies[0].href} alt='images'></img> */}
        </div>
      </div>

    </>
  )
}

export default CountryStateCities