import React from 'react';

const RenderData = (header, data, keyArr) => {
  return (
    <table border="1px solid">
      <thead>
        <tr>
          {header ? header.map((col, index) => (
            <th key={index}>{col}</th>
          )): null}
        </tr>
      </thead>
      <tbody>
        {data ? data.map((row, index) => (
          <tr key={index}>
            {keyArr.map((col, index) => (
              <td key={index}>{row[col]}</td>
            ))}
          </tr>
        )): null}
      </tbody>
    </table>
  );
};

export default RenderData;