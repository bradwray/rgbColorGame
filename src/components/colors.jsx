import React, { Component } from "react";

class Colors extends Component {
  state = {
    colors: [],
    winner: undefined,
    headingColor: "#000",
    size: undefined,
    num: undefined,
    points: 0
  };

  componentDidMount() {
    this.handleNewColors(2);
  }

  handleNewColors = (num, size) => {
    let colors = [];
    for (let i = 0; i < num; i++) {
      colors.push({
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255)
      });
    }
    let winner = Math.floor(Math.random() * colors.length);
    let ans = colors[winner];
    this.setState({
      colors: colors,
      winner: winner,
      answer: `rgb(${ans.r}, ${ans.g}, ${ans.b})`,
      headingColor: "#000",
      size: size,
      num: num
    });
  };

  handleDecision = c => {
    let pts = 0;
    if (this.state.colors.length === 2) {
      pts = 1;
    }
    if (this.state.colors.length === 4) {
      pts = 5;
    }
    if (this.state.colors.length === 8) {
      pts = 15;
    }
    let winningColors = this.state.colors.map(() => this.state.answer);
    if (`rgb(${c.r}, ${c.g}, ${c.b})` === this.state.answer) {
      this.setState({
        headingColor: this.state.answer,
        colors: winningColors
      });
      setTimeout(() => {
        if (window.confirm("Great job you're right! +" + pts + "pts")) {
          this.handleNewColors(this.state.num, this.state.size);
        }

        this.setState({
          points: this.state.points + pts
        });
      }, 250);
    } else {
      this.setState({
        points: this.state.points - pts,
        headingColor: this.state.answer,
        colors: winningColors
      });
      setTimeout(() => {
        if (window.confirm("Incorrect -" + pts + "pts")) {
          this.handleNewColors(this.state.num, this.state.size);
        }
      }, 250);
    }
  };

  render() {
    console.log(this.state.points);
    return (
      <div>
        <div className="stripe">
          <span className="message">
            <div className="score">{this.state.points} Pts</div>
          </span>
          <button
            className="mode btn btn-success selected"
            onClick={() => this.handleNewColors(2)}
          >
            Easy +/- 1pts
          </button>
          <button
            className="mode selected btn btn-warning"
            onClick={() => this.handleNewColors(4)}
          >
            Medium +/- 5pts
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleNewColors(8)}
          >
            Hard🔥 +/- 15pts
          </button>
        </div>
        <h1
          className="heading-text"
          style={{ backgroundColor: this.state.headingColor }}
        >
          Which color does{" "}
          <span className="color-display">{this.state.answer}</span>
          make?
        </h1>
        <div className="container">
          {this.state.colors.map(c => {
            return (
              <div
                className="square"
                style={{ backgroundColor: `rgb(${c.r},${c.g},${c.b})` }}
                onClick={() => this.handleDecision(c)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Colors;
