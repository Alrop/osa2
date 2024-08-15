/** @format */

function Search({ countries, search }) {
	const countrySearch = (search) => {
		setFilter(search.target.value)
		console.log(filter)
		setCountriesFiltered(
			countries.filter((country) =>
				country.name.common
					.toLowerCase()
					.includes(search.target.value.toLowerCase())
			)
		)
	}
	return <div>Filtered list of countries</div>
}

export default Search
