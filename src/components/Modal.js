import React from 'react'

function Modal({children,openModal,setOpenModal,heroModal, setHeroModal, updateOpen, setUpdateOpen}) {
  
  function hadleCloseModal(e){
    if(e.target.id === "wrapper"){
      if (openModal) setOpenModal(false);
      if (heroModal) setHeroModal(false);
      if (updateOpen) setUpdateOpen(false);
      return false;
    }
  }

  // function hadleCloseModal(event) {
  //   if (modalRef.current && !modalRef.current.contains(event.target)) {
  //     setOpenModal(false);
  //     setHeroModal(false);
  //   }
  // }
  return (
    <div onClick={hadleCloseModal} id='wrapper' className={`inset-0 duration-300 flex justify-center items-center z-50 fixed backdrop-blur ${ openModal || heroModal || updateOpen ? "scale-1" : "scale-0"}`}>
        <div className='w-[600px] p-6 rounded-md bg-slate-200 dark:bg-[#283946]'>
            {children}
        </div>
    </div>
  )
}

export default Modal
