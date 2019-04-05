import React from "react";
import PropsType from "prop-types";
import classnames from "classnames";

import styles from "./style.scss";

const getClassName = type => {
  const className = styles[type];

  return className || styles.default;
};

const StatusComponent = ({ className, type, text }) => (
  <div className={classnames(getClassName(type), className)}>{text}</div>
);

StatusComponent.propTypes = {
  text: PropsType.string.isRequired,
  type: PropsType.string.isRequired,
  className: PropsType.string.isRequired
};

export default StatusComponent;
