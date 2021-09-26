function defineHeader(jsonHeaderDhis) {
    return jsonHeaderDhis.reduce((total, eHeader, idx, arr) => {
        if (eHeader.name == "dx") total['iDe'] = idx
        else if (eHeader.name == "ou") total['iOu'] = idx;
        else if (eHeader.name == "pe") total['iPe'] = idx;
        else if (eHeader.name == "value") total['iValue'] = idx;

        return total
    }, {});
}
function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
}
function numberWithThousands(num) {
    let n = num.toString(),
        p = n.indexOf(',');
    let result = '0';
    let arrDecimal = n.split(".")
    if (arrDecimal.length == 1) {
        result = n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i) {
            return p < 0 || i < p ? ($0 + '.') : $0;
        });
    } else {
        let nWholeNumber = n.split(".")[0].replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i) {
            return p < 0 || i < p ? ($0 + '.') : $0;
        })
        let nDecimal = n.split(".")[1]
        result = `${nWholeNumber},${nDecimal}`
    }
    return result
}

    function getLastesPeriodValueByAncestor(json, de, ou, isConvertToNumberWithThousand) {
        /**
         * INUPT:
         * require json is output from remapResultByAncestor()
         * require dimension pe (exam: ..api/../dimension=dx:...&demension=pe:...)
         * 
         * OUTPUT:
         * return value of the last @param periods
         */
        var dh
        let lastesPeriod = periods.split(";").pop();
        try {
            dh = defineHeader(json.headers);
        } catch (e) {
            console.log("require METADATA in json response")
            return 0;
        }

        let result = cloneObject(json)

        result.rows = result.rows.filter(row => row[dh.iDe] == de).filter(e => {
            return result.metaData.ouHierarchy[ou] == undefined ?
                result.metaData.ouHierarchy[e[dh.iOu]].includes(ou) :
                e[dh.iOu] == ou
        })

        let outputResult =
            //filter row match de,ou and with last pe exists data
            cloneObject(result.metaData.dimensions.ou).reduce((newRows, childOu) => {
                var row =
                    result.rows.filter(m => m[dh.iOu] == childOu && m[dh.iPe] == lastesPeriod).length != 0 ?
                    result.rows.filter(m => m[dh.iOu] == childOu && m[dh.iPe] == lastesPeriod).sort((a, b) => b[dh.iPe] - a[dh.iPe])[0] : {}
                newRows.push(row)
                return newRows
            }, [])
            //Sum de
            .reduce((sum, row) => {
                return sum += row[dh.iValue] != undefined ? defineValueWithTypeData(row[dh.iValue]) : 0, sum
            }, 0);
        if (isConvertToNumberWithThousand != undefined || isConvertToNumberWithThousand == false) {
            return outputResult
        } else {
            return numberWithThousands(outputResult)
        }

    }

    module.export= {
        getLastesPeriodValueByAncestor:getLastesPeriodValueByAncestor
    }