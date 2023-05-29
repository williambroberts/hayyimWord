import React from 'react'

const FlexCol = ({width,gap,children,align}) => {
  return (
    <div className='flex-col' style={{width:width,gap:gap,alignItems:align}}>{children}</div>
  )
}

export default FlexCol