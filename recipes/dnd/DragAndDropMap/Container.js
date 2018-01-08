import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const containerStyle = {
  height: 30,
  width: 80,
  borderRadius: 10,
  fontWeight: "600",
  border: "1px solid yellow",
  boxShadow:
    "inset 0 0 2px 1px white, 0 2px 5px rgba(0,0,0,0.15), inset 0 -17px 0 rgba(0,0,0,0.06)",
  padding: "9px 0px",
  textAlign: "center",
  fontSize: 10,
  position: "absolute"
};

const boxPosition = [
  {
    left: 213,
    top: 30
  },
  {
    left: 213,
    top: 110
  },
  {
    left: 140,
    top: 152
  },
  {
    left: 103,
    top: 212
  },
  {
    left: 29,
    top: 312
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
      connectDropTarget,
      onDrop
    } = this.props;
    const isActive = canDrop && isOver;

    let background = "transparent";
    if (isActive) {
      background = "yellow";
    } else if (isSubmitted) {
      background = "yellow";
    }
    const { left, top } = boxPosition[index];

    const tickStyle = {
      display: isSubmitted ? "inline-block" : "none",
      position: "absolute",
      left: 90,
      top: 6,
      fontSize: 18
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
              color: isSubmitted ? (isCorrect ? "green" : "red") : "#333",
              whiteSpace: "nowrap"
            }}
          >
            {text}
            <i
              className={isCorrect ? "fa fa-check" : "fa fa-times"}
              aria-hidden="true"
              style={tickStyle}
            />
          </div>
        ))}
      </div>);
  }
}
