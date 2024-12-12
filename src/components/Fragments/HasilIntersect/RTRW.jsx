import React, { useEffect } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";

const RTRW = ({ data }) => {
  const [newdata, setNewData] = React.useState([]);
  useEffect(() => {
    let rtrw = [];
    data.map((item, idx) => {
      rtrw.push({
        "Peruntukan Ruang": item.ruang,
        "Luas (m2)": convertToFixed(item.luas),
        Status: item.status,
      });
    });
    setNewData(rtrw);
  }, [data]);

  return (
    <>
      {newdata.length > 0 && (
        <div className="m-3">
          <h1>RTRW</h1>
          <Table data={newdata} />
        </div>
      )}
    </>
  );
};

export default RTRW;
