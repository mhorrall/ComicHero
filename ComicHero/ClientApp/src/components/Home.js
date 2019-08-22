import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Welcome to Comic Hero!</h1>
        <p>
          A single-page application built using ReactJs and ASP.Net Core API.
          The app is meant to demonstrate CRUD operations based on a comic book
          theme. It also interfaces with Marvel's API.
        </p>
      </div>
    );
  }
}
