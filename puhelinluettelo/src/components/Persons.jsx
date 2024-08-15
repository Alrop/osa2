/** @format */
import service from '../services/Persons'
// Render persons
function Persons({ filterPerson, setPersons, setMessage }) {
	// desync weirdness when under App. Deleting user causes filter to break/go blank until page refresh
	const delPerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			// console.log(person)
			service
				.deletePerson(person.id)
				.then((response) => {
					setPersons(filterPerson.filter((pers) => pers !== person))
					setMessage({ text: `Removed ${person.name}`, type: 'success' })

					setTimeout(() => {
						setMessage(null)
					}, 5000)
				})
				.catch((_err) => {
					setMessage({
						text: `${person.name} was already removed from database`,
						type: 'error',
					})
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				})
			setPersons(filterPerson.filter((item) => item !== person))
		}
		// console.log('Got to delete')
	}
	return filterPerson.map((person) => (
		<p key={person.id}>
			{person.name + ': ' + person.number}{' '}
			<button onClick={() => delPerson(person)}>delete</button>
		</p>
	))
}

export default Persons
