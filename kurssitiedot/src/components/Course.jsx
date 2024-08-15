/** @format */

// eslint-disable-next-line react/prop-types
const Course = ({ course }) => {
	// console.log(course.parts);
	return (
		<>
			<Header courses={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} /> 

		</>
	);
};
const Header = ({ courses }) => {
	// console.log(courses.name);
	return <h1>{courses.name}</h1>;
};

const Content = ({ parts }) => {
	// console.log(parts);
	return  (
		<>
		{parts.map((part) => (
			<Part key={part.name} part={part}		/>
		))}
</>
)
}
const Part = ({part}) => {
	// console.log(part.name, part.exercises);
	return (
		<p>
			{part.name}: {part.exercises}
		</p>
	);
};

const Total = ({parts}) => {
	// console.log(parts);
	// console.log(parts.reduce((total, { exercises }) => total + exercises, 0));
	const sum = parts.reduce((total, { exercises }) => total + exercises, 0);
	return <>Total exercises: {sum}</>;
};
export default Course;