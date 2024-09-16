import React from 'react'

function Button({extrastyle,title,type,onClick}) {
  return (
    <button onClick={onClick} type={type} className={`${extrastyle} py-[8px] text-white rounded-lg hover:opacity-70 duration-300`}>{title}</button>
  )
}

export default Button
