import React from "react";
import Button from "react-bootstrap/Button";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";

// import PropTypes from "prop-types";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <Button variant="primary" size="sm" onClick={this.props.onPrev} >
         Previous
        </Button>
        <Button variant="primary" size="sm" className="float-right" onClick={this.props.onNext}>
        Next
        </Button>
        <div class="content">{this.props.children}</div>
        <div class="actions ">
          <button className="toggle-button " onClick={this.props.onClose}>
            View Full Post
          </button>
        </div>
      </div>
    );
  }
}
