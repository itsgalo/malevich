import React, { Component } from 'react';

export default class App extends Component {
//root elements are elements managed by react, a single DOM element
  componentDidMount() {
    document.title = "Malevi.sch";
  }
  render() {
    return (
      <div id="about" class="popup">
        <div class="popup-content">
          <h1>Malevi.ch 1.0</h1>
          <p>a project by <a href="http://officeca.com">office ca</a></p>
          <a>instructions:</a>
          <p>CLICK and DRAG to draw shapes</p>
          <p>CLICK on objects to move, throw, or collide them</p>
          <p>FORCE turns vertical gravity on/off</p>
          <p>SHAPE defines type of shape (circle/square/triangle)</p>
          <p>PAUSE freezes/unfreezes current composition state</p>
          <p>RESET clears everything</p>
        </div>
      </div>
    )
  }
}
