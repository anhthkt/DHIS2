var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['reports_copd_hen'] = CopdHen();

function CopdHen() {
    var requestApiManager = [];
    /* Fragment organisationUnit by level */
    var intergrateObject, orgHirch, modal;

    let sumI, sumII, sumIII, sumA, sumB1, sumB2, sumB, sumAll, orgGroupHuyenDVHC;
    let numberColumnCatch = 22;

    let LEVEL_ORG_SELECT_TYPE = {
        TW: { type: 'bctw', tableID: 'bch' },
        TINH: { type: 'bct', tableID: 'bch' },
        HUYEN: { type: 'bch', tableID: 'bch' },
        XA: { type: 'bcx', tableID: 'bch' },
        INDIVIDUAL_OU: { type: 'INDIVIDUAL_OU', tableID: 'bch' },
    }
    var viewportHeight = 0
    var mDataTable;


    function onDocumentReady() {
        $('table.mainTable').css('display', 'none');
        p2ild.hookWebReport235.extendWithIframe();

        // start observing a DOM node
        initObserveHeightViewport();

        // load modal box
        initModalBox()
    }
    //Observer height change
    function initObserveHeightViewport() {
        const resizeObserver = new ResizeObserver(entries => {
            try {
                viewportHeight = entries[0].target.clientHeight
                recalculateHeighScrollTable($('.dataTables_scrollBody'), viewportHeight)
            }
            catch (e) {

            }
        })
        resizeObserver.observe(window.parent.document.body)
    }

    function showTableDataByOrgSelect(idTable) {
        $('table#tableHeader').css('display', '');
        ['bcx', 'bch', 'bct', 'bctw'].forEach(e => {
            e != idTable
                ? $(`table#${e}`).remove()
                : $(`table#${e}`).css('display', '')
        })
    }

    function checkSelectedOrganisationUnit() {
        return new Promise((resolve, reject) => {
            $.get("../api/organisationUnits/" + orgUnitSelectedID + ".json?fields=id,organisationUnitGroups[id]", function (json) {
                orgGroupHuyenDVHC = "W4U1KdFeIJH";
                if (orgUnitSelectedID == "LOdti1gATwC") { //TW
                    sumI = ['mH8ggZyC39Z']
                    sumAll = ['mH8ggZyC39Z']
                    resolve(LEVEL_ORG_SELECT_TYPE.TW)
                } else if (json.organisationUnitGroups.some(x => x.id == "mH8ggZyC39Z")) { //Tinh
                    sumI = ['prigYTb70un']
                    sumII = ['Gut8QH9va65']
                    sumIII = ['OHWM3DxkeMR']
                    sumIV_1 = ['CWJhX4J23Z0', 'YmgWbPl47ua']
                    sumIV_2 = ['EtJWBwBtq3n']
                    sumIV = [].concat(sumIV_1, sumIV_2)
                    sumAll = [].concat(sumI, sumII, sumIII, sumIV)

                    resolve(LEVEL_ORG_SELECT_TYPE.TINH)
                } else if (json.organisationUnitGroups.some(x => x.id == orgGroupHuyenDVHC)) { //Huyen
                    sumI = ['Gut8QH9va65']
                    sumII = ['OHWM3DxkeMR']
                    sumIII = ['EtJWBwBtq3n']
                    sumAll = [].concat(sumI, sumII, sumIII)
                    resolve(LEVEL_ORG_SELECT_TYPE.HUYEN)
                } else if (json.organisationUnitGroups.some(x => x.id == "OHWM3DxkeMR")) { //Xa
                    resolve(LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU)
                    // resolve(LEVEL_ORG_SELECT_TYPE.XA)
                } else {
                    resolve(LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU)
                }
            });
        })
    }

    async function loadReport() {
        var rqContent, rqTotal;

        //Manager api for content
        p2ild.asyncLoadSupport ? rqContent = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['content'] = rqContent;
        rqContent.setHandleSuccessAll(() => {
            rqTotal.triggleAllNetworkTask();
        })

        //Manager api for total
        p2ild.asyncLoadSupport ? rqTotal = p2ild.asyncLoadSupport.createManager() : {};
        this.requestApiManager['total'] = rqTotal;
        rqTotal.setHandleSuccessAll(lastLoad)

        orgHirch = await checkSelectedOrganisationUnit()
        showTableDataByOrgSelect(orgHirch.tableID)
        switch (orgHirch) {
            case LEVEL_ORG_SELECT_TYPE.TW:
                // rqTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`,sumRow(orgGroupSet = undefined, orgGroup = [], "", "TỔNG SỐ"))
                rqTotal.createWorker().createHolderTitleRow('tb1ColumnIncrise', `sumI`, sumRow(orgGroupSet = undefined, orgGroup = sumI, "I", "Chia theo tỉnh/ thành phố"))
                rqContent.createWorker().createHolderTitleRow('sumI', `writeRow`, writeRow(orgGroupSet = undefined, orgGroup = sumI))
                break;
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU:
                rqContent.setHandleSuccessAll(lastLoad)
                rqContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `writeRow`, writeRow(orgGroupSet = undefined, orgGroup = []))
                break;
            case LEVEL_ORG_SELECT_TYPE.TINH:
                if (periods.split(';').length == 1) {
                    initIntergrateData();
                }

                // rqTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sum(sumAll, "", "TỔNG SỐ"))
                rqTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumRow(orgGroupSet = undefined, orgGroup = [], "", "TỔNG SỐ"))

                rqTotal.createWorker().createHolderTitleRow('tongSo', `sumIII`, sumRow(orgGroupSet = undefined, orgGroup = sumIII, "I", "Trạm y tế"))
                rqContent.createWorker().createHolderTitleRow('sumIII', `writeRowByLevelOrgAggregateIII`, writeRow(orgGroupSet = sumIII, orgGroup = [orgGroupHuyenDVHC]))

                rqTotal.createWorker().createHolderTitleRow('writeRowByLevelOrgAggregateIII', `sumII`, sumRow(orgGroupSet = undefined, orgGroup = sumII, "II", "Tuyến huyện"))
                rqContent.createWorker().createHolderTitleRow('sumII', `writeRowByLevelOrgAggregateII`, writeRow(orgGroupSet = sumII, orgGroup = [orgGroupHuyenDVHC]))

                rqTotal.createWorker().createHolderTitleRow('writeRowByLevelOrgAggregateII', `sumI`, sumRow(orgGroupSet = undefined, orgGroup = sumI, "III", "Tuyến tỉnh"))
                rqContent.createWorker().createHolderTitleRow(`sumI`, `writeRowI`, writeRow(orgGroupSet = undefined, orgGroup = sumI))


                // rqContent.createWorker().createHolderTitleRow('sumIII', `writeRowByLevelOrgAggregateIII`, writeRowByLevelOrgAggregate(sumIII, 3))

                rqTotal.createWorker().createHolderTitleRow('writeRowI', `sumIV`, sumRow(orgGroupSet = undefined, orgGroup = sumIV, "IV", "Tư nhân"))
                rqTotal.createWorker().createHolderTitleRow('sumIV', `sumIV_1`, sumRow(orgGroupSet = undefined, orgGroup = sumIV_1, "1", "Tuyến tỉnh"))
                rqContent.createWorker().createHolderTitleRow('sumIV_1', `writeRowIV_1`, writeRow(orgGroupSet = undefined, orgGroup = sumIV_1))
                rqTotal.createWorker().createHolderTitleRow('writeRowIV_1', `sumIV_2`, sumRow(orgGroupSet = undefined, orgGroup = sumIV_2, "2", "Tuyến huyện"))
                rqContent.createWorker().createHolderTitleRow('sumIV_2', `writeRowIV_2`, writeRow(orgGroupSet = undefined, orgGroup = sumIV_2))
                break;
            case LEVEL_ORG_SELECT_TYPE.HUYEN:
                //Intergrate from KLN to DAOTAO;
                if (periods.split(';').length == 1) {
                    initIntergrateData();
                }


                rqTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumRow(orgGroupSet = undefined, orgGroup = sumAll, "", "TỔNG SỐ"))

                rqTotal.createWorker().createHolderTitleRow('tongSo', `sumII`, sumRow(orgGroupSet = undefined, orgGroup = sumII, "I", "Trạm y tế"))
                rqContent.createWorker().createHolderTitleRow('sumII', `writeRowII`, writeRow(orgGroupSet = undefined, orgGroup = sumII))

                rqTotal.createWorker().createHolderTitleRow('writeRowII', `sumI`, sumRow(orgGroupSet = undefined, orgGroup = sumI, "II", "Tuyến huyện"))
                rqContent.createWorker().createHolderTitleRow('sumI', `writeRowI`, writeRow(orgGroupSet = undefined, orgGroup = sumI))

                rqTotal.createWorker().createHolderTitleRow('writeRowI', `sumIII`, sumRow(orgGroupSet = undefined, orgGroup = sumIII, "III", "Tư nhân"))
                rqContent.createWorker().createHolderTitleRow('sumIII', `writeRowIII`, writeRow(orgGroupSet = undefined, orgGroup = sumIII))
                break;
            case LEVEL_ORG_SELECT_TYPE.XA:
                rqContent.setHandleSuccessAll(lastLoad)
                rqContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, setValue())
                break
            default: break;
        }
        rqContent.triggleAllNetworkTask();
    }



    var writeRowByLevelOrgAggregate = function (idGroups, levelOrgAggregate) {
        function excuteFuncWithIdRowAnchor(idRowAnchor) {
            const des = "EOV9udhocyE;BmwDmJEfpcV;CSTXmSTRdZR;bsJwIuyIcbn;wLRzm0JQxtb;MgSGrarL7Vv;GdNUAL4XsGY;h9YceQGYpVB;WSN9HXrRlpB;cvtqUU6t9E9;dg1woh9ttGR;CQejK12Mb51;B7kAT5fSLhp;bTf32ig78h2;Hy1lLntceB1;F9ZtZIej8BB;ksjqe8hLLJ8;uAdP6H1NiFl;d9jT4Rqn1Ms;R3tt8e0dc5R;JhaKYa9ULQe;vy3oKnAOxeT";
            $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&hierarchyMeta=true", (json) => {
                p2ild.ou.remapResultByAncestor(json, levelOrgAggregate).then((remapJson) => {
                    writeRow(idGroups, remapJson).excuteFuncWithIdRowAnchor(idRowAnchor)
                })
            }).catch(e => {
                requestApiManager.findRequestByRowID(idRowAnchor).setDataRequest(e)
                if ([500, 504].includes(e.status)) {
                    requestApiManager.reloadRequestDataByRowID(idRowAnchor)
                } else {
                    requestApiManager.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                }
                reject(e)
            })
        }
        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }
    }



    var writeRow = function (idGroupSet, idGroups, remapJson) {
        function excuteFuncWithIdRowAnchor(idRowAnchor) {
            let htmlReport = "";
            var childOrg = [];
            var stt = 0
            const des = "EOV9udhocyE;BmwDmJEfpcV;CSTXmSTRdZR;bsJwIuyIcbn;wLRzm0JQxtb;MgSGrarL7Vv;GdNUAL4XsGY;h9YceQGYpVB;WSN9HXrRlpB;cvtqUU6t9E9;dg1woh9ttGR;CQejK12Mb51;B7kAT5fSLhp;bTf32ig78h2;Hy1lLntceB1;F9ZtZIej8BB;ksjqe8hLLJ8;uAdP6H1NiFl;d9jT4Rqn1Ms;R3tt8e0dc5R;JhaKYa9ULQe;vy3oKnAOxeT";
            return new Promise((resolve, reject) => {
                if (remapJson) {
                    sumRate(idGroups, idGroupSet).then(jsonRate => {
                        createHTML(remapJson, jsonRate)
                    }).catch(e => {
                        console.log(e)
                    })

                } else {
                    $.get(`../api/analytics.json?dimension=dx:${des}${idGroupSet ? `&filter=FWEcQ1zCRl6:${idGroupSet.join(";")}` : ``}&dimension=ou:${p2ild.ou.stringGroups(idGroups, orgUnitSelectedID)}&filter=pe:${periods}`, function (json) {
                        // let jsonRate = await sumRate(idGroups)
                        createHTML(json)
                    }).catch(e => {
                        requestApiManager.content.findRequestByRowID(idRowAnchor).setDataRequest(e)
                        if ([500, 504].includes(e.status)) {
                            requestApiManager.content.reloadRequestDataByRowID(idRowAnchor)
                        } else {
                            requestApiManager.content.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                            // for (let m = 0; m < numberColumnCatch; m++) {
                            //     htmlReport += "<td align='center'>0</td>";//21
                            // }
                            // htmlReport += "</tr>";
                            // $(`#${idRowAnchor}`).after(htmlReport);
                            resolve()
                        }
                        reject(e);
                    });
                }

                function createHTML(json) {
                    let worker = requestApiManager.content.findRequestByRowID(idRowAnchor)

                    childOrg = json.metaData.dimensions.ou;
                    childOrg.sort(function (a, b) {
                        if (json.metaData.items[a].name < json.metaData.items[b].name) return -1;
                        if (json.metaData.items[a].name > json.metaData.items[b].name) return 1;
                        return 0;
                    })
                    console.log(childOrg)

                    switch (true) {
                        // report district
                        case orgHirch == LEVEL_ORG_SELECT_TYPE.HUYEN
                            && p2ild.reports_copd_hen.intergrateObject
                            && ((idGroupSet && idGroupSet.some(e => { return ['OHWM3DxkeMR', 'mH8ggZyC39Z'].includes(e) }))
                                || (!idGroupSet && idGroups.some(e => { return ['OHWM3DxkeMR', 'mH8ggZyC39Z'].includes(e) }))):
                            p2ild.reports_copd_hen.intergrateObject.addData(json,
                                //Transform element's value to integer (match type data BAOCAO)
                                (row) => {
                                    row.value = parseInt(row.value)
                                    return row;
                                })
                            break;

                        //report province
                        case
                            orgHirch == LEVEL_ORG_SELECT_TYPE.TINH
                            && p2ild.reports_copd_hen.intergrateObject &&
                            ((orgGroup
                                && orgGroup.some(e =>
                                    e == 'prigYTb70un'
                                    || e == 'Gut8QH9va65'

                                    || e == sumIV_1
                                    || e == sumIV_2))
                            ):
                            p2ild.reports_copd_hen.intergrateObject.addData(json,
                                //Transform element's value to integer (match type data BAOCAO)
                                (row) => {
                                    row.value = parseInt(row.value)
                                    return row;
                                })
                            break;
                        default: break;
                    }
                    //push data tu bundle value

                    p2ild.ou.filterCloseOrgUnit(childOrg, periods).then(childOrg => {
                        childOrg.forEach(function (childID) {
                            stt++;
                            htmlReport += "<tr><td align='center'>" + stt + "</td>";
                            htmlReport += "<td>" + json.metaData.items[childID].name + "</td>";
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "EOV9udhocyE", childID), true) + "</td>"; //3
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "BmwDmJEfpcV", childID)) + "</td>"; //4
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "CSTXmSTRdZR", childID)) + "</td>"; //5
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "bsJwIuyIcbn", childID)) + "</td>"; //6
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "wLRzm0JQxtb", childID)) + "</td>"; //7
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "MgSGrarL7Vv", childID)) + "</td>"; //8
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "GdNUAL4XsGY", childID)) + "</td>"; //9
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "h9YceQGYpVB", childID)) + "</td>"; //10
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "WSN9HXrRlpB", childID)) + "</td>"; //11
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "cvtqUU6t9E9", childID)) + "</td>"; //12
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "dg1woh9ttGR", childID)) + "</td>"; //13
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "CQejK12Mb51", childID)) + "</td>"; //14
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "B7kAT5fSLhp", childID)) + "</td>"; //15
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "bTf32ig78h2", childID)) + "</td>"; //16
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "Hy1lLntceB1", childID)) + "</td>"; //17
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "F9ZtZIej8BB", childID)) + "</td>"; //18
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "ksjqe8hLLJ8", childID)) + "</td>"; //19
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "uAdP6H1NiFl", childID)) + "</td>"; //20
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "d9jT4Rqn1Ms", childID)) + "</td>"; //21
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "R3tt8e0dc5R", childID)) + "</td>"; //22
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "JhaKYa9ULQe", childID)) + "</td>"; //23
                            htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(getValueDE_roundDemacial(json, "vy3oKnAOxeT", childID)) + "</td>"; //24
                            

                            htmlReport += "</tr>";
                        })
                        $(`#${idRowAnchor}`).after(htmlReport);
                        requestApiManager.content.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                        resolve();
                    });
                }
            })
        }

        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }

    }

    const evalDataRate = function (data, formatType) {
        let numerator = 0, denominator = 0;
        if (formatType == 'VI') {
            numerator = p2ild.dvu.numberWithThousands(data[0], isRevert = true);
            denominator = p2ild.dvu.numberWithThousands(data[1], isRevert = true);
        } else {
            numerator = data[0]
            denominator = data[1]
        }

        let rate = numerator / denominator;
        return isFinite(rate)
            ? p2ild.dvu.numberWithThousands(
                p2ild.dvu.roundNumber(rate, 3)
            )
            : 'Mẫu số không xác định'
    }

    const sumRate = function (idGroupset, idGroup = '') {
        return new Promise((resolve, reject) => {
            const des = "EOV9udhocyE;BmwDmJEfpcV;CSTXmSTRdZR;bsJwIuyIcbn;wLRzm0JQxtb;MgSGrarL7Vv;GdNUAL4XsGY;h9YceQGYpVB;WSN9HXrRlpB;cvtqUU6t9E9;dg1woh9ttGR;CQejK12Mb51;B7kAT5fSLhp;bTf32ig78h2;Hy1lLntceB1;F9ZtZIej8BB;ksjqe8hLLJ8;uAdP6H1NiFl;d9jT4Rqn1Ms;R3tt8e0dc5R;JhaKYa9ULQe;vy3oKnAOxeT";
            $.get(`../api/analytics.json?dimension=dx:${des}&filter=pe:${periods}${idGroupset ? `&filter=FWEcQ1zCRl6:${idGroupset.join(";")}` : ``}&filter=ou:${p2ild.ou.stringGroups(idGroup, orgUnitSelectedID)}&includeNumDen=true&skipData=false&skipMeta=true`, function (json) {
                resolve(json)
            }).catch(e => {
                reject(e)
            })
        })
    }


    function getValueDE_roundDemacial(json, deID, childID, typeOfData, isConvert) {
        let dataInput = p2ild.dvu.roundNumber(
            p2ild.dvu.getValueDE(json, deID, childID
                , typeOfData = typeOfData
                , isConvertNumber = false), 1
        ).toFixed(1)
        return isConvert == undefined || isConvert
            ? p2ild.dvu.numberWithThousands(`${dataInput}`)
            : dataInput
    }

    var sumRow = function (idGroupSets, idGroups, seri, title) {
        async function excuteFuncWithIdRowAnchor(idRowAnchor) {
            let htmlReport = "";

            htmlReport += "<tr><td align='center'><strong>" + seri + "</strong></td>"; //1
            if (title == "TỔNG SỐ") {
                htmlReport += "<td align='center'><strong>" + title + "</strong></td>"; //2
            } else {
                htmlReport += "<td align='left'><strong>" + title + "</strong></td>"; //2}
            }
            let worker = requestApiManager.total.findRequestByRowID(idRowAnchor)
            try {
                let json = await sumRate(idGroupSets, idGroups)

                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "EOV9udhocyE"), true) + "</strong></td>";//3
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "BmwDmJEfpcV")) + "</strong></td>";//4
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "CSTXmSTRdZR")) + "</strong></td>";//5
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "bsJwIuyIcbn")) + "</strong></td>";//6
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "wLRzm0JQxtb")) + "</strong></td>";//7
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "MgSGrarL7Vv")) + "</strong></td>";//8
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "GdNUAL4XsGY")) + "</strong></td>";//9
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "h9YceQGYpVB")) + "</strong></td>";//10
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "WSN9HXrRlpB")) + "</strong></td>";//11
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "cvtqUU6t9E9")) + "</strong></td>";//12
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "dg1woh9ttGR")) + "</strong></td>";//13
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "CQejK12Mb51")) + "</strong></td>";//14
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "B7kAT5fSLhp")) + "</strong></td>";//15
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "bTf32ig78h2")) + "</strong></td>";//16
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "Hy1lLntceB1")) + "</strong></td>";//17
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "F9ZtZIej8BB")) + "</strong></td>";//18
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "ksjqe8hLLJ8")) + "</strong></td>";//19
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "uAdP6H1NiFl")) + "</strong></td>";//20
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "d9jT4Rqn1Ms")) + "</strong></td>";//21
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "R3tt8e0dc5R")) + "</strong></td>";//22
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = p2ild.dvu.getValueDE(json, "JhaKYa9ULQe")) + "</strong></td>";//23
                htmlReport += "<td align='center'><strong>" + worker.storageData(element = getValueDE_roundDemacial(json, "vy3oKnAOxeT")) + "</strong></td>";//24

                htmlReport += "</tr>";

                $(`#${idRowAnchor}`).after(htmlReport);
                requestApiManager.total.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
            } catch (e) {
                requestApiManager.total.findRequestByRowID(idRowAnchor).setDataRequest(e)
                if ([500, 504].includes(e.status)) {
                    requestApiManager.total.reloadRequestDataByRowID(idRowAnchor)
                } else {
                    requestApiManager.total.setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
                    for (let m = 0; m < numberColumnCatch; m++) {
                        htmlReport += "<td align='center'>0</td>";//21
                    }
                    htmlReport += "</tr>";
                    $(`#${idRowAnchor}`).after(htmlReport);
                }
            }

        }
        return {
            excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor
        }
    }

    function setValue() {
        function excuteFuncWithIdRowAnchor() {
            var stringDEs = [];
            var stringTotalDE = [];
            var stringIndicatorDE = ["indicatorObPZ9pbRElg", "indicatornCzYQzOixoJ", "indicatorZQgBlVc8Oiz", "indicatorh8KlsQcfBPH", "indicatorzDTCa4Dzf5k", "indicatorIfVsI3C5LOI", "indicatorUEETn0DXG42", "indicatorx93sqdxBSFu", "indicatorhFATC1BNgxS", "indicatorWkct5mSdkbU", "indicatortfRZkanta4b", "indicatorOkyHNeTgxhC", "indicatordyI5EtAHBCb", "indicatorRMU7UFc8ZYZ", "indicatoruxlGqfMl9nK", "indicatorzofZsaDKdn4", "indicatorAm7IjTV72Fs", "indicatoryPiMjXazHJM", "indicatorpAaBSFXGxXb", "indicatoru4mLDkCIOxR", "indicatorcLb5kTxeaiu", "indicatorQoxFjNQTsdQ", "indicatorYgSi2HtKO8w", "indicatorn56mHIpHYUI", "indicatorIyxkhrnwXoV", "indicatorPvQhJNlpRu3", "indicatorK5W1jTfnKWa"];
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
                    debugger;
                    let rateInicator = ["VP4twboF7ZM", "GdTB8e1Pyol", "ueFKLer0aah", "WoiOqsp8Upj", "BqDWKT1S373", "wDR9Je91V8p", "kcA4EVfsWDT", "zerzt1oKW2a", "vSEN0sLa14v", "CVYPQqzYUow", "WuzP7CC5yyd", "CsT13RF3j7b"]
                    resultDe.forEach(function (de) {
                        let value = 0;
                        if (rateInicator.includes(de)) {
                            value = getValueDE_roundDemacial(json, de, orgUnitSelectedID);
                        } else {
                            value = p2ild.dvu.getValueDE(json, de, orgUnitSelectedID);
                        }


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
                });
            p2ild.DesignUtil.hidePreload();
        }
        return { excuteFuncWithIdRowAnchor: excuteFuncWithIdRowAnchor }
    }

    function lastLoad() {
        p2ild.DesignUtil.hidePreload()
        if (p2ild.reports_copd_hen.intergrateObject
            && p2ild.reports_copd_hen.intergrateObject.listData.length != 0) {
            p2ild.reports_copd_hen.intergrateObject.createButtonWithPosition($("#printing"))
        }

        initDataTable();
    }
    function recalculateHeighScrollTable(element, viewportHeight) {
        let newHeight = viewportHeight - $('#tableHeader').height() - $('.orgUnits').height() - $('#bch thead').height()- p2ild.hookWebReport235.offSetHeightHeaderViewport
        element.css('height', `${newHeight}`)
        element.css('max-height', `none`)
    }

    function initDataTable() {
        $('.rowHolder').remove();
        console.log('maxHeight scrollY', `${viewportHeight - $('#tableHeader').height() - $('.orgUnits').height() - $('#bch thead').height()}`)
        mDataTable = $(`#${orgHirch.tableID}`).DataTable({
            scrollY: `${viewportHeight - $('#tableHeader').height() - $('.orgUnits').height() - $('#bch thead').height()}px`,
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

    /**
    * Modal box 
    * */
    const initModalBox = function () {
        modal = p2ild.DesignUtil.ModalDialog().builder();
        // Get the modal
        modal.createWithAnchor();
        modal.setOnClickListener(
            //Click close
            () => {
            },
            //click outside Modal
            () => {
            }
        )

    }

    /**
     * Load config integrate data
     * call inside each orgHirch load type
     */
    function initIntergrateData() {
        p2ild.reports_copd_hen.intergrateObject = _.cloneDeep(p2ild.intergrateUtils.DataManager)
        p2ild.reports_copd_hen.intergrateObject.init()
        p2ild.reports_copd_hen.intergrateObject.setOnPublishSuccess((result) => {
            modal.empty();
            modal.appendHTML(result)
            modal.setVerticalPosition('70%')
            modal.show();
        })
    }



    return {
        requestApiManager: requestApiManager,
        intergrateObject: intergrateObject,
        loadReport: loadReport,
        onDocumentReady: onDocumentReady
    }
}