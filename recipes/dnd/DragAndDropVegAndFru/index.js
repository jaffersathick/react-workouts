import React, { Component } from "react";
import { render } from "react-dom";
import { DragDropContext } from "react-dnd";
import MultiBackend, { Preview } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import Container from "./Container";
import Box from "./Box";
import "./style.css";

@DragDropContext(MultiBackend(HTML5toTouch))
export default class DragAndDropApp extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      dragTxts: [
        "apple",
        "banana",
        "grape",
        "pineapple",
        "strawberry",
        "brinjal",
        "carrot",
        "cauliflower",
        "onion",
        "tomato"
      ],
      dropTxts: ["", ""],
      allowMultiples: true,
      ans: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // position defines drags, value defines drops
      userAns: [null, null, null, null, null, null, null, null, null, null],
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
    const containerWrapperStyle = {
      display: "flex",
      justifyContent: "center",
      height: 280
    };

    return (
      <div className="food">
        <div className="header">
          <h3>Fruit And vegetable</h3>
        </div>
        <div>
          <div style={containerWrapperStyle}>
            {dropTxts.map((txt, index) => {
              const droppedItems = this.getDroppedItems(index);
              return (
                <Container
                  key={index}
                  name={txt}
                  onDrop={item => this.handleDrop(index, item)}
                  index={index}
                  allowMultiples={this.state.allowMultiples}
                  droppedItems={droppedItems}
                  isSubmitted={this.state.isSubmitted}
                />
              );
            })}
          </div>
          <div className="rowvf">
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
