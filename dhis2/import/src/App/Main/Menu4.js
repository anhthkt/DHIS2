import { useState, useEffect } from 'react';
import { Table, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import XLSX from 'xlsx';
import { FetchIdOrg, FetchIdTeiByBHYT, FetchIdTeiByCMT } from './Function/Services';
import { checkDataRow } from './Function/CheckDataRow';
import RenderDataMenu2 from './Function/RenderDataMenu2';


const Menu4 = () => {
    const [fileName, setFileName] = useState('');
    const [data, setData] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [checkRender, setCheckRender] = useState(false);


    const handleUpload = async (file) => {
        // setCheckRender(true);
        return new Promise((resolve, reject) => {
            setFileName(file.name);
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = () => {
                const file = new Uint8Array(reader.result);
                const workbook = XLSX.read(file, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 4, blankrows: false }).filter((row) => row.some((cell) => cell !== ''));
                // Chuyển đổi định dạng cột G, M (ngày tháng)
                for (let i = 0; i < data.length; i++) {
                    const row = data[i];
                    const birth = row[6]; // Giá trị ngày tháng trong cột G
                    const date2 = row[12]; // Giá trị ngày tháng trong cột M
                    if (birth && typeof birth === 'number') {
                        row[6] = XLSX.SSF.format('dd/mm/yyyy', birth); // Chuyển đổi định dạng ngày tháng
                    }
                    if (date2 && typeof date2 === 'number') {
                        row[12] = XLSX.SSF.format('dd/mm/yyyy', date2); // Chuyển đổi định dạng tiền tệ
                    }
                }
                
                const keyArr = ["key", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note", "idOrg", "teiId", "program"];
                // console.log(data);
                let result = [];
                for (let i = 0; i < data.length; i++) {
                    let row = data[i];
                    const obj = {};
                    keyArr.forEach((col, index) => {
                        obj[col] = row[index]?.toString();
                    });
                    obj.note = checkDataRow(obj);
                    obj.key = i + 1;
                    result.push(obj);
                }
                // console.log(result);
                setData(result);
                setDataSource(result);
                // console.log(data);
                fetchData();
                resolve(data);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // useEffect(() => {
    //     // Set checkRender back to false after rendering
    //     setCheckRender(false);
    // }, [checkRender]);

    // Hàm xóa dữ liệu trùng nhau trong mảng
    function deleteDuplicate(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    // Get TeiID
    const getTeiId = async (result) => {
        const newResult = [...result];
        for (let i = 0; i < newResult.length; i++) {
            const row = newResult[i];
            if (row.note === '' && (row.TeiId === undefined || row.TeiId === '')) {
                let idTeiByBHYT = "";
                let idTeiByCMT = "";
                let rowNote = '';
                let rowTeiId = '';
                let program = [];
                if (row.key !== '' && row.key !== undefined) {
                    let resFetchIdTeiByBHYT = await FetchIdTeiByBHYT(row.key);
                    idTeiByBHYT = resFetchIdTeiByBHYT.trackedEntityInstance;
                    program = resFetchIdTeiByBHYT.enrollments;
                }
                if (row.cmt !== '' && row.cmt !== undefined) {
                    let resFetchIdTeiByCMT = await FetchIdTeiByCMT(row.cmt);
                    idTeiByCMT = resFetchIdTeiByCMT.trackedEntityInstance;
                    program = resFetchIdTeiByCMT.enrollments;
                }

                if (idTeiByBHYT !== "" && idTeiByCMT !== "" && idTeiByBHYT !== idTeiByCMT) {
                    rowNote = "BHYT và CMT tồn tại trên 2 BN khác nhau. ";
                    rowTeiId = '';
                    program = [];
                } else {
                    // row.note += "Import hoặc Enrollment"
                    if (idTeiByBHYT !== "" && idTeiByCMT !== "" && idTeiByBHYT === idTeiByCMT) {
                        rowTeiId = idTeiByBHYT;
                        // rowNote = "Đã có tei theo BHYT và CMT. "
                    }
                    if (idTeiByBHYT !== "" && idTeiByCMT === "") {
                        rowTeiId = idTeiByBHYT;
                        // rowNote = "Đã có tei theo BHYT. "
                    }
                    if (idTeiByBHYT === "" && idTeiByCMT !== "") {
                        rowTeiId = idTeiByCMT;
                        // rowNote = "Đã có tei theo CMT. "
                    }
                }
                row.note += rowNote;
                if (rowTeiId === undefined) { row.teiId = ""; } else { row.teiId = rowTeiId; }
                if (program === undefined) { row.program = []; } else { row.program = program; }
            }
            setDataSource(newResult);
        }
        setDataSource(newResult);
        return newResult;
    };

    // code to fetch data and update tableData state
    const fetchData = async () => {
        if (data.length > 0) {
            const columnCodeOrg = deleteDuplicate(data.map((row) => row.code)); // Lấy cột mã Đơn vị
            const idOrgArr = await FetchIdOrg(columnCodeOrg);
            data.forEach((row1) => {
                var found = 0;
                idOrgArr.forEach((row2) => {
                    if (parseInt(row1.code) === parseInt(row2.code)) {
                        row1.idOrg = row2.id;
                        found = 1;
                    }
                });
                if (found !== 1) {
                    row1.idOrg = '';
                    row1.note += 'Kiểm tra lại mã đơn vị. \n';
                }
            });
            await getTeiId(data);
            setDataSource(data);
            setData(data);
            // setCheckRender(true);
        }
    };

    // const columns = [
    //     {
    //         title: 'STT (*)',
    //         dataIndex: 'key'
    //     },
    //     {
    //         title: 'Mã Xã/Phường/Thị trấn (*)',
    //         dataIndex: 'code'
    //     },
    //     {
    //         title: 'Mã Huyện/ Thị xã/ Thành phố',
    //         dataIndex: 'code2'
    //     },
    //     {
    //         title: 'Mã Tỉnh/ Thành phố',
    //         dataIndex: 'code3'
    //     },
    //     {
    //         title: 'Họ và Tên (*)',
    //         dataIndex: 'name'
    //     },
    //     {
    //         title: 'Giới tính (*)',
    //         dataIndex: 'sex'
    //     },
    //     {
    //         title: 'Năm sinh (*)',
    //         dataIndex: 'birth'
    //     },
    //     {
    //         title: 'Mã BHYT (*)',
    //         dataIndex: 'bhyt'
    //     },
    //     {
    //         title: 'Số CMT/CCCD',
    //         dataIndex: 'cmt'
    //     },
    //     {
    //         title: 'Địa chỉ',
    //         dataIndex: 'add'
    //     },
    //     {
    //         title: 'Nghề nghiệp',
    //         dataIndex: 'job'
    //     },
    //     {
    //         title: 'Số điện thoại',
    //         dataIndex: 'phone'
    //     },
    //     {
    //         title: 'Ngày phát hiện',
    //         dataIndex: 'date2'
    //     },
    //     {
    //         title: 'Nơi phát hiện',
    //         dataIndex: 'add2'
    //     },
    //     {
    //         title: 'Ghi Chú',
    //         dataIndex: 'note',
    //         defaultSortOrder: 'descend',
    //         sorter: (a, b) => a.note.localeCompare(b.note)
    //     },
    // ];
    const RenderDataMenu2 = () => {
        // const [currentData, setCurrentData] = useState(data);
        const columns = [
            {
                title: 'STT (*)',
                dataIndex: 'key'
            },
            {
                title: 'Mã Xã/Phường/Thị trấn (*)',
                dataIndex: 'code'
            },
            {
                title: 'Mã Huyện/ Thị xã/ Thành phố',
                dataIndex: 'code2'
            },
            {
                title: 'Mã Tỉnh/ Thành phố',
                dataIndex: 'code3'
            },
            {
                title: 'Họ và Tên (*)',
                dataIndex: 'name'
            },
            {
                title: 'Giới tính (*)',
                dataIndex: 'sex'
            },
            {
                title: 'Năm sinh (*)',
                dataIndex: 'birth'
            },
            {
                title: 'Mã BHYT (*)',
                dataIndex: 'bhyt'
            },
            {
                title: 'Số CMT/CCCD',
                dataIndex: 'cmt'
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'add'
            },
            {
                title: 'Nghề nghiệp',
                dataIndex: 'job'
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone'
            },
            {
                title: 'Ngày phát hiện',
                dataIndex: 'date2'
            },
            {
                title: 'Nơi phát hiện',
                dataIndex: 'add2'
            },
            {
                title: 'Ghi Chú',
                dataIndex: 'note',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.note.localeCompare(b.note)
            },
        ];

        // const filteredData = data?.map((item) => {
        //   const newItem = {};
        //   columns?.forEach((column) => {
        //     newItem[column.dataIndex] = item[column.dataIndex];
        //   });
        //   return newItem;
        // });

        // if (filteredData.length > 0) {
        //   for (let i = 0; i < filteredData.length; i++) {
        //     filteredData[i].key = i;
        //   }
        // }
        const onChange = (pagination, filters, sorter, extra) => {
            // console.log('params', pagination, filters, sorter, extra);
        };
        const [selectedRowKeys, setSelectedRowKeys] = useState([]);
        const [loading, setLoading] = useState(false);
        const start = () => {
            setLoading(true);
            // ajax request after empty completing
            setTimeout(() => {
                setSelectedRowKeys([]);
                setLoading(false);
            }, 1000);
        };

        const deleteRow = () => {
            if (data.length > 0) {
                console.log('Deleting row', data, selectedRowKeys);
                const newData = data?.filter(item => !selectedRowKeys.includes(item.key));
                //   setCurrentData(newData);
                setData(newData);
                console.log(newData);
                setSelectedRowKeys([]);
                setLoading(false);
            }
        };

        const onSelectChange = (newSelectedRowKeys) => {
            console.log('selectedRowKeys changed: ', newSelectedRowKeys);
            setSelectedRowKeys(newSelectedRowKeys);
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                >
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Bỏ chọn
                    </Button>
                    <span style={{ marginLeft: 8, }}>
                        {hasSelected ? `Đã chọn ${selectedRowKeys.length} dòng` : ''}
                    </span>
                    <span style={{ marginLeft: 8, }}>
                        {hasSelected ? (<Button danger onClick={deleteRow} disabled={!hasSelected} loading={loading}>
                            Xóa
                        </Button>) : null}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 10 }} />
            </div>
        );

        // return (
        //   <Table
        //     dataSource={filteredData}
        //     columns={columns}
        //     onChange={onChange}
        //     pagination={{ pageSize: 10 }} // phân trang với mỗi trang có 10 dòng
        //   />
        // );
    }

    return (
        <div>
            <h4>
                <Upload
                    accept=".xlsx, .xls"
                    action={() => { }} // Thay đổi handleUpload thành một hàm trống
                    customRequest={({ file }) => handleUpload(file)} // Truyền file vào hàm handleUpload
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Tải lên file Excel</Button>
                    File đã tải lên: {fileName}
                </Upload>
            </h4>
            {/* <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} /> */}
            {RenderDataMenu2()}
        </div>
    );

}

export default Menu4;
