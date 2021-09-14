import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
