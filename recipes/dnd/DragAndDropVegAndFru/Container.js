import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const containerStyle = {
  width: "40%",
  borderRadius: 5,
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 6px, rgba(0, 0, 0, 0.3) 0px 1px 4px",
  color: "white",
  padding: 5,
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  justifyContent: "space-evenly",
  margin: 10
};

const imageStyle = {
  height: 50
};

const boxTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

@DropTarget(
  props =>
    props.droppedItems.length === 0 || props.allowMultiples
      ? ItemTypes.BOX
      : "",
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

    let backgroundColor = "transparent";
    if (isSubmitted) {
      backgroundColor = "transparent";
    }

    const tickStyle = {
      display: isSubmitted ? "inline-block" : "none",
      position: "absolute",
      right: -10
    };

    return connectDropTarget(
      <div
        className="boxs"
        style={{
          ...containerStyle,
          backgroundColor
        }}
      >
        {this.props.droppedItems.map(({ text, isCorrect }, i) => (
          <div
            key={i}
            style={{
              color: isSubmitted ? (isCorrect ? "green" : "red") : "white",
              position: "relative"
            }}
          >
            <img src={"img/fruits/" + text + ".png"} style={imageStyle} />
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
