import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

const MoneyClickButton = () => (
  <div className={styles.buttonContainer}>
    <button
      id="moneyclickbutton"
      type="submit"
      className={classnames("btn", styles.mcButton)}
    >
      {" "}
      Get QRCode to pay
    </button>
    <p className={styles.subtitle}>The fastest way to pay</p>
  </div>
);

export default MoneyClickButton;
