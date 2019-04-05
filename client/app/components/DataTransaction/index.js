import React from "react";
import PropsType from "prop-types";

import styles from "./style.scss";

const DataTransaction = ({ data }) => (
  <div className={styles.dataContainer}>
    <div className={styles.title}>Payment Data</div>

    <div>
      {" "}
      State:
      <i className={data.successful ? styles.success : styles.failure}>
        {data.successful ? "SUCCESSFUL" : "FAILED"}
      </i>
    </div>
    <div>
      {" "}
      Date:
      <i>{data.created_at}</i>
    </div>
    <div>
      {" "}
      Fee:
      <i>{data.fee_paid}</i>
    </div>
    <div className={styles.account}>
      {" "}
      From:
      <a href={data._links.account.href} target="_blank">
        See Details
      </a>
    </div>
  </div>
);

DataTransaction.propTypes = {
  data: PropsType.shape({}).isRequired
};

export default DataTransaction;
