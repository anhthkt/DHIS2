var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['reports_ttc'] = ThongTinChung();

function ThongTinChung() {
    let requestApiManager = [];
    var defaultPrinting;
    /* Fragment organisationUnit by level */
    let sumI, sumII, sumIII, sumA, sumB1, sumB2, sumB, sumAll;
    var intergrateObject, orgHirch, modal, listDataElement;
    let LEVEL_ORG_SELECT_TYPE = {
        TW: { type: 'bctw', tableID: 'bctw' },
        TINH: { type: 'bct', tableID: 'bct' },
        HUYEN: { type: 'bch', tableID: 'bch' },
        XA: { type: 'bcx', tableID: 'bcx' },
        INDIVIDUAL_OU: { type: 'INDIVIDUAL_OU', tableID: 'bct' },
    }
    var listBtn = []

    function onDocumentReady() {
        $('table.mainTable').css('display', 'none');
    }

    //Observer height change
    function initObserveHeightViewport() {
        p2ild.hookWebReport235.offSetHeightHeaderViewport = 50
        viewportHeight = window.innerHeight - p2ild.hookWebReport235.offSetHeightHeaderViewport;

        window.addEventListener("resize", function () {
            recalculateHeighScrollTable();
        });    
    }

    function checkSelectedOrganisationUnit() {
        return new Promise((resolve, reject) => {
            $.get("../api/organisationUnits/" + orgUnitSelectedID + ".json?fields=id,organisationUnitGroups[id]", function (json) {
                if (orgUnitSelectedID == "LOdti1gATwC") { //TW
                    sumAll = ['mH8ggZyC39Z']
                    this.orgHirch = (LEVEL_ORG_SELECT_TYPE.TW)
                } else if (json.organisationUnitGroups.some(x => x.id == "mH8ggZyC39Z")) { //Tinh
                    sumAll = ['W4U1KdFeIJH']
                    this.orgHirch = (LEVEL_ORG_SELECT_TYPE.TINH)
                } else if (json.organisationUnitGroups.some(x => x.id == "W4U1KdFeIJH")) { //Huyen
                    sumAll = ['OHWM3DxkeMR']
                    this.orgHirch = (LEVEL_ORG_SELECT_TYPE.HUYEN)
                } else if (json.organisationUnitGroups.some(x => x.id == "OHWM3DxkeMR")) { //Xa
                    this.orgHirch = (LEVEL_ORG_SELECT_TYPE.XA)
                } else {
                    this.orgHirch = (LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU)
                }
                resolve(this.orgHirch)
            });
        })
    }
    let numberColumnCatch = 10;

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

        this.orgHirch = await checkSelectedOrganisationUnit()
        showTableDataByOrgSelect(this.orgHirch.tableID)

        switch (this.orgHirch) {
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
                // requestApiManager_content.createWorker().createHolderTitleRow('tongSo', `writeRowTrucThuocBo`
                //     , writeRow(idGroup = orgTrucThuocBo, remapJson = undefined
                //         , {
                //             labelStt: "",
                //             labelOrg: "Đơn vị trực thuộc Bộ y tế",
                //             style: 'style="font-weight: bold;"'
                //         }))
                // requestApiManager_content.createWorker().createHolderTitleRow('writeRowTrucThuocBo', `writeRowThuocBo`
                //     , writeRow(idGroup = orgThuocBo
                //         , remapJson = undefined
                //         , {
                //             labelStt: "",
                //             labelOrg: "Đơn vị thuộc Bộ, Ngành",
                //             style: 'style="font-weight: bold;"'

                //         }))

                requestApiManager_content.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))
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
                : $(`table#${e}`).css('display', '')
        })
    }

    var sumWorker = function (listIDWorker, seri, title) {
        async function excuteFuncWithIdRowAnchor(idRowAnchor, worker) {
            let prepareSumArr = await p2ild.asyncLoadSupport.sumDataWorker(requestApiManager, listIDWorker)
            
            let htmlReport = "";

            htmlReport += "<tr><td align='center'><strong>" + seri + "</strong></td>"; //1
            if (title == "TỔNG SỐ") {
                htmlReport += "<td align='center'><strong>" + title + "</strong></td>"; //2
            } else {
                htmlReport += "<td align='left'><strong>" + title + "</strong></td>"; //2}
            }
            // let worker = requestApiManager.total.findRequestByRowID(idRowAnchor)
            prepareSumArr.forEach((e, idx) => {
                if (idx == 0) {
                    htmlReport += "<td align='center'><strong>" + p2ild.dvu.numberWithThousands(worker.storageData(prepareSumArr[idx], true)) + "</strong></td>";
                } else
                if (idx == 5) {
                    let cot8 = (worker.storageData(prepareSumArr[4]) / worker.storageData(prepareSumArr[3])) * 100
                    htmlReport += "<td align='center'><strong>" + cot8.toFixed(0) + "</strong></td>";
                    worker.storageData(0)
                // } else
                // if (idx == 9) {
                //     htmlReport += "<td align='center'><strong>" + '' + "</strong></td>";//3   
                //     worker.storageData(0)
                } else {
                    htmlReport += "<td align='center'><strong>" + p2ild.dvu.numberWithThousands(worker.storageData(prepareSumArr[idx])) + "</strong></td>";//3
                }
            })
            htmlReport += "</tr>";

            $(`#${idRowAnchor}`).after(htmlReport);
            worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
        }
        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }
    }
    listDataElement = [
        { ID: "ZYDqKZDP7Rz", title: 'Dân số trung bình - Tổng số' },
        { ID: "ZYDqKZDP7Rz.GvoEANq375m", title: 'Dân số trung bình - Nữ' },
        { ID: "zCDQoPon98A.HllvX50cXC0", title: 'Dân số trung bình - >18 tuổi' },
        { ID: 'v9f7yBuGbi6.HllvX50cXC0', title: "Xã phường có TYT" },
        { ID: 'WbZdhvTmYiU.HllvX50cXC0', title: "Tổng số TYT", },
        { ID: 'A1HRS93Y8IU.HllvX50cXC0', title: "TYT có bs làm việc", },
        { ID: 'S117HX9INOg.HllvX50cXC0', title: "Thông bản - tổng số", },
        { ID: 'KaNOeN9lTVb.HllvX50cXC0', title: "Thôn bản - có nv y tế ", }
    ]

    let { getValueDE, roundNumber, numberWithThousands } = p2ild.dvu;
    var writeRow = function (idGroups, remapJson, options) {
        function excuteFuncWithIdRowAnchor(idRowAnchor, worker) {
            options = options || {}
            let { labelStt, labelOrg, style } = options
            let htmlReport = "";
            var childOrg = [];
            var stt = 0
            // const des = "ZYDqKZDP7Rz;ZYDqKZDP7Rz.GvoEANq375m;zCDQoPon98A.HllvX50cXC0;v9f7yBuGbi6.HllvX50cXC0;WbZdhvTmYiU.HllvX50cXC0;A1HRS93Y8IU.HllvX50cXC0;S117HX9INOg.HllvX50cXC0;KaNOeN9lTVb.HllvX50cXC0"
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
                            let cot6 = p2ild.dvu.getValueDE(json, "v9f7yBuGbi6.HllvX50cXC0", childID)
                            let cot7 = p2ild.dvu.getValueDE(json, "WbZdhvTmYiU.HllvX50cXC0", childID)
                            let cot8 = ''
                            if(cot6 == 0){
                                cot8 = 0;
                            } else {
                                cot8 = (p2ild.dvu.numberWithThousands(value = cot7 , isRevert = true)/p2ild.dvu.numberWithThousands(value = cot6 , isRevert = true))*100
                            }
                            htmlReport += `<tr ${style ? style : ''}><td align='center'>${labelStt != '' ? stt : labelStt}</td>`;
                            htmlReport += `<td>${!labelOrg ? json.metaData.items[childID].name : labelOrg}</td>`;

                            cssOps = {
                                defaultCss: `style='font-family:Times, Times New Roman, Georgia, serif'`,
                                ignoreDataCss: `style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'`
                            }
                            listDataElement.forEach((deElement, idx, arr) => {
                                let css;
                                let data = worker.storageData(
                                    numberWithThousands(
                                        roundNumber(
                                            getValueDE(json, deElement.ID, childID, typeOfData = undefined, isConvertToNumberWithThousand = false)
                                            , 2
                                        )
                                    )
                                    , idx == 0 ? true : undefined);
                                switch (true) {
                                    case idx === 5:
                                        css = cssOps.defaultCss;
                                        let data8 = worker.storageData(
                                            numberWithThousands(
                                                roundNumber(
                                                    cot8, 2
                                                )
                                            ), idx == 0 ? true : undefined);
                                        htmlReport += `<td align='center' ${css}>${data8}</td>`;
                                        break;
                                    default:
                                        css = cssOps.defaultCss;
                                        break;
                                }
                                htmlReport += `<td align='center' ${css}>${data}</td>`;
                            })
                            htmlReport += "</tr>";
                        })
                        $(`#${idRowAnchor}`).after(htmlReport);
                        worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
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
            var stringDEs = ["ZYDqKZDP7Rz.GvoEANq375m","zCDQoPon98A.HllvX50cXC0","v9f7yBuGbi6.HllvX50cXC0","WbZdhvTmYiU.HllvX50cXC0","A1HRS93Y8IU.HllvX50cXC0","S117HX9INOg.HllvX50cXC0","KaNOeN9lTVb.HllvX50cXC0"];
            var stringTotalDE = ["totalZYDqKZDP7Rz"];
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

    function recalculateHeighScrollTable() {
        let viewportHeight = window.innerHeight - $('.dataTables_scrollHead').height() - $('#header').height() - p2ild.hookWebReport235.offSetHeightHeaderViewport
        $('.dataTables_scrollBody').css('height', `${viewportHeight}`)
        $('.dataTables_scrollBody').css('max-height', viewportHeight)
        mDataTable.draw();

        //set width of table header to unlimit
        $('.dataTables_scrollHeadInner').css('width', '')
    }

    function initDataTable() {
        $('.rowHolder').remove();
        mDataTable = $(`#${this.orgHirch.tableID}`).DataTable({
            scrollY: `${window.innerHeight - p2ild.hookWebReport235.offSetHeightHeaderViewport}px`,
            scrollX: 'true',
            scrollCollapse: true,
            paging: false,
            searching: false,
            sort: false
        });
        //recalculateHeighScrollTable
        setTimeout(() => recalculateHeighScrollTable(), 1000);
        //Data table highlight row
        $(`#${this.orgHirch.tableID} tbody`).on('mouseenter', 'td', function () {
            var colIdx = mDataTable.cell(this).index().column;
            $(mDataTable.cells().nodes()).removeClass('highlight');
            $(mDataTable.column(colIdx).nodes()).addClass('highlight');
        });
    }

    function lastLoad() {
        p2ild.DesignUtil.hidePreload();
        initObserveHeightViewport.apply(p2ild.reports_ttc);
        p2ild.ExportDataUtils.cloneTableDataWithoutLib.apply(p2ild.ExportDataUtils);
        initDataTable.apply(p2ild.reports_ttc);
    }

    return {
        requestApiManager: requestApiManager,
        loadReport: loadReport,
        onDocumentReady: onDocumentReady,
        checkSelectedOrganisationUnit: checkSelectedOrganisationUnit,
        orgHirch: orgHirch
    }
}