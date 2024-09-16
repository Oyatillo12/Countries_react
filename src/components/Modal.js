import React from 'react'

function Modal({children,openModal,setOpenModal}) {

  return (
    <div onClick={(e) => e.target.id === "wrapper" ? setOpenModal(false) :""} id='wrapper' className={`inset-0 duration-300 flex justify-center items-center z-50 fixed backdrop-blur ${openModal ? "scale-1" : "scale-0"}`}>
        <div className='w-[600px] p-6 rounded-md bg-slate-200 dark:bg-[#202C36]'>
            {children}
        </div>
    </div>
  )
}

export default Modal
