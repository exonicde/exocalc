export default function enumify(enumList) {
  let enumObject = {};
  for (let i = 0; i < enumList.length; ++i)
    enumObject[enumList[i]] = i;
  return enumObject;
}
