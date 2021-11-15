var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['report_skss'] = skte();

function skte() {
    let requestApiManager = [];
    /* Fragment organisationUnit by level */
    let sumI, sumII, sumIII, sumA, sumB1, sumB2, sumB, sumAll, orgTrucThuocBo, orgThuocBo;
    var intergrateObject, orgHirch, modal, listDataElement;
    let LEVEL_ORG_SELECT_TYPE = {
        TW: { type: 'bctw', tableID: 'bct' },
        TINH: { type: 'bct', tableID: 'bct' },
        HUYEN: { type: 'bch', tableID: 'bct', err: 'Biểu này không áp dụng cho tuyến huyện' },
        XA: { type: 'bcx', tableID: 'bcx', err: 'Biểu này không áp dụng cho tuyến xã' },
        INDIVIDUAL_OU: { type: 'INDIVIDUAL_OU', tableID: 'bct', err: 'Biểu này không được xem từng đơn vị' },
    }
    var listBtn = []

    function onDocumentReady() {
        $('table.mainTable').css('display', 'none');
    }

    //Observer height change
    function initObserveHeightViewport() {
        p2ild.hookWebReport235.offSetHeightHeaderViewport += 50
        viewportHeight = window.innerHeight - $('#tableHeader').height() - $('.orgUnits').height() - p2ild.hookWebReport235.offSetHeightHeaderViewport;

        window.addEventListener("resize", function () {
            viewportHeight = window.innerHeight - $('#tableHeader').height() - $('.orgUnits').height() - p2ild.hookWebReport235.offSetHeightHeaderViewport;
            recalculateHeighScrollTable($('.dataTables_scrollBody'),viewportHeight)
        });
    }

    function checkSelectedOrganisationUnit() {
        return new Promise((resolve, reject) => {
            $.get("../api/organisationUnits/" + orgUnitSelectedID + ".json?fields=id,organisationUnitGroups[id]", function (json) {
                if (orgUnitSelectedID == "LOdti1gATwC") { //TW
                    sumAll = ['mH8ggZyC39Z']
                    orgTrucThuocBo = "ISsmukUNfU8"//Các đơn vị trực thuộc Bộ
                    orgThuocBo = "rY8ZzbdZcim"//Các đơn vị thuộc Bộ
                    p2ild.report_skss.orgHirch = (LEVEL_ORG_SELECT_TYPE.TW)
                } else if (json.organisationUnitGroups.some(x => x.id == "mH8ggZyC39Z")) { //Tinh
                    sumAll = ['W4U1KdFeIJH']
                    p2ild.report_skss.orgHirch = (LEVEL_ORG_SELECT_TYPE.TINH)
                } else if (json.organisationUnitGroups.some(x => x.id == "W4U1KdFeIJH")) { //Huyen
                    sumAll = ['OHWM3DxkeMR']
                    p2ild.report_skss.orgHirch = (LEVEL_ORG_SELECT_TYPE.HUYEN)
                } else if (json.organisationUnitGroups.some(x => x.id == "OHWM3DxkeMR")) { //Xa
                    p2ild.report_skss.orgHirch = (LEVEL_ORG_SELECT_TYPE.XA)
                } else {
                    p2ild.report_skss.orgHirch = (LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU)
                }
                resolve(p2ild.report_skss.orgHirch)
            });
        })
    }
    let numberColumnCatch = 18;

    async function loadReport() {
        var requestApiManager_content, requestApiManagerTotal;

        //Manager api for content
        p2ild.asyncLoadSupport ? requestApiManager_content = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['content'] = requestApiManager_content;
        requestApiManager_content.setHandleSuccessAll(() => {
            requestApiManagerTotal.triggleAllNetworkTask();
        })

        //Manager api for total
        p2ild.asyncLoadSupport ? requestApiManagerTotal = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['total'] = requestApiManagerTotal;
        requestApiManagerTotal.setHandleSuccessAll(lastLoad)

        orgHirch = await checkSelectedOrganisationUnit()
        showTableDataByOrgSelect(orgHirch.tableID)

        switch (orgHirch) {
            case LEVEL_ORG_SELECT_TYPE.TW:
                requestApiManager_content.setHandleSuccessAll(lastLoad)
                requestApiManager_content.createWorker().createHolderTitleRow('tb1ColumnIncrise', `tongSo`, writeRow(
                    [],
                    remapJson = undefined,
                    {
                        labelStt: "",
                        labelOrg: "Tổng số",
                        style: 'style="font-weight: bold;text-align:center"'
                    }
                ))
                requestApiManager_content.createWorker().createHolderTitleRow('tongSo', `writeRowTrucThuocBo`
                    , writeRow(idGroup = orgTrucThuocBo, remapJson = undefined
                        , {
                            labelStt: "",
                            labelOrg: "Đơn vị trực thuộc Bộ y tế",
                            style: 'style="font-weight: bold;"'
                        }))
                requestApiManager_content.createWorker().createHolderTitleRow('writeRowTrucThuocBo', `writeRowThuocBo`
                    , writeRow(idGroup = orgThuocBo
                        , remapJson = undefined
                        , {
                            labelStt: "",
                            labelOrg: "Đơn vị thuộc Bộ, Ngành",
                            style: 'style="font-weight: bold;"'

                        }))

                requestApiManager_content.createWorker().createHolderTitleRow('writeRowThuocBo', `writeRow`, writeRow(sumAll))
                requestApiManager_content.setHandleSuccessAll(lastLoad)
                break;
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU:
                requestApiManager_content.setHandleSuccessAll(lastLoad)
                requestApiManager_content.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `writeRow`, writeRow([]))
                break;
            case LEVEL_ORG_SELECT_TYPE.TINH:
                requestApiManager_content.setHandleSuccessAll(lastLoad)
                requestApiManager_content.createWorker().createHolderTitleRow('tb1ColumnIncrise', `tongSo`, writeRow(
                    [],
                    remapJson = undefined,
                    {
                        labelStt: "",
                        labelOrg: "Tổng số",
                        style: 'style="font-weight: bold;text-align:center"'
                    }
                ))
                requestApiManager_content.createWorker().createHolderTitleRow('tongSo', `writeRowHuyen`, writeRow(sumAll))
                break;
            case LEVEL_ORG_SELECT_TYPE.HUYEN:
                requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                requestApiManager_content.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))

                break;
            case LEVEL_ORG_SELECT_TYPE.XA:
                requestApiManager_content.setHandleSuccessAll(lastLoad)
                requestApiManager_content.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, setValue())
                break
            default: break;
        }
        requestApiManager_content.triggleAllNetworkTask();
    }

    function showTableDataByOrgSelect(idTable) {
        $('table#tableHeader').css('display', '');
        ['bcx', 'bch', 'bct', 'bctw'].forEach(e => {
            e != idTable
                ? $(`table#${e}`).remove()
                : $(`table#${e}`
                ).css('display', '')
        })
    }

    var sumWorker = function (listIDWorker, seri, title) {
        async function excuteFuncWithIdRowAnchor(idRowAnchor) {
            let prepareSumArr = await p2ild.asyncLoadSupport.sumDataWorker(requestApiManager, listIDWorker)

            let htmlReport = "";

            htmlReport += "<tr><td align='center'><strong>" + seri + "</strong></td>"; //1
            if (title == "TỔNG SỐ") {
                htmlReport += "<td align='center'><strong>" + title + "</strong></td>"; //2
            } else {
                htmlReport += "<td align='left'><strong>" + title + "</strong></td>"; //2}
            }
            let worker = requestApiManager.total.findRequestByRowID(idRowAnchor)
            prepareSumArr.forEach((e, idx) => {
                if (idx == 0) {
                    htmlReport += "<td align='center'><strong>" + p2ild.dvu.numberWithThousands(worker.storageData(prepareSumArr[idx], true)) + "</strong></td>";
                } else
                    if (idx == 5) {
                        let cot8 = (worker.storageData(prepareSumArr[4]) / worker.storageData(prepareSumArr[3])) * 100
                        htmlReport += "<td align='center'><strong>" + cot8.toFixed(0) + "</strong></td>";
                        worker.storageData(0)
                    } else
                        if (idx == 9) {
                            htmlReport += "<td align='center'><strong>" + '' + "</strong></td>";//3   
                            worker.storageData(0)
                        } else {
                            htmlReport += "<td align='center'><strong>" + p2ild.dvu.numberWithThousands(worker.storageData(prepareSumArr[idx])) + "</strong></td>";//3
                        }
            })
            htmlReport += "</tr>";

            $(`#${idRowAnchor}`).after(htmlReport);
            requestApiManager.total.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
        }
        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }
    }
    listDataElement = [
        { ID: "mQVws6DxDc8", title: "Tỷ lệ trẻ đẻ non" },
        { ID: "tQmOnQT6FjJ", title: "Tỷ lệ trẻ sơ sinh ngạt" },
        { ID: "mUWdWrnYFVy", title: "Tỷ lệ trẻ được CS EENC sau đẻ thường" },
        { ID: 'Uv3d0w9aXVH', title: "Tỷ lệ trẻ được CS EENC sau mổ đẻ" },
        { ID: 'KlTkuHbxCAp', title: "Tỷ lệ trẻ được CS Kangaroo" },
        { ID: 'WUjT2k7y3iR', title: "Tỷ lệ trẻ sơ sinh có cân nặng < 2500gam" },
        { ID: 'YSdgoLGN4ki', title: "Tỷ lệ trẻ sơ sinh có cân nặng > 4000gam" },
        { ID: 'Wmj0ty0Mi4x', title: "Số trẻ được tiêm Vitamin K1" },
        { ID: 'l3K6PkQGy5k', title: "Số trẻ được tiêm vắc xin VGB" },
        { ID: 'tDREqENh15k', title: "Số trẻ được tiêm vắc xin VGB trong 24 giờ đầu" },
        { ID: 'xG2SyfMAvcr', title: "Số trẻ được sàng lọc sơ sinh" },
        { ID: 'DHSxak4WZBV', title: "Tỷ lệ trẻ sinh ra từ mẹ có HIV" },
        { ID: 'mHkLsXnsDsH', title: "Tỷ lệ trẻ sinh ra từ mẹ có HIV+ được điều trị" },
        { ID: 'wghnisD3c8o', title: "Số TV thai nhi từ khi 22 tuần tuổi đến khi đẻ" },
        { ID: 'st5kPaOJrXp', title: "Tỷ lệ TV trẻ dưới 7 ngày tuổi" },
        { ID: 'ZrKzYrqdmbf', title: "Tỷ suất TV sơ sinh" },
        { ID: 'LyIaB2FKPBo', title: "Tỷ suất TV trẻ dưới 1 tuổi" },
        { ID: 'Ro5TIvsiEPk', title: "Tỷ suất TV trẻ dưới 5 tuổi" }
    ]

    let { getValueDE, roundNumber, numberWithThousands } = p2ild.dvu;
    var writeRow = function (idGroups, remapJson, options) {
        function excuteFuncWithIdRowAnchor(idRowAnchor, worker) {
            options = options || {}
            let { labelStt, labelOrg, style } = options

            let htmlReport = "";
            var childOrg = [];
            var stt = 0
            const des = "eVcAnW2mO1n;UYjF45zrZmV;WxmTd6q3VRn;bRoUldKcvm6;vcS2yMpo1UL;uCfgNzu58BZ;HCLD11DQ08c;SjfMTcD2Mue;AtpZpubv2GW;s00pzu2bFow;LpxNEOc8P6Z;G80uScPn7Sk;qOQNxIAAOeN;bOHkio114aV;Zk3iMA292J2;WSH2AYS257Z;cgZjsIqjO0b;fqb4WJeji1q;LdlETep3e3n;o934x7t0yqy;tjnybRhrkJk;G0m2Yj6aa9t;H5WUNffChO8;YfPAiNsPQBl;L3WIVnCtqqg;glM1J4UA39s;or19ZwQA1TW;whZrfpaC8ef;ZOJBgAbjVtK;LLr12AjrMtu;jUouGVPDWCD;e7DWzWCcfSJ;DqRun3AXTz4"
            return new Promise((resolve, reject) => {
                (async () => {
                    let org = idGroups instanceof Array ? p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) : idGroups;
                    let api = [`../api/analytics.json?dimension=dx:${listDataElement.map(e => e.ID).join(';')}`
                        , `&dimension=ou:${org}`
                        , `&filter=pe:${periods}`
                        , `&skipRounding=true`
                    ].join('')
                    let json = remapJson ? remapJson : await getAPI(api)

                    if (json.err || !json?.metaData?.dimensions?.ou) {
                        worker.getOwnerManager().findRequestByRowID(idRowAnchor).setDataRequest(json)
                        if ([500, 504].includes(json.status)) {
                            worker.getOwnerManager().reloadRequestDataByRowID(idRowAnchor)
                        } else {
                            worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS);
                            if (!json?.metaData?.dimensions?.ou) { resolve(json); return }
                            htmlReport += "<tr>";
                            for (let m = 0; m < numberColumnCatch; m++) {
                                worker.storageData(0, m == 0 ? true : undefined)
                                htmlReport += "<td align='center'>0</td>";//21
                            }
                            htmlReport += "</tr>";
                            $(`#${idRowAnchor}`).after(htmlReport);
                        }
                        resolve(json); return
                    }

                    childOrg = json.metaData.dimensions.ou;
                    childOrg.sort(function (a, b) {
                        if (json.metaData.items[a].name < json.metaData.items[b].name) return -1;
                        if (json.metaData.items[a].name > json.metaData.items[b].name) return 1;
                        return 0;
                    })
                    console.log(childOrg)
                    p2ild.ou.filterCloseOrgUnit(childOrg, periods).then(childOrg => {

                        childOrg.forEach(function (childID) {
                            stt++;

                            htmlReport += `<tr ${style ? style : ''}><td align='center'>${labelStt != '' ? stt : labelStt}</td>`;
                            htmlReport += `<td>${!labelOrg ? json.metaData.items[childID].name : labelOrg}</td>`;

                            cssOps = {
                                defaultCss: `style='font-family:Times, Times New Roman, Georgia, serif'`,
                                ignoreDataCss: `style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'`
                            }
                            listDataElement.forEach((deElement, idx, arr) => {
                                let css;

                                let data = worker.storageData(
                                    numberWithThousands(roundNumber(getValueDE(json, deElement.ID, childID, typeOfData = undefined, isConvertToNumberWithThousand = false), 2))
                                    , idx == 0 ? true : undefined);
                                switch (true) {
                                    default:
                                        css = cssOps.defaultCss;
                                        break;
                                }

                                htmlReport += `<td align='center' ${css}>${data}</td>`;
                            })
                            htmlReport += "</tr>";
                        })
                        $(`#${idRowAnchor}`).after(htmlReport);
                        requestApiManager.content.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                        resolve();
                    });
                })()
            })
        }

        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }

    }

    function setValue() {
        function excuteFuncWithIdRowAnchor(idRowAnchor) {
            var stringDEs = ["eVcAnW2mO1n", "UYjF45zrZmV", "WxmTd6q3VRn", "bRoUldKcvm6", "vcS2yMpo1UL", "uCfgNzu58BZ", "HCLD11DQ08c", "SjfMTcD2Mue", "AtpZpubv2GW", "s00pzu2bFow", "LpxNEOc8P6Z", "G80uScPn7Sk", "qOQNxIAAOeN", "bOHkio114aV", "Zk3iMA292J2", "WSH2AYS257Z", "cgZjsIqjO0b", "fqb4WJeji1q", "LdlETep3e3n", "o934x7t0yqy", "tjnybRhrkJk", "G0m2Yj6aa9t", "H5WUNffChO8", "YfPAiNsPQBl", "L3WIVnCtqqg", "glM1J4UA39s", "or19ZwQA1TW", "whZrfpaC8ef", "ZOJBgAbjVtK", "LLr12AjrMtu", "jUouGVPDWCD", "e7DWzWCcfSJ", "DqRun3AXTz4"];
            // var stringTotalDE = ["totalZYDqKZDP7Rz"];
            var stringIndicatorDE = [];
            var resultDe = [];
            var stringAPI = "";

            stringIndicatorDE.forEach(function (de) {
                var temp = de.replace("indicator", "");
                resultDe.push(temp);
                stringAPI += temp + ";";
            });
            stringTotalDE.forEach(function (de) {
                var temp = de.replace("total", "");
                resultDe.push(temp);
                stringAPI += temp + ";";
            });

            stringDEs.forEach(function (de) {
                resultDe.push(de);
                stringAPI += de + ";";
            });

            $.get("../api/analytics.json?dimension=dx:" +
                stringAPI +
                "&dimension=ou:" +
                orgUnitSelectedID +
                ";&filter=pe:" + periods,
                function (json) {

                    resultDe.forEach(function (de) {
                        var value = p2ild.dvu.getValueDE(json, de, orgUnitSelectedID);

                        //Indicator
                        var idIndi = $("#indicator" + de);
                        if (idIndi != null) {
                            idIndi.text(value);
                        }

                        //Total
                        var idTotal = $("#total" + de);
                        if (idTotal != null) {
                            idTotal.text(value);
                        }

                        //Default de
                        var idDefaultDE;
                        if (de.indexOf(".") != -1) {
                            var splited = de.split(".");
                            idDefaultDE = $("#" + splited[0] + "-" + splited[1] + "-val");
                        } else {
                            idDefaultDE = $("#" + de + "-" + "HllvX50cXC0-val");
                        }
                        if (idDefaultDE != null) {
                            idDefaultDE.text(value);
                        }
                    });
                    requestApiManager.content.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                });
        }
        return { excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor }
    }



    function initDataTable() {
        $('.rowHolder').remove();
        console.log('maxHeight scrollY', `${viewportHeight - $('#tableHeader').height() - $('.orgUnits').height() - $(`#${orgHirch.tableID} thead`).height()}`)
        mDataTable = $(`#${orgHirch.tableID}`).DataTable({
            scrollY: `${viewportHeight - $('#tableHeader').height() - $('.orgUnits').height() - $(`#${orgHirch.tableID} thead`).height()}px`,
            scrollX: 'true',
            scrollCollapse: true,
            paging: false,
            searching: false,
            sort: false
        });
        table.on('draw', function () {
            // your code here
        });
        //Data table highlight row
        $(`#${orgHirch.tableID} tbody`).on('mouseenter', 'td', function () {
            var colIdx = mDataTable.cell(this).index().column;
            $(mDataTable.cells().nodes()).removeClass('highlight');
            $(mDataTable.column(colIdx).nodes()).addClass('highlight');
        });
    }

    function getAPI(api) {
        return new Promise((resolve, reject) => {
            (async () => {
                let dataApi = await fetch(api)
                try {
                    let res = await dataApi.json()
                    resolve(res);
                } catch (e) {
                    resolve({ err: e + '', status: dataApi.status, url: dataApi.url })
                }
            })()
        })
    }

    function recalculateHeighScrollTable(element, viewportHeight) {
        
        element.css('height', `${viewportHeight}`)
        element.css('max-height',viewportHeight )
    }

    function initDataTable() {
        $('.rowHolder').remove();
        mDataTable = $(`#${orgHirch.tableID}`).DataTable({
            scrollY: `${viewportHeight - $('#tableHeader').height() - $('.orgUnits').height() - $(`#${orgHirch.tableID} thead`).height()}px`,
            scrollX: 'true',
            scrollCollapse: true,
            paging: false,
            searching: false,
            sort: false
        });

        //Data table highlight row
        $(`#${orgHirch.tableID} tbody`).on('mouseenter', 'td', function () {
            var colIdx = mDataTable.cell(this).index().column;
            $(mDataTable.cells().nodes()).removeClass('highlight');
            $(mDataTable.column(colIdx).nodes()).addClass('highlight');
        });
    }

    function lastLoad() {
        p2ild.DesignUtil.hidePreload();
        initObserveHeightViewport();
        initDataTable()
    }



    return {
        requestApiManager: requestApiManager,
        loadReport: loadReport,
        onDocumentReady: onDocumentReady,
        checkSelectedOrganisationUnit: checkSelectedOrganisationUnit,
        orgHirch: orgHirch,
    }
}