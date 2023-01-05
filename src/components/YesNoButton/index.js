import { ToggleButtonGroup } from '@mui/material'
import { PrimaryToggleButton } from '../StyledButton'
import PropTypes from 'prop-types'

export function YesNoButton(props) {
  const { value, onClick, title } = props
  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive
      sx={{ color: 'success' }}
    >
      <PrimaryToggleButton value={true} onClick={() => onClick(true)}>
        {title ? title.yes : 'Yes'}
      </PrimaryToggleButton>
      <PrimaryToggleButton value={false} onClick={() => onClick(false)}>
        {title ? title.no : 'No'}
      </PrimaryToggleButton>
    </ToggleButtonGroup>
  )
}

YesNoButton.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.object
}
