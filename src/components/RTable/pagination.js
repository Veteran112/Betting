import { PrimaryButton } from '../StyledButton'
import SelectBox1 from '../SelectBox1'
import React, { useEffect, useState } from 'react'
import './index.scss'
import PropTypes from 'prop-types'

const Pagination = ({
  pageChangeHandler,
  totalPages = 1,
  defaultPageSize = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const onNextPage = () => setCurrentPage(currentPage + 1)
  const onPrevPage = () => setCurrentPage(currentPage - 1)
  //const onPageSelect = (pageNo) => setCurrentPage(pageNo)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  useEffect(() => {
    pageChangeHandler({
      currentPage: currentPage,
      pageSize: pageSize
    })
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
    pageChangeHandler({
      currentPage: currentPage,
      pageSize: pageSize
    })
  }, [pageSize])
  return (
    <div className="pagination-container mt-4">
      <div className="pagination">
        <PrimaryButton
          onClick={() => {
            setCurrentPage(1)
          }}
          disabled={currentPage === 1}
        >
          {'<<'}
        </PrimaryButton>{' '}
        <PrimaryButton onClick={onPrevPage} disabled={currentPage === 1}>
          {'<'}
        </PrimaryButton>{' '}
        <PrimaryButton
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
        >
          {'>'}
        </PrimaryButton>{' '}
        <PrimaryButton
          onClick={() => {
            setCurrentPage(totalPages)
          }}
          disabled={currentPage >= totalPages}
        >
          {'>>'}
        </PrimaryButton>{' '}
        <span>
          Page{' '}
          <strong>
            {currentPage} of {totalPages}
          </strong>{' '}
        </span>
        {/*<span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}*/}
        <SelectBox1
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
          className="mt-0"
          options={[
            { label: 'Show 5', value: 5 },
            { label: 'Show 10', value: 10 },
            { label: 'Show 20', value: 20 },
            { label: 'Show 30', value: 30 },
            { label: 'Show 40', value: 40 },
            { label: 'Show 50', value: 50 }
          ]}
        />
      </div>
    </div>
  )
}

Pagination.propTypes = {
  pageChangeHandler: PropTypes.func,
  totalPages: PropTypes.number,
  defaultPageSize: PropTypes.number
}
export default Pagination
