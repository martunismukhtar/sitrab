import React from "react";

const Info = ({ data }) => {
  return (
    <table border="1" style={{ width: "100%", textAlign: "left" }}>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td> : {value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Info;
