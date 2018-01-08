import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const containerStyle = {
  height: 21,
  width: 60,
  borderBottom: "1px solid #666",
  textAlign: "center",
  fontSize: 16,
  position: "absolute"
};

const boxPosition = [
  {
    left: 0,
    top: 3
  },
  {
    left: 191,
    top: 3
  },
  {
    left: 63,
    top: 37
  },
  {
    left: 164,
    top: 37
  },
  {
    left: 338,
    top: 37
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

    let background = "transparent";
    if (isActive) {
      background = "transparent";
    } else if (isSubmitted) {
      background = "transparent";
    }
    const { left, top } = boxPosition[index];

    const tickStyle = {
      display: isSubmitted ? "block" : "none",
      position: "absolute",
      top: 20,
      left: 25
    };

    return connectDropTarget(
      <div
        className="contain"
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
              color: isSubmitted ? (isCorrect ? "green" : "red") : "black"
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
