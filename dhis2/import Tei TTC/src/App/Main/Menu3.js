import React, { useState, useEffect } from 'react';
import RenderData from './Function/RenderData';
import { importTei, importEnrollment } from './Function/Services';
import { Modal } from 'antd';
import { Row, Col } from 'antd';
import { createDataTei, createDataEnrollment } from './Function/CreateBodyRequest';

const Menu3 = (props) => {
  const programId = props.selectedOption ? props.selectedOption[0] : "";
  const data = props.data;
  // const header = props.header;
  // const keyArr = props.keyArr;
  // const selectedFields = ["stt", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note"];
  const [errorData, setErrorData] = useState('');
  const [updatedData, setUpdatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var checkData = false;
  if (data?.length > 0 && programId !== '') {
    data?.forEach((row) => {
      if (row.note !== '') {
        checkData = true;
        return;
      }
    })
  }

  var programName = "";
  if (programId === "NAleauPZvIE") { programName = 'Tăng Huyết Áp' };
  if (programId === "a7arqsOKzsr") { programName = 'Đái Tháo Đường' };
  if (programId === "gPWs4FRX9dj") { programName = 'COPD và Hen PQ' };
  if (programId === "WmEGO8Ipykm") { programName = 'Rối loạn tâm thần' };
  if (programId === "XrC0U6IV4W0") { programName = 'KLN Khác' };

  const importData = async (data) => {
    setIsLoading(true);
    const newData = [...data];
    if (!data || !programId) {
      setErrorData('Chọn chương trình và Kiểm tra lại dữ liệu file import.');
    } else {
      if (checkData) {
        setErrorData('Kiểm tra lại dữ liệu file import.');
      } else {
        for (var i = 0; i < newData.length; i++) {
          const row = newData[i];
          //  console.log(i, row.note);
          // Thực hiện import dữ liệu trên mỗi dòng và ghi kết quả vào note
          if (row.note === '' && row.teiId === '') {
            let dataTei = createDataTei(row, programId);
            try {
              await importTei(row, dataTei);
              // row.note = res.importSummaries[0].href;
              // row.teiId = res.importSummaries[0];
            } catch (error) {
              // console.log(`Error importing data for row ${i}: ${error}`);
              row.note = 'Import failed';
            }
            // row.note = await res.importSummaries[0].href;
            // row.teiId = await res.importSummaries[0];
          } else {
            if (row.note === '' && row.teiId !== '') {
              let checkProgram = true;
              if (row.program.length > 0) {
                row.program.forEach((p) => {
                  if (p.program === programId) {
                    checkProgram = false;
                  }
                })
              }
              if (checkProgram === true) {
                let dataEnroll = createDataEnrollment(row, programId);
                await importEnrollment(row, dataEnroll);
                // row.note = res.importSummaries[0].href;
              } else {
                row.note = 'Đã có BN trong hệ thống.'
              }
            }
            // row.note = 'Import Data';
          }
        }
      }
    };
    setUpdatedData(newData);
    setIsLoading(false);
  };

  useEffect(() => {
    importData(data);
  }, [data]);

  return (
    <div className='menu3'>
      <Row justify="space-around">
        <Col ><h4>Chương trình đã chọn: {programName}</h4></Col>
        <Col ><h4>{errorData && <p>{errorData}</p>}</h4></Col>
        <Col span={2}></Col>
      </Row>

      <Modal open={isLoading} title="Đang import dữ liệu">
        <p>Vui lòng đợi trong giây lát...</p>
      </Modal>
      
      {updatedData.length > 0 && (<>{RenderData(updatedData)}</>)}
    </div>
  );
};

export default Menu3;
