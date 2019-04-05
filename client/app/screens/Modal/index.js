import React, { Component } from "react";
import { connect } from "react-redux";
import PropsType from "prop-types";
import io from "socket.io-client";
import Loader from "react-loader-spinner";
import ReactModal from "react-modal";
import classnames from "classnames";

import CloseButton from "../../components/CloseButton";
import DataTransaction from "../../components/DataTransaction";
import QRCodeComponent from "../../components/QRCode";
import Description from "../../components/Description";
import Status from "../../components/Status";
import {
  doTransaction,
  getTransactionData,
  subscriptionClosed,
  notificationSubscribe
} from "../../store/modules/moneyclick";

import styles from "./style.scss";

ReactModal.setAppElement("#modal");

class ModalWindow extends Component {
  constructor() {
    super();
    this.state = {
      sharedText: "",
      showModal: false,
      showLoader: false,
      showButton: true,
      status: "waiting",
      statusText: "Waiting for Payment"
    };
  }

  setText(object) {
    this.setState({ sharedText: JSON.stringify(object) });
  }

  componentDidMount() {
    const { amount, accountid, orderid, currency } = this.props.input;
    this.setText({ accountid, amount, currency, memo: orderid });
  }

  componentDidUpdate(prevProps, prevState) {
    // const socket = io('https://159.89.26.174:8001/', { forceNew: true, secure: true, rejectUnauthorized: false });
    const socket = io("https://localhost:8001/", {
      forceNew: true,
      secure: true,
      rejectUnauthorized: false
    });

    if (
      this.props.showModal !== prevProps.showModal &&
      prevState.showModal !== this.props.showModal
    ) {
      this.setState({ showModal: this.props.showModal });
      const { amount, accountid, orderid, currency } = this.props.input;

      // TODO: insert currency into the qrcode
      console.log(currency);

      this.props.subscribe(accountid, amount, orderid);
      socket.on("connect", () => {
        console.log("connect");
      });
      socket.on("disconnect", () => {
        console.log("disconnect");
      });
      socket.on("message", message => {
        console.log(message);
        this.props.storeData(message);
      });
    }
    if (this.props.payment !== prevProps.payment) {
      if (this.props.payment && this.props.payment.successful) {
        this.setState({
          showLoader: false,
          statusText: "Transaction Successful",
          status: "success"
        });
        socket.close();
        this.props.closeSubscription();
      }
    }
  }

  hideWindow() {
    this.setState({ showModal: false });
    this.props.switch();
  }

  doTransaction() {
    const { sharedText } = this.state;
    const data = JSON.parse(sharedText);
    const accountPayer =
      "GA3XOL6BTN3V2FMTTEFWWAIMQOXCGLYTEWMPCDPPBOKFZXKXTFOWZJJU"; // for simulation
    this.setState({
      statusText: "Transaction in Progress",
      showLoader: true,
      showButton: false
    });
    this.props.simulation(data.accountId, accountPayer, data.amount, data.memo);
  }

  render() {
    const {
      status,
      showModal,
      sharedText,
      statusText,
      showLoader,
      showButton
    } = this.state;
    return (
      <ReactModal
        className={styles.modal}
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
      >
        <CloseButton
          className={styles.closeButton}
          onClose={this.hideWindow.bind(this)}
        />
        <div className={styles.grid}>
          <Description text={sharedText} />
          <Status text={statusText} type={status} />
          <div
            className={
              showLoader
                ? classnames(styles.loader, styles.show)
                : styles.loader
            }
          >
            <Loader
              type="RevolvingDot"
              color="#ffa500"
              height="30"
              width="30"
            />
          </div>
          <button
            type="submit"
            className={
              showButton
                ? classnames("btn", styles.button)
                : classnames("btn", styles.button, styles.hide)
            }
            onClick={this.doTransaction.bind(this)}
          >
            Simulate Transaction
          </button>
        </div>
        {status === "success" ? (
          <DataTransaction data={this.props.payment} />
        ) : (
          <QRCodeComponent className={styles.qrcode} value={sharedText} />
        )}
      </ReactModal>
    );
  }
}

ModalWindow.propTypes = {
  showModal: PropsType.bool,
  payment: PropsType.shape({
    successful: PropsType.bool.isRequired
  }).isRequired,
  // subscrState: PropsType.string.isRequired,
  switch: PropsType.func.isRequired,
  input: PropsType.shape({
    amount: PropsType.string.isRequired,
    accountid: PropsType.string.isRequired,
    orderid: PropsType.string.isRequired,
    currency: PropsType.string.isRequired
  }).isRequired,
  subscribe: PropsType.func.isRequired,
  storeData: PropsType.func.isRequired,
  simulation: PropsType.func.isRequired,
  closeSubscription: PropsType.func.isRequired
};

ModalWindow.defaultProps = {
  showModal: true
};

const mapStateToProps = ({ moneyclick }) => ({
  payment: moneyclick.payment,
  subscrState: moneyclick.subscriptionState,
  input: moneyclick.input
});

const mapDispatchToProps = dispatch => ({
  simulation: (sourceSK, receiverPK, amount, memo) =>
    dispatch(doTransaction(sourceSK, receiverPK, amount, memo)),
  subscribe: (receiverPK, amount, memo) =>
    dispatch(notificationSubscribe(receiverPK, amount, memo)),
  storeData: data => dispatch(getTransactionData(data)),
  closeSubscription: () => dispatch(subscriptionClosed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindow);
