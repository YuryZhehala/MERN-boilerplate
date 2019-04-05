import React from "react";
import PropsType from "prop-types";
import QRCode from "qrcode.react";

/* TBN: renderAs: 'svg' or 'canvas' */
const QRCodeComponent = ({ value }) => (
  <QRCode value={value} renderAs="svg" size={142} />
);

QRCodeComponent.propTypes = {
  value: PropsType.string.isRequired
};

export default QRCodeComponent;
