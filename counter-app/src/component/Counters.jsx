import React, {
  Component
} from 'react';

import Counter from './Counter';

const COUNTERS =  [
  {id: 1, value: 0},
  {id: 2, value: 0},
];

class Counters extends Component {
  state = {
    counters: COUNTERS
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({counters});
  };

  handleModifyCount = (counter, increment) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter};
    counters[index].value = increment
      ? counters[index].value + 1
      : Math.max(counters[index].value - 1, 0);
    this.setState({counters});
  };

  handleReset = () => {
    const counters = COUNTERS;
    this.setState({counters});
  };

  render() {
    return (
      <div>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={this.handleReset}>
        Reset
      </button>
        {this.state.counters.map(counter =>
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            onModify={this.handleModifyCount}
            counter={counter}>
          <h4>Counter #{counter.id} </h4>
          </Counter>
        )}
      </div>
    );
  }
}


export default Counters;
