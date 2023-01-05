import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { FormHelperText } from '@mui/material'
import {
  PrimaryNumberFormatTextField,
  PrimaryTextField,
  PrimarySelect,
  PrimaryPhoneField
} from 'components/StyledTextFields'
import ReactPhoneInput from 'react-phone-input-mui'
import { YesNoButton } from 'components/YesNoButton'
import { Grid, Typography } from '@mui/material'
import './index.scss'

export function TextField1(props) {
  const {
    id,
    label,
    data,
    error,
    value,
    onChange,
    helperText,
    type,
    kind,
    startAdornment,
    ...others
  } = props

  useEffect(() => {}, [])
  if (kind === 'Select') {
    return (
      <PrimarySelect
        id={id}
        label={label}
        data={data}
        value={value}
        onChange={(e) => {
          onChange(e)
        }}
        error={error}
        helperText={helperText}
        {...others}
      />
    )
  } else if (kind === 'TextField') {
    return (
      <PrimaryTextField
        id={id}
        label={label}
        className="w-100"
        size="small"
        type={type}
        value={value}
        error={error}
        helperText={helperText}
        onChange={(e) => onChange(e)}
        startAdornment={startAdornment}
        {...others}
      />
    )
  } else if (kind === 'NumberTextField') {
    return (
      <PrimaryNumberFormatTextField
        id={id}
        label={label}
        size="small"
        type="number"
        value={value}
        error={error}
        helperText={helperText}
        onChange={(e) => onChange(e)}
        startAdornment={startAdornment}
        {...others}
      />
    )
  } else if (kind === 'phone') {
    return (
      <ReactPhoneInput
        inputClass="phone_field"
        component={PrimaryPhoneField}
        value={value}
        onChange={(e) =>
          onChange({
            target: {
              value: e
            }
          })
        }
      />
    )
  } else if (kind === 'YesNo') {
    return (
      <>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          className="align-items-center pr-2"
        >
          <Grid item xs={8} sm={8} md={8}>
            <Typography
              variant="span"
              component="span"
              className="shade-gray main-font font-size-13 font-weight-400"
            >
              {label}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <YesNoButton value={value} onClick={onChange} {...others} />
          </Grid>
        </Grid>
        {error && (
          <FormHelperText size="small" className="helperText" error>
            {' '}
            {helperText}{' '}
          </FormHelperText>
        )}
      </>
    )
  }
  return <></>
}

TextField1.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  data: PropTypes.any,
  error: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  helperText: PropTypes.any,
  type: PropTypes.any,
  kind: PropTypes.string,
  startAdornment: PropTypes.any
}
