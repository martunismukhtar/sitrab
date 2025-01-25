// RTRW.jsx

import { useEffect, useState } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";
import { RTRWPropTypes } from "../../../Types/RTRW.types"

const RTRW = ({ data }) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error("The 'data' prop must be an array");
      setNewData([]); // Reset state if data is invalid
      return;
    }

    const formattedData = data.map((item) => ({
      "Peruntukan Ruang": item.ruang || "Tidak diketahui", // Fallback jika `item.ruang` undefined
      "Luas (ha)": convertToFixed(item.luas || 0), // Fallback jika `item.luas` undefined
      Status: item.status || "Tidak diketahui", // Fallback jika `item.status` undefined
    }));

    setNewData(formattedData);
  }, [data]);

  return (
    <div className="my-3">
      {newData.length > 0 ? (
        <>
          <h5>RTRW</h5>
          <Table data={newData} />
        </>
      ) : (
        <p>Data tidak tersedia atau tidak valid.</p>
      )}
    </div>
  );
};

RTRW.propTypes = RTRWPropTypes;

// eslint-disable-next-line react-refresh/only-export-components
export default RTRW;