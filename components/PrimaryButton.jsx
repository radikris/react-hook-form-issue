import React from 'react'

const PrimaryButton = ({onClick, text}) => {
  return (
    <div onClick={onClick} className='bg-red-400 text-White px-4 py-2 rounded-4xl shadow-md text-center'>{text}</div>
  )
}

export default PrimaryButton