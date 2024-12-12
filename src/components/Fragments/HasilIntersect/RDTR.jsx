import React, { useEffect } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";

const RDTR = ({ data }) => {
  const [newdata, setNewData] = React.useState([]);
  useEffect(() => {
    let rdtr = [];
    data.map((item, idx) => {
      rdtr.push({
        "Peruntukan Ruang": item.ruang,
        "Luas (m2)": convertToFixed(item.luas),
        Status: item.status,
      });
    });

    setNewData(rdtr);
  }, [data]);

  return (
    <>
      {newdata.length > 0 && (
        <div className="m-3">
          <h1>RDTR</h1>
          <Table data={newdata} />
        </div>
      )}
    </>
  );
};

export default RDTR;
