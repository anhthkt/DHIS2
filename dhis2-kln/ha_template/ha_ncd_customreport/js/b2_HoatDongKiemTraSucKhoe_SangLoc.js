var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['hdKiemTraSangLoc'] = hdKiemTraSangLoc();

function hdKiemTraSangLoc() {
    var requestApiManager = [];
    /* Fragment organisationUnit by level */
    let sumI, sumII, sumIII, sumA, sumB1, sumB2, sumB, sumAll;
    var intergrateObject, orgHirch, modal;
    let LEVEL_ORG_SELECT_TYPE = {
        TW: { type: 'bctw', tableID: 'bch' },
        TINH: { type: 'bct', tableID: 'bch' },
        HUYEN: { type: 'bch', tableID: 'bch' },
        XA: { type: 'bcx', tableID: 'bcx' },
        INDIVIDUAL_OU: { type: 'INDIVIDUAL_OU', tableID: 'bch' },
    }
    var listBtn = []

    function onDocumentReady() {
        $('table.mainTable').css('display', 'none')
    }

    function checkSelectedOrganisationUnit() {
        return new Promise((resolve, reject) => {
            $.get("../api/organisationUnits/" + orgUnitSelectedID + ".json?fields=id,organisationUnitGroups[id]", function (json) {
                if (orgUnitSelectedID == "LOdti1gATwC") { //TW
                    sumAll = ['mH8ggZyC39Z']
                    resolve(LEVEL_ORG_SELECT_TYPE.TW)
                } else if (json.organisationUnitGroups.some(x => x.id == "mH8ggZyC39Z")) { //Tinh
                    sumI = [
                        'prigYTb70un'//Tỉnh_Các cơ sở y tế công có dịch vụ khám chữa bệnh
                    ]
                    sumII = ['Gut8QH9va65']
                    sumIII = ['OHWM3DxkeMR']
                    resolve(LEVEL_ORG_SELECT_TYPE.TINH)
                } else if (json.organisationUnitGroups.some(x => x.id == "W4U1KdFeIJH")) { //Huyen
                    // sumAll = ['OHWM3DxkeMR']
                    sumI = ['Gut8QH9va65']
                    sumII = ['OHWM3DxkeMR']
                    resolve(LEVEL_ORG_SELECT_TYPE.HUYEN)
                } else if (json.organisationUnitGroups.some(x => x.id == "OHWM3DxkeMR")) { //Xa
                    resolve(LEVEL_ORG_SELECT_TYPE.XA)
                } else {
                    resolve(LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU)
                }
            });
        })
    }
    let numberColumnCatch = 9;

    async function loadReport() {
        var requestApiManagerContent, requestApiManagerTotalAll, requestApiManagerTotalContent;

        //Manager api for content
        p2ild.asyncLoadSupport ? requestApiManagerContent = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['content'] = requestApiManagerContent;
        requestApiManagerContent.setHandleSuccessAll(() => {requestApiManagerTotalContent.triggleAllNetworkTask();})
        //Manager api for total content
        p2ild.asyncLoadSupport ? requestApiManagerTotalContent = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['totalContent'] = requestApiManagerTotalContent;
        requestApiManagerTotalContent.setHandleSuccessAll(() => { requestApiManagerTotalAll.triggleAllNetworkTask(); })
        //Manager api for total all
        p2ild.asyncLoadSupport ? requestApiManagerTotalAll = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['totalAll'] = requestApiManagerTotalAll;
        requestApiManagerTotalAll.setHandleSuccessAll(lastLoad)

        orgHirch = await checkSelectedOrganisationUnit()
        showTableDataByOrgSelect(orgHirch.tableID)

        switch (orgHirch) {
            case LEVEL_ORG_SELECT_TYPE.TW:
                requestApiManagerTotalContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`,
                    sumWorker([
                        /** List worker's ID */
                        'writeRow'
                    ], "", "TỔNG SỐ"))
                requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(
                    ouGroupSet = undefined
                        , ouGroup = sumAll))
                requestApiManagerTotalContent.setHandleSuccessAll(lastLoad)
                break;
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU:
                requestApiManagerContent.setHandleSuccessAll(lastLoad)
                requestApiManagerContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `writeRow`, writeRow(ouGroupSet = undefined
                    , ouGroup = ['']))
                break;
            case LEVEL_ORG_SELECT_TYPE.TINH:
                /** ALL */
                requestApiManagerTotalAll.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `SumAll`,
                    sumWorker([
                        //List worker's ID
                        'sumI', 'sumII', 'sumIII'
                    ], "", "TỔNG SỐ"))
                /** Province */
                requestApiManagerTotalContent.createWorker().createHolderTitleRow(`SumAll`, `sumI`
                    , sumWorker([
                        //List worker's ID
                        'writeRowI'
                    ], "I", "Tuyến tỉnh"))
                requestApiManagerContent.createWorker().createHolderTitleRow('sumI', `writeRowI`,
                    writeRow(
                        ouGroupSet = undefined
                        , ouGroup = sumI
                    ))
                /** District */
                requestApiManagerTotalContent.createWorker().createHolderTitleRow(`writeRowI`, `sumII`
                    , sumWorker([
                        //List worker's ID
                        'writeRowII'
                    ], "II", "Tuyến huyện"))
                requestApiManagerContent.createWorker().createHolderTitleRow('sumII', `writeRowII`,
                    writeRow(
                        ouGroupSet = sumII
                        , ouGroup = ["W4U1KdFeIJH"]
                    ))
                /** Ward */
                requestApiManagerTotalContent.createWorker().createHolderTitleRow(`writeRowII`, `sumIII`
                    , sumWorker([
                        //List worker's ID
                        'writeRowIII'
                    ], "III", "Tuyến xã"))
                requestApiManagerContent.createWorker().createHolderTitleRow('sumIII', `writeRowIII`,
                    writeRow(
                        ouGroupSet = sumIII
                        , ouGroup = ["W4U1KdFeIJH"]
                    ))
                break;
            case LEVEL_ORG_SELECT_TYPE.HUYEN:
                requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(
                    ouGroupSet = undefined
                    , ouGroup = sumAll
                ))

                var btn = _.cloneDeep(ApproveButtonBuilder)
                btn.initButton(btn.BUTTON_TYPE.TYPE_APPROVE, orgUnitSelectedID, ["ZFvlCbqkwTz"], periods)
                btn.createButtonWithPosition($("#printing"))
                break;
            case LEVEL_ORG_SELECT_TYPE.XA:
                requestApiManagerContent.setHandleSuccessAll(lastLoad)
                requestApiManagerContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, setValue())
                break
            default: break;
        }
        requestApiManagerContent.triggleAllNetworkTask();
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
            prepareSumArr.forEach((e, idx) => {
                htmlReport += "<td align='center'><strong>" + p2ild.dvu.numberWithThousands(worker.storageData(prepareSumArr[idx])) + "</strong></td>";//3
            })
            htmlReport += "</tr>";

            $(`#${idRowAnchor}`).after(htmlReport);
            worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
        }
        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }
    }

    var writeRow = function (idGroupSet, idGroups) {
        function excuteFuncWithIdRowAnchor(idRowAnchor, worker) {
            let htmlReport = "";
            var childOrg = [];
            var stt = 0
            const des = "rY84XQXKUBA.HllvX50cXC0;ja9HF1ynm9G.HllvX50cXC0;rjHA1OEn2PU.HllvX50cXC0;xdvQPapnQi9.HllvX50cXC0;zissP9SsIS2.HllvX50cXC0;rP3vIQJm4wX.HllvX50cXC0"
            return new Promise((resolve, reject) => {
                $.get(`../api/analytics.json?dimension=dx:${des}${idGroupSet ? `&filter=FWEcQ1zCRl6:${idGroupSet.join(";")}` : ``}&dimension=ou:${p2ild.ou.stringGroups(idGroups, orgUnitSelectedID)}&filter=pe:${periods}&skipRounding=true`, function (json) {
                    childOrg = json.metaData.dimensions.ou;
                    childOrg.sort(function (a, b) {
                        if (json.metaData.items[a].name < json.metaData.items[b].name) return -1;
                        if (json.metaData.items[a].name > json.metaData.items[b].name) return 1;
                        return 0;
                    })
                    console.log(childOrg)
                    p2ild.ou.filterCloseOrgUnit(childOrg, periods).then(childOrg => {


                        childOrg.forEach(function (childID) {
                            let strButton = ""
                            if (idGroups != "OHWM3DxkeMR") {
                                let btn = _.cloneDeep(ApproveButtonBuilder)
                                btn.initButton(btn.BUTTON_TYPE.TYPE_ACCEPT, childID, ["ZFvlCbqkwTz"], periods)
                                strButton = btn.toStringHTML()
                                listBtn.push(btn);
                            }
                            // if ((idGroupSet && idGroupSet.some(e => { return ['OHWM3DxkeMR', 'mH8ggZyC39Z'].includes(e) }))
                            //     || (!idGroupSet && idGroups.some(e => { return ['OHWM3DxkeMR', 'mH8ggZyC39Z'].includes(e) }))
                            // ) {
                            //     htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(element = getValueDE_roundDemacial(json, "ZQgBlVc8Oiz", childID)) + "</td>" //5
                            // }
                            // else {
                            //     worker.storageData([0, 0])
                            //     htmlReport += `<td align='center' style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'></td>`; //5
                            // }
                            stt++;
                            htmlReport += "<tr><td align='center'>" + stt + "</td>";
                            htmlReport += "<td>" + json.metaData.items[childID].name + "<br>" + strButton + "</td>";
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "rY84XQXKUBA.HllvX50cXC0", childID), true) + "</td>"; //3
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "ja9HF1ynm9G.HllvX50cXC0", childID)) + "</td>"; //4
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "rjHA1OEn2PU.HllvX50cXC0", childID)) + "</td>"; //5
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "xdvQPapnQi9.HllvX50cXC0", childID)) + "</td>"; //6
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "zissP9SsIS2.HllvX50cXC0", childID)) + "</td>"; //7
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "rP3vIQJm4wX.HllvX50cXC0", childID)) + "</td>"; //8
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "", childID)) + "</td>"; //9
                            htmlReport += "</tr>";
                        })
                        $(`#${idRowAnchor}`).after(htmlReport);
                        worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                        resolve();


                    });
                }).catch(e => {
                    worker.getOwnerManager().findRequestByRowID(idRowAnchor).setDataRequest(e)
                    if ([500, 504].includes(e.status)) {
                        worker.getOwnerManager().reloadRequestDataByRowID(idRowAnchor)
                    } else {
                        worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                        for (let m = 0; m < numberColumnCatch; m++) {
                            htmlReport += "<td align='center'>0</td>";//21
                        }
                        htmlReport += "</tr>";
                        $(`#${idRowAnchor}`).after(htmlReport);
                    }
                    reject(e);
                });
            })
        }

        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }

    }

    function setValue() {
        function excuteFuncWithIdRowAnchor(idRowAnchor) {
            var stringDEs = ["rY84XQXKUBA.HllvX50cXC0", "ja9HF1ynm9G.HllvX50cXC0", "rjHA1OEn2PU.HllvX50cXC0", "xdvQPapnQi9.HllvX50cXC0", "zissP9SsIS2.HllvX50cXC0", "rP3vIQJm4wX.HllvX50cXC0"];
            var stringTotalDE = [];
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
                    worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                });
        }
        return { excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor }
    }

    function lastLoad() {
        p2ild.DesignUtil.hidePreload()
        if (listBtn.length != 0) {
            listBtn.forEach(e => {
                e.setStateButton()
                e.addOnClickBtn()
            })

        }
    }

    return {
        loadReport: loadReport,
        requestApiManager: requestApiManager,
        onDocumentReady: onDocumentReady
    }
}