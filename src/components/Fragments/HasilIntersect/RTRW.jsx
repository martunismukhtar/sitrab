// RTRW.jsx

import { useEffect, useState } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";
import { RTRWPropTypes } from "../../../Types/RTRW.types";

const RTRW = ({ data }) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error("The 'data' prop must be an array");
      setNewData([]);
      return;
    }
    const formattedData = data.map((item) => {
      const luas = typeof item.luas === "number" ? item.luas : 0; // Pastikan luas adalah angka
      return {
        "Peruntukan Ruang": item.ruang || "Tidak diketahui",
        "Luas (ha)": convertToFixed(luas),
        Status: item.status || "Tidak diketahui",
      };
    });

    setNewData(formattedData);
  }, [data]);

  return (
    <div className="my-3">
      {newData.length > 0 && (
        <div className="my-3">
          <h5>RTRW</h5>
          <Table data={newData} />
        </div>
      )}
    </div>
  );
};

RTRW.propTypes = RTRWPropTypes;

// eslint-disable-next-line react-refresh/only-export-components
export default RTRW;
