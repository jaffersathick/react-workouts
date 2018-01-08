import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  marginLeft: 10,
  cursor: "move"
};

const imageStyle = {
  height: 200
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
      <div style={{ ...style, opacity, position: "block" }}>
        <img src={"img/fruits/" + name + ".png"} style={imageStyle} />
      </div>
    );
  }
}
