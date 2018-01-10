import React, { Component } from "react";
import { render } from "react-dom";
import { DragDropContext } from "react-dnd";
import MultiBackend, { Preview } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import Container from "./Container";
import Box from "./Box";
import "./flowchart.css";

@DragDropContext(MultiBackend(HTML5toTouch))
export default class DragAndDropApp extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      dragTxts: [
        "Product Vision",
        "Product Backlog",
        "Sprint Planning Meeting",
        "Daily Stand-Up Meeting",
        "Sprint Review",
        "Burndown Chart",
        "Sprint Retrospective",
        "Prioritization Meeting"
      ],
      dropTxts: ["", "", "", "", "", "", "", ""],
      allowMultiples: false,
      ans: [0, 1, 2, 3, 4, 5, 6, 7], // position defines drags, value defines drops
      userAns: [null, null, null, null, null, null, null, null],
      isSubmitted: false
    };
    this.state = { ...this.initialState };
  }

  handleDrop = (index, item) => {
    const ua = this.state.userAns;
    const di = item.index;
    this.setState({
      userAns: [...ua.slice(0, di), index, ...ua.slice(di + 1)]
    });
  };

  getDroppedItems = index => {
    const arr = [];
    this.state.userAns.forEach((id, i) => {
      if (id === index) {
        arr.push({
          text: this.state.dragTxts[i],
          isCorrect: id === this.state.ans[i]
        });
      }
    });
    return arr;
  };

  submitAns = () => {
    if (this.state.userAns.indexOf(null) !== -1) {
      alert("Please Complete");
      return;
    }
    this.setState({ isSubmitted: true });
  };

  reset = () => {
    this.setState({ ...this.initialState });
  };

  render() {
    const { dragTxts, dropTxts } = this.state;
    return (
      <div className="flowchart">
        <div className="header">
          <h3>Flow Chart</h3>
        </div>
        <div className="main">
          <div className="container-wrapper">
            <svg width="400" height="250">
              <path
                d="M 5 25 L 360 25"
                id="path101"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 240 35 L 230 35 230 75 240 75"
                id="path102"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 300 35 L 310 35 310 75 300 75"
                id="path103"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 310 55 L 340 55 340 160 300 160"
                id="path104"
                stroke="yellow"
                fill="none"
                strokeDasharray="5"
              />
              <path
                d="M 300 160 L 85 160"
                id="path105"
                stroke="yellow"
                fill="none"
                strokeDasharray="5"
              />
              <path
                d="M 115 160 L 115 5"
                id="path106"
                stroke="yellow"
                fill="none"
                strokeDasharray="5"
              />
              <path
                d="M 82 20 L 85 25 82 30"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 163 20 L 165 25 163 30"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 237 20 L 240 25 237 30"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 322 20 L 325 25 322 30"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 237 30 L 240 35 237 40"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 302 70 L 300 75 302 80"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 302 155 L 300 160 302 165"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 147 155 L 145 160 147 165"
                id="path107"
                stroke="yellow"
                fill="none"
              />
              <path
                d="M 110 45 L 115 40 120 45"
                id="path107"
                stroke="yellow"
                fill="none"
              />
            </svg>
            {dropTxts.map((txt, index) => {
              const droppedItems = this.getDroppedItems(index);
              return (
                <Container
                  key={index}
                  name={txt}
                  onDrop={item => this.handleDrop(index, item)}
                  index={index}
                  droppedItems={droppedItems}
                  isSubmitted={this.state.isSubmitted}
                />
              );
            })}
          </div>
          <div className="box">
            {dragTxts.map(
              (txt, index) =>
                this.state.userAns[index] === null ? (
                  <Box key={index} name={txt} index={index} />
                ) : null
            )}
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={this.submitAns}>
            Done
          </button>
          <button className="btn btn-secondary" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
