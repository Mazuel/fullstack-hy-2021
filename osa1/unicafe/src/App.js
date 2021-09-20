import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const getTotal = () => {
    return props.good + props.neutral + props.bad;
  };

  const getAverage = () => {
    return (props.good - props.bad) / getTotal();
  };

  const getPercent = () => {
    return (props.good / getTotal()) * 100;
  };

  if (getTotal() === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          <StatisticsLine text="Good" value={props.good} />
          <StatisticsLine text="Neutral" value={props.neutral} />
          <StatisticsLine text="Bad" value={props.bad} />
          <StatisticsLine text="All" value={getTotal()} />
          <StatisticsLine text="Average" value={getAverage()} />
          <StatisticsLine text="Percent" value={getPercent()} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => {
    setGood(good + 1);
  };
  const updateNeutral = () => {
    setNeutral(neutral + 1);
  };
  const updateBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => updateGood()} text="Good" />
      <Button handleClick={() => updateNeutral()} text="Neutral" />
      <Button handleClick={() => updateBad()} text="Bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
