/** @format */
import service from '../services/Persons'

function Form({ addPerson, data }) {
	// console.log({ personArray })

	return (
		<form onSubmit={addPerson}>
			<br />
			<div>Add new:</div>
			<div>
				Name:
				<input name={data.name} onChange={data.handleNameChange} />
			</div>
			<div>
				Number:
				<input number={data.number} onChange={data.handleNumberChange} />
			</div>
			<div>
				<button type='submit'>Submit</button>
			</div>
			{/* {console.log({ data })} */}
		</form>
	)
}

export default Form
