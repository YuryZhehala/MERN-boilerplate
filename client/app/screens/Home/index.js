import React, { Component } from "react";
import MoneyClickButton from "../../components/MoneyClickButton/index";

import ModalWindow from "../Modal";

import styles from "./style.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      sharedText: "not set"
    };
  }

  toggleShowModalWindow() {
    console.log("toggleShowModalWindow", !this.state.showModal);
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleShowModalWindow();
  }

  render() {
    return (
      <div className={styles.main}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <MoneyClickButton />
          <ModalWindow
            showModal={this.state.showModal}
            sharedText={this.state.sharedText}
            switch={this.toggleShowModalWindow.bind(this)}
          />
        </form>
      </div>
    );
  }
}

export default App;
