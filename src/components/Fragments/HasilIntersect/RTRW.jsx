import React, { useEffect } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";
import PropTypes from "prop-types";

const RTRW = ({ data }) => {
  const [newdata, setNewData] = React.useState([]);
  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error("data must be an array");
      return;
    }
    let rtrw = [];
    data.map((item) => {
      rtrw.push({
        "Peruntukan Ruang": item.ruang,
        "Luas (m2)": convertToFixed(item.luas),
        Status: item.status,
      });
    });
    setNewData(rtrw);
  }, [data]);

  RTRW.propTypes = {
    data: PropTypes.array.isRequired,
  };
  return (
    <>
      {newdata.length > 0 && (
        <div className="my-3">
          <h5>RTRW</h5>
          <Table data={newdata} />
        </div>
      )}
    </>
  );
};

export default RTRW;
