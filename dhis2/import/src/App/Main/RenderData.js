import React from 'react';

// const RenderData = (header, data, keyArr) => {
//   return (
//     <table border="1px solid">
//       <thead>
//         <tr>
//           {header ? header.map((col, index) => (
//             <th key={index}>{col}</th>
//           )): null}
//         </tr>
//       </thead>
//       <tbody>
//         {data ? data.map((row, index) => (
//           <tr key={index}>
//             {keyArr.map((col, index) => (
//               <td key={index}>{row[col]}</td>
//             ))}
//           </tr>
//         )): null}
//       </tbody>
//     </table>
//   );
// };
const RenderData = (header, data, keyArr, selectedFields) => {
  return (
    <table border="1px">
      <thead>
        <tr key="header">
          {header?.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr key={row[keyArr]}>
            {Object.keys(row)?.map((key) => {
              if (selectedFields.includes(key)) {
                return <td key={`${row[key]}-${key}`}>{row[key]}</td>;
              } else {
                return null;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default RenderData;