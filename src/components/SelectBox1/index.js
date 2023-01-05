import * as React from 'react'
import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'

export default function SelectBox1(props) {
  const { value, options, onChange } = props
  return (
    <div>
      <Box>
        <Select
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Tag" />}
          sx={{ height: '40px' }}
        >
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </Box>
    </div>
  )
}

SelectBox1.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func
}
