/** @format */
import './index.css'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import service from './services/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [filterPerson, setFilterPerson] = useState(persons)
	const [message, setMessage] = useState(null)

	// fetch database to persons Array
	useEffect(() => {
		service.getAllPersons().then((init) => {
			setPersons(init)
		}, [])
	})
	// console.log(persons)

	// Add person to database
	const addPerson = (e) => {
		e.preventDefault()
		const newPerson = {
			name: name,
			number: number,
		}
		const personArray = persons.map((person) => person.name)
		// console.log(personArray

		if (personArray.includes(newPerson.name)) {
			const oldData = persons.filter((e) => e.name === name)
			// const id = oldData[0].id
			const id = oldData.map((e) => e.id)[0]

			// console.log(oldData)
			// console.log(id)

			if (window.confirm(`${name} already in book. Update number?`)) {
				service
					.updatePerson(id, newPerson)
					.then((response) => {
						const newPeople = persons.map((person) =>
							person !== response ? person : response
						)
						setPersons(newPeople)
					})
					.catch((error) => {
						setMessage(error)
						return
					})
				setMessage({ text: `Edited ${newPerson.name}`, type: 'success' })
				setTimeout(() => {
					setMessage(null)
				}, 5000)
				setName('')
				setNumber('')
			}
		} else {
			// console.log(`Name ${newPerson.name} added to book`)
			service
				.createPerson(newPerson)
				.then((response) => setPersons(persons.concat(response)))
				.catch((error) => {
					setMessage(error)
					return
				})
			setMessage({ text: `Added ${newPerson.name}`, type: 'success' })
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	// change handlers
	const handleNameChange = (e) => setName(e.target.value)
	const handleNumberChange = (e) => setNumber(e.target.value)

	const handleFilterChange = (e) => {
		setFilter(e.target.value)
		// console.log(filter)
		setFilterPerson(
			persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase())
			)
		)
		// console.log(filterPerson)
	}

	const newPersonData = {
		name,
		number,
		handleNameChange,
		handleNumberChange,
	}
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter onChange={handleFilterChange} value={filter} />
			<Form addPerson={addPerson} data={newPersonData} />

			<div>debug: {filter}</div>
			{filter === '' ? (
				<Persons
					filterPerson={persons}
					setPersons={setPersons}
					setMessage={setMessage}
				/>
			) : (
				<Persons
					filterPerson={filterPerson}
					setPersons={setPersons}
					setMessage={setMessage}
				/>
			)}
		</div>
	)
}

export default App
