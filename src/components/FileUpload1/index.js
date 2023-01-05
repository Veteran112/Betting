import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import BootstrapTooltip from 'components/BootstrapTooltip'
import alert from 'utils/alert'
import { trim1 } from 'utils/convertors'
import './index.scss'

export default function FileUpload1(props) {
  const { error, helperText } = props
  const [attach, setAttach] = useState({
    name: null,
    size: null
  })
  const fileInputRef = useRef()
  const clickFile = () => {
    fileInputRef.current.click()
    // setAttach({ name: null, size: null })
  }

  const onFileAdded = (evt) => {
    const { files } = evt.target
    const file = files[0]
    if (file.name.indexOf('.xlsx') === -1) {
      alert(false, 'Must upload xlsx file')
      return
    }
    let e = {
      target: {
        value: file
      }
    }
    setAttach({
      name: files[0].name,
      size: files[0].size
    })
    props.change(e)
  }

  useEffect(() => {}, [error])

  return (
    <div className="fileupload-container">
      <div className="d-block">
        <BootstrapTooltip title={attach.name ? attach.name : 'Attach a file'}>
          <div
            className="add-file-item-box text-center cursor-pointer"
            onClick={clickFile}
          >
            <div className="add-file-item">
              <div className="file-image">
                <i className={`far fa-file-excel`} /> <br />
                {attach.name && attach.size ? (
                  <div>
                    {trim1(attach.name, 25)}
                    <br />
                    <span>{moment().format('MM/DD/YYYY HH:MM')}</span>
                  </div>
                ) : (
                  'Attach a file'
                )}
              </div>
            </div>
          </div>
        </BootstrapTooltip>
        <div className={!error ? 'd-none' : 'd-block helper-text'}>
          {error ? helperText : ''}
        </div>
      </div>
      <input
        ref={fileInputRef}
        className="d-none"
        type="file"
        accept=".xlsx"
        onChange={onFileAdded}
        onClick={(event) => {
          event.target.value = null
        }}
      />
    </div>
  )
}

FileUpload1.propTypes = {
  change: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
}
