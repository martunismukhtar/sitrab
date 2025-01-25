import React, { useEffect } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";
import PropTypes from "prop-types";

const RDTR = ({ data }) => {
  const [newdata, setNewData] = React.useState([]);
  useEffect(() => {
    let rdtr = [];
    data.map((item) => {
      rdtr.push({
        "Peruntukan Ruang": item.ruang,
        "Luas (m2)": convertToFixed(item.luas),
        Status: item.status,
      });
    });

    setNewData(rdtr);
  }, [data]);
  RDTR.propTypes = {
    data: PropTypes.array.isRequired,
  };
  return (
    <>
      {newdata.length > 0 && (
        <div className="my-3">
          <h5>RDTR</h5>
          <Table data={newdata} />
        </div>
      )}
    </>
  );
};

export default RDTR;
