import React from 'react'

const FlexRow = ({width,gap,children,justifyContent,height}) => {
  return (
    <div className='flex-row' style={{width:width,gap:gap,justifyContent:justifyContent,height:height}}>{children}</div>
  )
}

export default FlexRow