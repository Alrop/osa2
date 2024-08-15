/** @format */
import axios from 'axios'
import { useEffect, useState } from 'react'

function Country({ data: { name, capital, area, languages, flags } }) {
	const api_key = import.meta.env.VITE_SOME_KEY
	const [weather, setWeather] = useState({})
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital.toString()}&appid=${api_key}&units=metric`
			)
			.then((response) => {
				setWeather(response.data)
			})
		return () => setWeather({})
	}, [capital])

	const localWeather = (weather) => {
		// console.log(weather.weather[0].icon)
		return (
			<>
				<p>
					Temperature: {weather.main.temp} Celcius, feels like{' '}
					{weather.main.feels_like} C
				</p>

				<p>Sky: {weather.weather[0].description}</p>
				<img
					src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					alt={`Weather icon`}
				/>

				<p>
					Wind speed: {weather.wind.speed} m/s at direction {weather.wind.deg}
				</p>
			</>
		)
	}
	return (
		<>
			<h2>{name.common}</h2>
			<p>Capital: {capital}</p>
			<p>Area: {area}</p>
			<p>Languages:</p>
			<ul>
				{Object.keys(languages).map((key, i) => (
					<li key={i}>{languages[key]}</li>
				))}
			</ul>
			<img src={flags.png} alt={`Flag of ${name.common}`} />

			<h3>Weather in {capital.toString()}</h3>

			{Object.keys(weather).length !== 0 ? (
				localWeather(weather)
			) : (
				<p>Unavailable</p>
			)}
		</>
	)
}

export default Country
