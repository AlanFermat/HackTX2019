import React, {
  Component
} from 'react';

class Counter extends Component {
  style = {
    fontSize: 30,
    fontWeight: "bold",
  };

  render() {
    return (
      <div>
        {this.props.children}
        <span
          style={this.style}
            className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.props.onModify(this.props.counter, true)}
          className="btn btn-secondary btn-sm m-2">
          Increment
        </button>
        <button
          onClick={() => this.props.onModify(this.props.counter, false)}
          className="btn btn-secondary btn-sm m-2">
          Decrement
        </button>
        <button
        onClick={() => this.props.onDelete(this.props.counter.id)}
        className="btn btn-danger btn-sm m-2">
        Delete
        </button>
      </div>
    );
  }

  formatCount() {
    return this.props.counter.value === 0 ? <h1>Zero</h1> : <h1>{this.props.counter.value}</h1>;
  }

  getBadgeClasses() {
    let spanClass = "badge badge-";
    spanClass += (this.props.counter.value === 0) ? "warning m-2" : "primary m-4";
    return spanClass;
  }
}

export default Counter;
