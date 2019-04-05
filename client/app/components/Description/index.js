import React from "react";
import PropsType from "prop-types";

import styles from "./style.scss";

const DescriptionComponent = ({ text }) => {
  const data = JSON.parse(text);
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.margin}>
        <b>Order N°</b>
        <br />
        <i className={styles.orderNum}>{data.memo}</i>
      </div>
      <div className={styles.margin}>
        <b>Amount</b>
        <br />
        <i>{data.amount} Lumens</i>{" "}
      </div>
    </div>
  );
};

DescriptionComponent.propTypes = {
  text: PropsType.string.isRequired
};

export default DescriptionComponent;
