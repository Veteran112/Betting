export function removePrefix0(val) {
  let rlt = ''
  if (val === '0') return '0'
  for (let i = 0; i < val.length; i += 1) {
    if (val[i] >= '0' && val[i] <= '9') {
      if (!(rlt.length === 0 && val[i] === '0')) {
        rlt += val[i]
      }
    }
  }
  return rlt
}

export function getOnlyNumber(val) {
  try {
    let rlt = ''
    let data = val.toString()
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] >= '0' && data[i] <= '9') rlt += data[i]
    }
    return rlt
  } catch {
    return ''
  }
}

export function getNumber3decimal(
  param,
  withoutDecimal = false,
  decimal_count = 3
) {
  try {
    param = param.toString()
    let sign = param[0]
    let no_decimal = removePrefix0(getOnlyNumber(param.split('.')[0]))
    let decimal = param.split('.')[1]
    let value = no_decimal.replace(/,/g, '')
    let caret = value.length - 1
    while (caret - 3 > -1) {
      caret -= 3
      value = value.split('')
      value.splice(caret + 1, 0, ',')
      value = value.join('')
    }
    if (decimal !== undefined && !withoutDecimal) {
      decimal = getOnlyNumber(decimal).substring(0, decimal_count)
      value += '.' + decimal
    }
    if (sign === '-') value = '-' + value
    return value
  } catch {
    return ''
  }
}

export function trim1(val, len) {
  let rlt = val.toString()
  if (val.length > len) {
    rlt = val.substr(0, len) + '...'
  }
  return rlt
}

export function fileTobase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async () => {
      resolve({
        name: file.name.replace('.xlsx', ''),
        base64: reader.result
      })
    }

    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

export function removeKeysFromObject(sourceObject, keysToRemove) {
  return Object.entries(sourceObject)
    .filter((x) => !x[0].includes(keysToRemove))
    .reduce((targetObject, keyVal) => {
      targetObject[keyVal[0]] = keyVal[1]
      return targetObject
    }, {})
}
