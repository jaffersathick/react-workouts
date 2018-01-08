import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  width: 80,
  fontSize: 10,
  backgroundColor: "yellow",
  borderRadius:10,
  border: "1px solid yellow",
  boxShadow: "inset 0 0 2px 1px white, 0 2px 5px rgba(0,0,0,0.15), inset 0 -17px 0 rgba(0,0,0,0.06)",
  color: "black",
  padding: "9px 0px",
  textAlign: "center",
  marginBottom: "1rem",
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
