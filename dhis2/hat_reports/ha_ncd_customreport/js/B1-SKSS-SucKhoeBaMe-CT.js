var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['reports_ttc'] = ThongTinChung();

function ThongTinChung() {
    let requestApiManager = [];
    /* Fragment organisationUnit by level */
    let sumI, sumII, sumIII, sumA, sumB1, sumB2, sumB, sumAll;
    var intergrateObject, orgHirch, modal;
    let LEVEL_ORG_SELECT_TYPE = {
        TW: { type: 'bctw', tableID: 'bctw' },
        TINH: { type: 'bct', tableID: 'bct' },
        HUYEN: { type: 'bch', tableID: 'bch' },
        XA: { type: 'bcx', tableID: 'bcx' },
        INDIVIDUAL_OU: { type: 'INDIVIDUAL_OU', tableID: 'bct' },
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
                    sumAll = ['W4U1KdFeIJH']
                    resolve(LEVEL_ORG_SELECT_TYPE.TINH)
                } else if (json.organisationUnitGroups.some(x => x.id == "W4U1KdFeIJH")) { //Huyen
                    sumAll = ['OHWM3DxkeMR']
                    resolve(LEVEL_ORG_SELECT_TYPE.HUYEN)
                } else if (json.organisationUnitGroups.some(x => x.id == "OHWM3DxkeMR")) { //Xa
                    resolve(LEVEL_ORG_SELECT_TYPE.XA)
                } else {
                    resolve(LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU)
                }
            });
        })
    }
    let numberColumnCatch = 10;

    async function loadReport() {
        var requestApiManagerContent, requestApiManagerTotal;

        //Manager api for content
        p2ild.asyncLoadSupport ? requestApiManagerContent = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['content'] = requestApiManagerContent;
        requestApiManagerContent.setHandleSuccessAll(() => {
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
                requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))
                break;
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU:
                requestApiManagerContent.setHandleSuccessAll(lastLoad)
                requestApiManagerContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `writeRow`, writeRow([]))
                break;
            case LEVEL_ORG_SELECT_TYPE.TINH:
                requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))
                break;
            case LEVEL_ORG_SELECT_TYPE.HUYEN:
                requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))

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
                if(idx == 0) {
                    htmlReport += "<td align='center'><strong>" + p2ild.dvu.numberWithThousands(worker.storageData(prepareSumArr[idx], true)) + "</strong></td>";
                }else
                if(idx == 5) {
                    let cot8 = (worker.storageData(prepareSumArr[4])/worker.storageData(prepareSumArr[3]))*100
                    htmlReport += "<td align='center'><strong>" + cot8.toFixed(0) + "</strong></td>";
                    worker.storageData(0)
                }else
                if(idx == 9) {
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

    var writeRow = function (idGroups) {
        function excuteFuncWithIdRowAnchor(idRowAnchor) {
            let htmlReport = "";
            var childOrg = [];
            var stt = 0
            const des = "ZYDqKZDP7Rz;ZYDqKZDP7Rz.GvoEANq375m;zCDQoPon98A.HllvX50cXC0;v9f7yBuGbi6.HllvX50cXC0;WbZdhvTmYiU.HllvX50cXC0;A1HRS93Y8IU.HllvX50cXC0;S117HX9INOg.HllvX50cXC0;KaNOeN9lTVb.HllvX50cXC0"
            return new Promise((resolve, reject) => {
                $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {


                    let worker = requestApiManager.content.findRequestByRowID(idRowAnchor)

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
                            stt++;
                            let cot6 = p2ild.dvu.getValueDE(json, "v9f7yBuGbi6.HllvX50cXC0", childID)
                            let cot7 = p2ild.dvu.getValueDE(json, "WbZdhvTmYiU.HllvX50cXC0", childID)
                            let cot8 = ''
                            if(cot6 == 0){
                                cot8 = 0;
                            } else {
                                cot8 = (p2ild.dvu.numberWithThousands(value = cot7 , isRevert = true)/p2ild.dvu.numberWithThousands(value = cot6 , isRevert = true))*100
                            }
                            htmlReport += "<tr><td align='center'>" + stt + "</td>";//1
                            htmlReport += "<td>" + json.metaData.items[childID].name + "<br>" + strButton + "</td>";//2
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "ZYDqKZDP7Rz", childID), true) + "</td>"; //3
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "ZYDqKZDP7Rz.GvoEANq375m", childID)) + "</td>"; //4
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "zCDQoPon98A.HllvX50cXC0", childID)) + "</td>"; //5
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(cot6) + "</td>"; //6
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(cot7) + "</td>"; //7
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(cot8.toFixed(0)) + "</td>"; //8 Ty le
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "A1HRS93Y8IU.HllvX50cXC0", childID)) + "</td>"; //9
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "S117HX9INOg.HllvX50cXC0", childID)) + "</td>"; //10
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "KaNOeN9lTVb.HllvX50cXC0", childID)) + "</td>"; //11
                            // htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + "" + "</td>"; //12
                            // worker.storageData(0)
                            htmlReport += "</tr>";
                        })
                        $(`#${idRowAnchor}`).after(htmlReport);
                        requestApiManager.content.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                        resolve();


                    });
                }).catch(e => {
                    requestApiManager.content.findRequestByRowID(idRowAnchor).setDataRequest(e)
                    if ([500, 504].includes(e.status)) {
                        requestApiManager.content.content.reloadRequestDataByRowID(idRowAnchor)
                    } else {
                        requestApiManager.content.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
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
        requestApiManager: requestApiManager,
        loadReport: loadReport,
        onDocumentReady: onDocumentReady
    }
}