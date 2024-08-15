/** @format */

import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/CountryData'

function App() {
	const [countries, setCountries] = useState([])
	const [countriesFiltered, setCountriesFiltered] = useState([])
	const [filter, setFilter] = useState('')
	const [countryShown, setCountryShown] = useState({})

	// fetch countries//
	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((response) => {
				setCountries(response.data)
			})
	}, [])

	//set showcase country data
	useEffect(() => {
		setCountryShown(
			countriesFiltered.length === 1 ? { ...countriesFiltered[0] } : {}
		)
	}, [filter])

	// filter through countries
	const countrySearch = (e) => {
		setFilter(e.target.value)
		// console.log(filter)
		setCountriesFiltered(
			countries.filter((country) =>
				country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
			)
		)
	}
	// render filtered countries
	const countriesShow = () => {
		if (Object.keys(countryShown).length === 0) {
			return countriesFiltered.map((country, i) => (
				<p key={i}>
					{country.name.common}
					<button onClick={() => setCountryShown(country)}>show</button>
				</p>
			))
		}
	}

	// console.log(countriesFiltered)
	// console.log(countriesFiltered.length)
	// console.log(JSON.stringify(countryShown))
	// console.log(Object.keys(countryShown).length)

	return (
		<>
			Search for country: <input onChange={countrySearch} e={filter} />
			{countriesFiltered.length > 10 ? (
				<p>Too many results, refine search</p>
			) : (
				countriesShow()
			)}
			{countryShown.name && <Country data={countryShown} />}
		</>
	)
}

export default App
