import React from 'react'

const Intro = ({children,margin,width}) => {
  return (
    <div className='intro' style={{margin:margin,width:width}}>
        {children}
    </div>
  )
}

export default Intro