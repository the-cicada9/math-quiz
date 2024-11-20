import React from 'react'

function Modal({allResults , isModalOpen , setIsModalOpen}) {

    console.log(isModalOpen);
    
  return (
    <div className='w-[100%] h-[100%] mt-[21px] position-relative'>
        <div className="w-[100%] h-[100%] bg-gray-800 left-0 right-0 rounded-md flex  flex-col items-center">
            <h1 className='text-[21px] pt-[21px] text-white'>ScroeBoard:</h1>
            {
                allResults.map((item , index) => (
                    <div className='w-[80%] h-[4vh] bg-white flex items-center px-2 justify-evenly mt-[12px] rounded-md'>
                        <div className="">{index}|</div>
                        <div className="">{item}%</div>
                    </div>
                ))
            }
            <button onClick={() => setIsModalOpen(!isModalOpen)} className='w-[150px] h-[4vh] bg-white my-[45px] rounded-md'>Close</button>
        </div>
    </div>
  )
}

export default Modal