import React from "react";
import "./styles.css";
import Counter1 from "./components/counter1";
import Counter2 from "./components/counter2";
const Profiler = React.unstable_Profiler;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.metrics1Ref = React.createRef();
    this.metrics2Ref = React.createRef();
  }

  callback1(self) {
    return (id, phase, actualTime, baseTime, startTime, commitTime) => {
      this.metrics1Ref.current.innerHTML = `
            Id: "${id}", Phase: "${phase}", Actual Time:${actualTime}, Base Time: ${baseTime}, Start Time:${startTime}, Commit Time: ${commitTime}
            `;
    };
  }

  callback2(self) {
    return (id, phase, actualTime, baseTime, startTime, commitTime) => {
      this.metrics2Ref.current.innerHTML = `
            Id: "${id}", Phase: "${phase}", Actual Time:${actualTime}, Base Time: ${baseTime}, Start Time:${startTime}, Commit Time: ${commitTime}
            `;
    };
  }

  render() {
    return (
      <div className="main">
        <div className="section">
          <div className="section-head">Counter1 Component Example</div>
          <div className="section-body">
            <div className="metrics">
              <div className="metrics-head">Time Metrics</div>
              <div className="metrics-body" ref={this.metrics1Ref}></div>
            </div>
            <Profiler id="Counter1" onRender={this.callback1(this)}>
              <Counter1 />
            </Profiler>
          </div>
        </div>
        <div className="section">
          <div className="section-head">Counter2 Component Example</div>
          <div className="section-body">
            <div className="metrics">
              <div className="metrics-head">Time Metrics</div>
              <div className="metrics-body" ref={this.metrics2Ref}></div>
            </div>
            <Profiler id="Counter2" onRender={this.callback2(this)}>
              <Counter2 />
            </Profiler>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
