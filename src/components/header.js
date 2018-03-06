import React, { Component } from 'react'
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2>{this.props.title}</h2>
      </div>
    )
  }
}
