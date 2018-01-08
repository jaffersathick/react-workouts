import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  height: 35,
  width: 60,
  fontSize: 9,
  padding: 4,
  backgroundColor: "yellow",
  border: "1px solid yellow",
  borderRadius:10,
  boxShadow: "inset 0 0 2px 1px white, 0 2px 5px rgba(0,0,0,0.15), inset 0 -17px 0 rgba(0,0,0,0.06)",
  color: "black",
  textAlign: "center",
  margin: "5px",
  lineHeight: "1em",
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
