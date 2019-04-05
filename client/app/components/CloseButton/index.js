import React from "react";
import PropsType from "prop-types";

import styles from "./styles.scss";

const CloseButton = ({ onClose }) => (
  <button
    className={styles.closeButton}
    type="submit"
    onClick={() => onClose()}
  />
);

CloseButton.propTypes = {
  onClose: PropsType.func.isRequired
};

export default CloseButton;
