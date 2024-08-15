/** @format */

function Filter({ onChange, value }) {
	return (
		<div>
			{/* {console.log(onChange, value)} */}
			Filter by: <input onChange={onChange} value={value} />
		</div>
	)
}
export default Filter
