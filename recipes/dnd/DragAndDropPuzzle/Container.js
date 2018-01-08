import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const containerStyle = {
  height: 30,
  width: 80,
  borderRadius: 35,
  fontWeight: "600",
  border: "1px solid yellow",
  boxShadow:
    "inset 0 0 2px 1px white, 0 2px 5px rgba(0,0,0,0.15), inset 0 -17px 0 rgba(0,0,0,0.06)",
  textShadow: "0 1px 0 white",
  padding: "4px 0px",
  textAlign: "center",
  fontSize: 14,
  position: "absolute"
};

const boxPosition = [
  {
    left: 213,
    top: 48
  },
  {
    left: 213,
    top: 82
  },
  {
    left: 213,
    top: 126
  },
  {
    left: 213,
    top: 162
  },
  {
    left: 213,
    top: 196
  }
];

const boxTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

@DropTarget(
  props => (props.droppedItems.length === 0 ? ItemTypes.BOX : ""),
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const {
      canDrop,
      isOver,
      index,
      isSubmitted,
      connectDropTarget
    } = this.props;
    const isActive = canDrop && isOver;

    let background = "yellow";
    if (isActive) {
      background = "transparent";
    } else if (isSubmitted) {
      background = "transparent";
    }
    const { left, top } = boxPosition[index];

    const tickStyle = {
      display: isSubmitted ? "inline-block" : "none",
      left: 85,
      position: "absolute"
    };

    return connectDropTarget(
      <div
        style={{
          ...containerStyle,
          background,
          left,
          top
        }}
      >
        {this.props.droppedItems.map(({ text, isCorrect }, i) => (
          <div
            key={i}
            style={{
              color: isSubmitted
                ? isCorrect ? "lawngreen" : "darkred"
                : "#333",
              whiteSpace: "wrap",
              position: "relative"
            }}
          >
            {" "}
            {text}
            <i
              className={isCorrect ? "fa fa-check" : "fa fa-times"}
              aria-hidden="true"
              style={tickStyle}
            />
          </div>
        ))}
      </div>
    );
  }
}
