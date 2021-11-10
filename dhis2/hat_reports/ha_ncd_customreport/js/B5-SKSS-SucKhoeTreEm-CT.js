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
    let numberColumnCatch = 33;

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
                // requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                // requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))
                requestApiManagerContent.setHandleSuccessAll(lastLoad)
                requestApiManagerContent.createWorker().createHolderTitleRow('tb1ColumnIncrise', `tongSo`, writeRow([]))
                requestApiManagerContent.createWorker().createHolderTitleRow('tongSo', `writeRow`, writeRow(sumAll))
                break;
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_OU:
                requestApiManagerContent.setHandleSuccessAll(lastLoad)
                requestApiManagerContent.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `writeRow`, writeRow([]))
                break;
            case LEVEL_ORG_SELECT_TYPE.TINH:
                // requestApiManagerTotal.createWorker().createHolderTitleRow(`tb1ColumnIncrise`, `tongSo`, sumWorker(['writeRow'], "", "TỔNG SỐ"))
                requestApiManagerContent.setHandleSuccessAll(lastLoad)
                requestApiManagerContent.createWorker().createHolderTitleRow('tb1ColumnIncrise', `tongSo`, writeRow([]))
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
            const des = "eVcAnW2mO1n;UYjF45zrZmV;WxmTd6q3VRn;bRoUldKcvm6;vcS2yMpo1UL;uCfgNzu58BZ;HCLD11DQ08c;SjfMTcD2Mue;AtpZpubv2GW;s00pzu2bFow;LpxNEOc8P6Z;G80uScPn7Sk;qOQNxIAAOeN;bOHkio114aV;Zk3iMA292J2;WSH2AYS257Z;cgZjsIqjO0b;fqb4WJeji1q;LdlETep3e3n;o934x7t0yqy;tjnybRhrkJk;H5WUNffChO8;YfPAiNsPQBl;L3WIVnCtqqg;L3WIVnCtqqg;glM1J4UA39s;whZrfpaC8ef;whZrfpaC8ef;ZOJBgAbjVtK;LLr12AjrMtu;jUouGVPDWCD;e7DWzWCcfSJ;DqRun3AXTz4"
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
                            if(idGroups == ''){
                                {
                                    htmlReport += "<tr style='font-weight:bold'><td align='center'>" + "" + "</td>";//1
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + "TỔNG SỐ" + "</td>";//2
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "eVcAnW2mO1n", childID), true) + "</td>"; //3
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "UYjF45zrZmV", childID)) + "</td>"; //4
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "WxmTd6q3VRn", childID, undefined, false),2), false)) + "</td>"; //5
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "bRoUldKcvm6", childID, undefined, false),2), false)) + "</td>"; //6
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "vcS2yMpo1UL", childID, undefined, false),2), false)) + "</td>"; //7
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "uCfgNzu58BZ", childID, undefined, false),2), false)) + "</td>"; //8
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "HCLD11DQ08c", childID, undefined, false),2), false)) + "</td>"; //9
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "SjfMTcD2Mue", childID, undefined, false),2), false)) + "</td>"; //10
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "AtpZpubv2GW", childID, undefined, false),2), false)) + "</td>"; //11
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "s00pzu2bFow", childID, undefined, false),2), false)) + "</td>"; //12
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "LpxNEOc8P6Z", childID, undefined, false),2), false)) + "</td>"; //13
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "G80uScPn7Sk", childID, undefined, false),2), false)) + "</td>"; //14
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "qOQNxIAAOeN", childID, undefined, false),2), false)) + "</td>"; //15
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "bOHkio114aV", childID, undefined, false),2), false)) + "</td>"; //16
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "Zk3iMA292J2", childID, undefined, false),2), false)) + "</td>"; //17
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "WSH2AYS257Z", childID, undefined, false),2), false)) + "</td>"; //18
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "cgZjsIqjO0b", childID, undefined, false),2), false)) + "</td>"; //19
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "fqb4WJeji1q", childID, undefined, false),2), false)) + "</td>"; //20
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "LdlETep3e3n", childID, undefined, false),2), false)) + "</td>"; //21
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "o934x7t0yqy", childID, undefined, false),2), false)) + "</td>"; //22
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "tjnybRhrkJk", childID, undefined, false),2), false)) + "</td>"; //23
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "H5WUNffChO8", childID, undefined, false),2), false)) + "</td>"; //24
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "YfPAiNsPQBl", childID, undefined, false),2), false)) + "</td>"; //25
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "L3WIVnCtqqg", childID, undefined, false),2), false)) + "</td>"; //26
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "L3WIVnCtqqg", childID, undefined, false),2), false)) + "</td>"; //27
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "glM1J4UA39s", childID, undefined, false),2), false)) + "</td>"; //28
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "whZrfpaC8ef", childID, undefined, false),2), false)) + "</td>"; //29
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "whZrfpaC8ef", childID, undefined, false),2), false)) + "</td>"; //30
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "ZOJBgAbjVtK", childID, undefined, false),2), false)) + "</td>"; //31
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "LLr12AjrMtu", childID, undefined, false),2), false)) + "</td>"; //32
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "jUouGVPDWCD", childID, undefined, false),2), false)) + "</td>"; //33
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "e7DWzWCcfSJ", childID)) + "</td>"; //34
                                    htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "DqRun3AXTz4", childID)) + "</td>"; //35
                                    // htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + "" + "</td>"; //12
                                    // worker.storageData(0)
                                    htmlReport += "</tr>";
                                }
                            }else{
                                htmlReport += "<tr><td align='center'>" + stt + "</td>";//1
                                htmlReport += "<td>" + json.metaData.items[childID].name + "<br>" + strButton + "</td>";//2
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "eVcAnW2mO1n", childID), true) + "</td>"; //3
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "UYjF45zrZmV", childID)) + "</td>"; //4
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "WxmTd6q3VRn", childID, undefined, false),2), false)) + "</td>"; //5
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "bRoUldKcvm6", childID, undefined, false),2), false)) + "</td>"; //6
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "vcS2yMpo1UL", childID, undefined, false),2), false)) + "</td>"; //7
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "uCfgNzu58BZ", childID, undefined, false),2), false)) + "</td>"; //8
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "HCLD11DQ08c", childID, undefined, false),2), false)) + "</td>"; //9
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "SjfMTcD2Mue", childID, undefined, false),2), false)) + "</td>"; //10
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "AtpZpubv2GW", childID, undefined, false),2), false)) + "</td>"; //11
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "s00pzu2bFow", childID, undefined, false),2), false)) + "</td>"; //12
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "LpxNEOc8P6Z", childID, undefined, false),2), false)) + "</td>"; //13
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "G80uScPn7Sk", childID, undefined, false),2), false)) + "</td>"; //14
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "qOQNxIAAOeN", childID, undefined, false),2), false)) + "</td>"; //15
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "bOHkio114aV", childID, undefined, false),2), false)) + "</td>"; //16
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "Zk3iMA292J2", childID, undefined, false),2), false)) + "</td>"; //17
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "WSH2AYS257Z", childID, undefined, false),2), false)) + "</td>"; //18
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "cgZjsIqjO0b", childID, undefined, false),2), false)) + "</td>"; //19
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "fqb4WJeji1q", childID, undefined, false),2), false)) + "</td>"; //20
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "LdlETep3e3n", childID, undefined, false),2), false)) + "</td>"; //21
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "o934x7t0yqy", childID, undefined, false),2), false)) + "</td>"; //22
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "tjnybRhrkJk", childID, undefined, false),2), false)) + "</td>"; //23
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "H5WUNffChO8", childID, undefined, false),2), false)) + "</td>"; //24
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "YfPAiNsPQBl", childID, undefined, false),2), false)) + "</td>"; //25
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "L3WIVnCtqqg", childID, undefined, false),2), false)) + "</td>"; //26
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "L3WIVnCtqqg", childID, undefined, false),2), false)) + "</td>"; //27
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "glM1J4UA39s", childID, undefined, false),2), false)) + "</td>"; //28
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "whZrfpaC8ef", childID, undefined, false),2), false)) + "</td>"; //29
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "whZrfpaC8ef", childID, undefined, false),2), false)) + "</td>"; //30
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "ZOJBgAbjVtK", childID, undefined, false),2), false)) + "</td>"; //31
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "LLr12AjrMtu", childID, undefined, false),2), false)) + "</td>"; //32
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.numberWithThousands(p2ild.dvu.roundNumber(p2ild.dvu.getValueDE(json, "jUouGVPDWCD", childID, undefined, false),2), false)) + "</td>"; //33
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "e7DWzWCcfSJ", childID)) + "</td>"; //34
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + worker.storageData(p2ild.dvu.getValueDE(json, "DqRun3AXTz4", childID)) + "</td>"; //35
                                // htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + "" + "</td>"; //12
                                // worker.storageData(0)
                                htmlReport += "</tr>";
                            }
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
            var stringDEs = ["eVcAnW2mO1n","UYjF45zrZmV","WxmTd6q3VRn","bRoUldKcvm6","vcS2yMpo1UL","uCfgNzu58BZ","HCLD11DQ08c","SjfMTcD2Mue","AtpZpubv2GW","s00pzu2bFow","LpxNEOc8P6Z","G80uScPn7Sk","qOQNxIAAOeN","bOHkio114aV","Zk3iMA292J2","WSH2AYS257Z","cgZjsIqjO0b","fqb4WJeji1q","LdlETep3e3n","o934x7t0yqy","tjnybRhrkJk","H5WUNffChO8","YfPAiNsPQBl","L3WIVnCtqqg","L3WIVnCtqqg","glM1J4UA39s","whZrfpaC8ef","whZrfpaC8ef","ZOJBgAbjVtK","LLr12AjrMtu","jUouGVPDWCD","e7DWzWCcfSJ","DqRun3AXTz4"];
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