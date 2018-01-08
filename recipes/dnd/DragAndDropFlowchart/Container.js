import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const containerStyle = {
  height: 35,
  width: 60,
  borderRadius: 10,
  wordWrap: "break-word",
  fontWeight: "600",
  border: "1px solid yellow",
  boxShadow:
    "inset 0 0 2px 1px white, 0 2px 5px rgba(0,0,0,0.15), inset 0 -17px 0 rgba(0,0,0,0.06)",
  padding: 4,
  textAlign: "center",
  fontSize: 9,
  lineHeight: "1em",
  position: "absolute"
};

const boxPosition = [
  {
    left: 5,
    top: 5
  },
  {
    left: 85,
    top: 5
  },
  {
    left: 165,
    top: 5
  },
  {
    left: 240,
    top: 5
  },
  {
    left: 325,
    top: 5
  },
  {
    left: 240,
    top: 60
  },
  {
    left: 240,
    top: 140
  },
  {
    left: 85,
    top: 140
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
      background = "yellow";
    } else if (isSubmitted) {
      background = "yellow";
    }
    const { left, top } = boxPosition[index];

    const tickStyle = {
      display: isSubmitted ? "block" : "none",
      position: "absolute",
      top: 40,
      left: 25
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
              color: isSubmitted ? (isCorrect ? "green" : "red") : "#111",
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
      </div>);
  }
}
