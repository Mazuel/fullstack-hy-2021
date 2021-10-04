const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.header}</h2>;
};

const Content = (props) => {
  const total = props.parts.reduce(function (a, b) {
    return a + b.exercises;
  }, 0);
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part} />
      ))}
      <b>total of {total} exercises</b>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

export default Course;
