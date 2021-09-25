var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['reports_TCLADB'] = TCLADB();

function TCLADB() {
    const teiMetaData_book = [
        {
            id: "xBoLC0aruyJ", title: "Họ tên"
            , col: 1
        },
        {
            id: "rwreLO34Xg7", title: "Giới tính"
            , col: 2
            , isOption: true
        },
        {
            id: "C7USC9MC8yH", title: "Năm sinh"
            , col: 3
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol } = metaData
                let data = event[jsonHeaders[foundCol.id]];
                return '' != data ? moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY") : data
            }
        },
        {
            id: "JHb1hzseNMg", title: "Mã BHYT"
            , col: 4
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData } = metaData
                let bhyt = event[jsonHeaders['JHb1hzseNMg']];
                let cmt = event[jsonHeaders['ZQ93P672wQR']];
                return bhyt != '' ? bhyt : cmt
            }
        },
        {
            id: "ZQ93P672wQR", title: "Số CMT"
        },
        {
            id: "mZbgWADLTKY", title: "SĐT"
            , col: 5
        }
    ];

    const coreDhisMetadata_book = [
        {
            id: "created", title: ""
            , col: 6
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol } = metaData
                let data = event[jsonHeaders[foundCol.id]];
                return '' != data ? moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY") : data
            }
        },
    ]

    const eventTCMetadata_book = [
        {
            id: "udwtZvJMnVL", title: "Chẩn đoán"
            , col: 7
        },
        {
            id: "G6kqlsUyuQe", title: "Hút thuốc lá"
            , isOption: true
            , col: 8
        },
        {
            col: 9, id: "vVs8M3PXMX1", title: "Mức Mức độ uống rượu bia"
            , isOption: true
        },
        {
            col: 10, id: "Y21iPpLFLEk", title: "Có ý tưởng/ hành vi tự sát"
            , isOption: true
        },
        {
            col: 11, id: "tdXMscfrp5a", title: "Điểm PHQ9"
        },
        {
            col: 12, id: "uhgWbum6R2v", title: "Điểm BECK"
        },
        // {
        //     id: "qP2JSpTIP8V", title: "Mức độ khó thở"
        //     , isOption: true
        //     , col: 9
        // },
        // {
        //     id: "be1BbXNkuPD", title: "Làm việc và sinh hoạt"
        //     , isOption: true
        //     , col: 10
        // },
        // {
        //     id: "X5jejsNMkjR", title: "Lưu lượng đỉnh + FEV1"
        //     , col: 9
        //     , convertOutputValue: (metaData) => {
        //         let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
        //         let fev1 = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'gXBZFnSzFlP' }) || undefined
        //         let lld = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'X5jejsNMkjR' }) || undefined
        //         switch (true) {
        //             case fev1 && lld:
        //                 resultStr = fev1
        //                 break;
        //             default:
        //                 resultStr = `${fev1 || ''}${lld || ''}`
        //                 break
        //         }
        //         return resultStr;
        //     }
        // },
        // {
        //     id: "gXBZFnSzFlP", title: "FEV1"
        //     // , isOption: true
        //     // , col: 10
        // },
        {
            id: "agZdCCAUFKx", title: "Kết quả điều trị"
            , isOption: true
            , col: 13
        },
        {
            id: "iihmh4K0k18", title: "Thuốc"
            , col: 14
        },
        {
            id: "mVdtFRM2gFX", title: "Nhận xét"
            , col: 15
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
                let bienChung = event[jsonHeaders['X0kBm02Gyft']] || ""
                let ghiRoBienChung = event[jsonHeaders['hfGTym6BfK1']] || ""
                let nhanxet = getValueAsOptionName({ jsonMetaData, foundCol, de: 'fBj7BCdA665' }) || ""
                let resultStr = ''
                resultStr = bienChung == '2'//Co
                    ? ghiRoBienChung : ''
                resultStr += nhanxet
                return resultStr;
            }
        }//NhanXet 
        , {
            id: "X0kBm02Gyft", title: "biến chứng"
        },
        {
            id: "hfGTym6BfK1", title: "Ghi rõ biến chứng"
        },
        {
            id: "mOguWgQg1or", title: "Y bác sĩ khám bệnh"
        }//YBSKhamBenh
    ];

    const eventLAMetadata_book = [
        {
            id: "udwtZvJMnVL", title: "Chẩn đoán"
            , col: 7
        },
        {
            col: 8, id: "G6kqlsUyuQe", title: "Hút thuốc lá"
            , isOption: true
        },
        {
            col: 9, id: "vVs8M3PXMX1", title: "Mức Mức độ uống rượu bia"
            , isOption: true
        },
        {
            col: 10, id: "PfsxYCRh9Pk", title: "Điểm GAD7"
        },
        {
            col: 11, id: "VuIZM4XyVSf", title: "Điểm ZUNG"
        },
        // {
        //     col: 9, id: "X5jejsNMkjR", title: "Lưu lượng đỉnh"
        //     , convertOutputValue: (metaData) => {
        //         let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
        //         let fev1 = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'gXBZFnSzFlP' }) || undefined
        //         let lld = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'X5jejsNMkjR' }) || undefined
        //         switch (true) {
        //             case fev1 && lld:
        //                 resultStr = fev1
        //                 break;
        //             default:
        //                 resultStr = `${fev1 || ''}${lld || ''}`
        //                 break
        //         }
        //         return resultStr;
        //     }
        // },
        // {
        //     id: "gXBZFnSzFlP", title: "FEV1"
        // },
        {
            col: 12, id: "agZdCCAUFKx", title: "Kết quả điều trị"
            // , isOption: true
        },
        {
            col: 13, id: "iihmh4K0k18", title: "Thuốc"
        },
        {
            id: "mVdtFRM2gFX", title: "Ghi chú"
            , col: 14
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event } = metaData
                return foundCol.id.split('_').map(e => event[jsonHeaders[e]]).join('\n')
            }
        },//NhanXet 
        {
            id: "mOguWgQg1or", title: "Y bác sĩ khám bệnh"
        }//YBSKhamBenh
    ];

    const TT37Metadata = [
        {
            id: "xBoLC0aruyJ", title: "Họ tên"
            , col: 1
        },
        {
            id: "rwreLO34Xg7", title: "Giới tính"
            , col: 2
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol, arrOutput } = metaData;
                let age = parseInt(
                    ((new Date()).getTime()
                        - new Date(event[jsonHeaders['C7USC9MC8yH']]).getTime()
                    ) / (1000 * 3600 * 24 * 365)
                );
                let isMale = event[jsonHeaders['rwreLO34Xg7']] == '01';

                !isMale ? arrOutput[foundCol.col + 1] = age : {}//Col: 3
                return isMale ? arrOutput[foundCol.col] = age : ''
            }
        },
        {
            id: "C7USC9MC8yH", title: "Năm sinh"
        },
        {
            id: "Bxp1Lhr8ZeN", title: "Địa chỉ"
            , col: 4
        },
        {
            id: "L4djJU4gMyb", title: "Nghề nghiệp"
            , col: 5
        },
        {
            id: "p3qT2PpuLFS", title: "Ngày phát hiện"
            , col: 6
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event } = metaData;
                let data = event[jsonHeaders[foundCol.id]];
                return '' != data ? moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY") : data
            }
        },
        {
            id: "DFHdfkyZaZO", title: "Nơi phát hiện"
            , col: 7
            , isOption: true
        },
        {
            id: "agZdCCAUFKx", title: "Kết quả điều trị"
        },
        {
            id: "jd8vkowkM7G", title: "Phân loại bệnh"
            , col: 8
            , isOption: true
        },
        {
            title: "firstMonth_to_lastMonth"
            , col: 9 // col 9->20 use same convertOutput value for month 
            , month: 1
            , convertOutputValue: (metaData) => {
                let { monthDataTT37, foundCol, arrOutput } = metaData
                let currentMonthValue;
                for (let i = 0; i < 12; i++) {
                    let eventsOfMonth = monthDataTT37.filter(e => e.month == (i + 1))?.pop()//start at i = 0 => offset 1 month
                    if (eventsOfMonth && eventsOfMonth.dataDatMTDT && eventsOfMonth.diseaseType) {
                        let { dataDatMTDT, diseaseType } = eventsOfMonth;
                        let monthData = ''
                        if (diseaseType == 3) {//TC
                            monthData = ['Đạt'].includes(dataDatMTDT) ? 'C' : 'K'
                        }
                        else if (diseaseType == 5) {//LA
                            monthData = ['Đạt'].includes(dataDatMTDT) ? 'C' : 'K'
                        }
                        console.log(i + foundCol.col)
                        arrOutput[i + foundCol.col] = monthData
                        i == 0 ? currentMonthValue = monthData : {}
                    }
                }
                return currentMonthValue || ''
            }
        },
        {
            id: 'iXw1Eq7HqjS'
            , title: "Ghi chú"
            , col: 21
            , isOption: true
        }
    ];

    function onDocumentReady() {

    }

    var requestApiManager = [], intergrateObject;
    //Table3
    async function loadReport() {

        let rqContent;
        p2ild.asyncLoadSupport ? rqContent = p2ild.asyncLoadSupport.createManager() : {};

        requestApiManager['content'] = rqContent;
        rqContent.setHandleSuccessAll(lastLoad)

        //Trầm cảm
        rqContent.createWorker().createHolderTitleRow('tc', `table_id1`
            , prepareDataTable(await getEventByTeiByOuTC(), listColumn = [...teiMetaData_book, ...eventTCMetadata_book, ...coreDhisMetadata_book]))
        //Lo âu
        rqContent.createWorker().createHolderTitleRow('la', `table_id2`
            , prepareDataTable(await  getEventByTeiByOuLA(), listColumn = [...teiMetaData_book, ...eventLAMetadata_book, ...coreDhisMetadata_book]))
        //TT37
        rqContent.createWorker().createHolderTitleRow('tt37', `table_id3`
            , prepareDataTable(await getEventByTeiByOuTT37(), listColumn = TT37Metadata))
        rqContent.triggleAllNetworkTask();
    }

    async function getEventByTeiByOuTC() {
        let programID = `WmEGO8Ipykm`
        //get credential user
        let userCredential = await pull(`api/me`)

        let fetchTeiByOU = await pull(`api/trackedEntityInstances.json?&ou=${orgUnitSelectedID}&program=${programID}&ouMode=DESCENDANTS&paging=false`, {
            credentials: "include"
        })
        teiByOu = fetchTeiByOU.trackedEntityInstances.map(tei => tei.trackedEntityInstance)
        let queryTC = {
            "auth": {
                "userID": userCredential.userCredentials.id
                , "lastLogin": userCredential.userCredentials.lastLogin
                , "originInstance": desURL
            }
            , "dataInstance": desURL
            , "payload": {
                "program": programID
                , "dimension": ["col_tei", "col_monthly", "col_yearly", "col_created", "col_ouname", ...teiMetaData_book.map(e => e.id), ...eventTCMetadata_book.map(e => e.id)]
                , "filterBoth": { "pe": periods.split(';') }
                , "filterSql": {
                    "tei": teiByOu,
                    "jd8vkowkM7G": ["3"],//Trầm cảm
                    "iXw1Eq7HqjS:not in": ["4"]//Except dead
                }
            }
        };
        let fetchData = await fetch('http://kln.tkyt.vn/p2ild/public/analyticsEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryTC)
        })
        return fetchData.json()
    }

    async function  getEventByTeiByOuLA() {
        let programID = `WmEGO8Ipykm`
        //get credential user
        let userCredential = await pull(`api/me`)

        let fetchTeiByOU = await pull(`api/trackedEntityInstances.json?&ou=${orgUnitSelectedID}&program=${programID}&ouMode=DESCENDANTS&paging=false`, {
            credentials: "include"
        })
        teiByOu = fetchTeiByOU.trackedEntityInstances.map(tei => tei.trackedEntityInstance)
        let queryTC = {
            "auth": {
                "userID": userCredential.userCredentials.id
                , "lastLogin": userCredential.userCredentials.lastLogin
                , "originInstance": desURL
            }
            , "dataInstance": desURL
            , "payload": {
                "program": programID
                , "dimension": ["col_tei", "col_monthly", "col_yearly", "col_created", "col_ouname", ...teiMetaData_book.map(e => e.id), ...eventLAMetadata_book.map(e => e.id)]
                , "filterBoth": { "pe": periods.split(';') }
                , "filterSql": {
                    "tei": teiByOu,
                    "jd8vkowkM7G": ["5"],//Lo âu
                    "iXw1Eq7HqjS:not in": ["4"]//Except dead
                }
            }
        };
        let fetchData = await fetch('http://kln.tkyt.vn/p2ild/public/analyticsEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryTC)
        })
        return fetchData.json()
    }

    async function getEventByTeiByOuTT37() {
        let programID = `WmEGO8Ipykm`
        //get credential user
        let userCredential = await pull(`api/me`)

        let fetchTeiByOU = await pull(`api/trackedEntityInstances.json?&ou=${orgUnitSelectedID}&program=${programID}&ouMode=DESCENDANTS&paging=false`, {
            credentials: "include"
        })
        teiByOu = fetchTeiByOU.trackedEntityInstances.map(tei => tei.trackedEntityInstance)
        let queryTC = {
            "auth": {
                "userID": userCredential.userCredentials.id
                , "lastLogin": userCredential.userCredentials.lastLogin
                , "originInstance": desURL
            }
            , "dataInstance": desURL
            , "payload": {
                "program": programID
                , "dimension": ["col_tei", "col_monthly", "col_yearly", "col_created", "col_ouname", ...TT37Metadata.filter(e => e.id).map(e => e.id)]
                , "filterBoth": { "pe": periods.split(';') }
                , "filterSql": {
                    "tei": teiByOu,
                    "jd8vkowkM7G": ["3", "5"],//COPD + HEN
                    "iXw1Eq7HqjS:not in": ["4"]//Except dead
                }
            }
        };
        let fetchData = await fetch('http://kln.tkyt.vn/p2ild/public/analyticsEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryTC)
        })
        return fetchData.json()
    }

    function prepareDataTable(json, listColumn) {
        function excuteFuncWithIdRowAnchor(idRowAnchor, thisApi) {
            (async () => {
                let dataByRow = []
                let jsonHeaders = json.headers
                let data = _.groupBy(json.rows, jsonHeaders.tei)
                let idx = 0;
                //For list tei
                Object.keys(data).forEach((key, stt) => {
                    let initRow = getTeiEventToArray({ oriJson: json, jsonHeaders, stt: ++stt, teiData: data[key], listColumn, isTT37: idRowAnchor == 'table_id3' ? true : false });
                    dataByRow = dataByRow.concat(initRow)
                })
                console.log(dataByRow)

                $(`#${idRowAnchor}`).DataTable({
                    data: dataByRow,
                    "columnDefs": [],
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                })
                thisApi.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
            })()
        }
        return { excuteFuncWithIdRowAnchor }
    }

    function getTeiEventToArray(data) {
        let { oriJson, jsonHeaders, stt, teiData, listColumn, isTT37 } = data
        //Get monthDataTT37 for tt37

        //prepare each tei tt37
        if (isTT37) {
            let monthDataTT37 = teiData.map(e => {
                let eventDate = new Date(e[jsonHeaders['created']]);
                let dataDatMTDT = e[jsonHeaders['agZdCCAUFKx']]
                let diseaseType = e[jsonHeaders['jd8vkowkM7G']]
                return {
                    eventDate,
                    month: eventDate.getMonth()
                        + 1,//offset for start index at 0
                    dataDatMTDT,
                    oriEvent: e,
                    diseaseType
                }
            })
            //Group type of disease. tei appear multi row
            let groupByDiseaseType = _.groupBy(monthDataTT37, "diseaseType")
            return Object.keys(groupByDiseaseType).reduce((rs, codeBenh, idx, oriArr) => {
                monthByDisease = groupByDiseaseType[codeBenh].sort((a, b) => { return a.eventDate - b.eventDate })
                rs.push(getRowData(stt, defaultTeiInfo = monthByDisease[0].oriEvent, listColumn, monthByDisease))
                return rs;
            }, [])

        }

        //Prepare each event data book
        return teiData.reduce((rs, event, idx, arr) => {
            let colData = getRowData(stt, event, listColumn)
            return rs.push(colData), rs
        }, [])

        function getRowData(stt, event, listColumn, monthDataTT37) {
            event = event.map(e => { return e ? e : "" });
            listColumn = listColumn.filter(e => { return e.col })
            let maxCol = listColumn.sort((a, b) => { return a.col - b.col });
            maxCol = maxCol[maxCol.length - 1].col + 1
            return Array(maxCol).fill('').map((value, colIdx, arrOutput) => {
                if (value != undefined && value != '') return value
                if (colIdx == 0) return stt

                let foundCol = listColumn.find(e => e.col == colIdx)
                if (!foundCol) { return ''; }
                /**
                 * Specific dx,attr
                 **/
                let rawValue = event[jsonHeaders[foundCol.id]];
                switch (true) {
                    case foundCol.isOption:
                        rawValue == ''
                            ? value = ''
                            : value = getValueAsOptionName({ jsonMetaData: oriJson.metaData, event, jsonHeaders, de: foundCol.id })

                        break;
                    case foundCol.month:
                    case foundCol.convertOutputValue != undefined:
                        let paramsCallback = { jsonMetaData: oriJson.metaData, jsonHeaders, event, teiData, foundCol, rawValue, arrOutput }
                        foundCol.month ? paramsCallback['monthDataTT37'] = monthDataTT37 : {}
                        value = foundCol.convertOutputValue(paramsCallback)
                        break
                    default:
                        value = rawValue
                        break;
                }

                return value
            }).map(e => { return e ? e : "" });
        }
    }

    function getValueAsOptionName(data) {
        let { jsonMetaData, event, jsonHeaders, de } = data
        return jsonMetaData.dimensions[de]
            ?.map(e => jsonMetaData.items[e])
            .find(e => e.code == event[jsonHeaders[de]])?.name || ""
    }

    function lastLoad() {
        $("#overlay").fadeOut(300);
        document.getElementById("defaultOpen").click();
        if (intergrateObject) {
            intergrateObject.createButtonWithPosition($("#printing"))
        }
        //On load all requests success
    }

    return {
        requestApiManager: requestApiManager,
        intergrateObject: intergrateObject,
        loadReport: loadReport,
        onDocumentReady: onDocumentReady,
    }
}