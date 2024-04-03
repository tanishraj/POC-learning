import React from "react";

const Counter2 = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="counter">
      <div>Count: {count}</div>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Incr Counter 2
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Decr Counter 2
        </button>
      </div>
    </div>
  );
};

export default Counter2;
