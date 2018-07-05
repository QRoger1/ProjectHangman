function strMapToObject(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {        
        obj[k] = v;
    }
    return obj;
}

function objectToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

module.exports.strMapToObject = strMapToObject;
module.exports.objectToStrMap = objectToStrMap;