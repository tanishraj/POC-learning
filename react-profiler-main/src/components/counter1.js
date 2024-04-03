import React from "react";

class Counter1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div className="counter">
        <div>Count: {this.state.count}</div>
        <div>
          <button
            onClick={() => {
              this.setState({ count: this.state.count + 1 });
            }}
          >
            Incr Counter 1
          </button>
          <button
            onClick={() => {
              this.setState({ count: this.state.count - 1 });
            }}
          >
            Decr Counter 1
          </button>
        </div>
      </div>
    );
  }
}

export default Counter1;
