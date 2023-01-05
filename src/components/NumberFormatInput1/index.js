import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getNumber3decimal } from 'utils/convertors'

export default function NumberFormatInput1(props) {
  const { value, onChange, name, ...other } = props
  const [seperatedVal, setSeperatedVal] = useState(0)

  const removeNonNumeric = (num) => {
    let nNum
    if (num[0] === '-') {
      nNum = num.substring(1, num.length)
    } else {
      nNum = num
    }
    nNum = nNum.toString().replace(/[^0-9.]/g, '')
    if (num[0] === '-') {
      return '-' + nNum
    } else return nNum
  }

  const handleChange = (event) => {
    setSeperatedVal(getNumber3decimal(event.target.value))
    onChange({
      target: {
        value: removeNonNumeric(event.target.value),
        name: name
      }
    })
  }

  useEffect(() => {
    setSeperatedVal(getNumber3decimal(value == null ? '' : value))
  }, [])

  return <input value={seperatedVal} {...other} onChange={handleChange} />
}

NumberFormatInput1.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
