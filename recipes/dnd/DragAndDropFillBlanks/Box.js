import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  height: 21,
  width: 60,
  fontSize: 16,
  backgroundColor: "transparent",
  boxShadow:
    "inset 0 0 2px 1px white, 0 2px 5px rgba(0,0,0,0.15), inset 0 -17px 0 rgba(0,0,0,0.06)",
  borderBottom: "1px solid #666",
  color: "black",
  textAlign: "center",
  margin: 5,
  lineHeight: "21px",
  cursor: "move"
};

const boxSource = {
  beginDrag(props) {
    return {
      index: props.index,
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
    }
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name, index } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return connectDragSource(
      <div style={{ ...style, opacity, position: "block" }}>{name}</div>
    );
  }
}
