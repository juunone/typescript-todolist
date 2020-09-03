"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsValidEnumValue = void 0;
function getIsValidEnumValue(enumObject, value) {
    return Object.keys(enumObject)
        .filter(function (key) { return isNaN(Number(key)); })
        .some(function (key) { return enumObject[key] === value; });
}
exports.getIsValidEnumValue = getIsValidEnumValue;
