import React from 'react'
import { Pagination } from 'antd'
import './Pagination.css'

const PaginationPage = (props) => {
  const { searchPage, totalPages, page } = props
  return (
    <div className="containerPagination">
      <Pagination onChange={searchPage} total={totalPages * 10} showSizeChanger={false} current={page} />
    </div>
  )
}

export default PaginationPage
