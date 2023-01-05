import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'pretty-checkbox-react'
import 'pretty-checkbox'
import { shadeBlue } from 'config/Color'
import './index.scss'

export default function Checkbox1(props) {
  const { description, checked, disabled, onChange } = props
  return (
    <div className="checkbox1">
      <Checkbox
        color="inherit"
        animation="smooth"
        // className="checkbox1"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        icon={<i className="fas fa-check" style={{ color: shadeBlue }}></i>}
      >
        {description}
      </Checkbox>
    </div>
  )
}

Checkbox1.propTypes = {
  description: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}
