import React from 'react'
import { Spin, Space } from 'antd'
import './spiner.css'

const Spiner = () => {
  return (
    <Space className="spinner-space" size="middle">
      <Spin size="large" />
    </Space>
  )
}
export default Spiner
