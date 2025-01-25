import React, { useEffect } from "react";
import Table from "../../Elements/Table";
import { convertToFixed } from "../../../Libs/common";
import PropTypes from "prop-types";
import { RDTRPropTypes } from "../../../Types/RDTR.types";

const RDTR = ({ data }) => {
  const [newdata, setNewData] = React.useState([]);
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

    // let rdtr = [];
    // data.map((item) => {
    //   rdtr.push({
    //     "Peruntukan Ruang": item.ruang,
    //     "Luas (ha)": convertToFixed(item.luas),
    //     Status: item.status,
    //   });
    // });

    // setNewData(rdtr);
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

RDTR.propTypes = RDTRPropTypes;

export default RDTR;
