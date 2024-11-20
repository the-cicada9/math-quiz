import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Homepage() {

    const [profileName, setProfileName] = useState("");
    console.log(profileName);
    localStorage.setItem("profileName" , `${profileName}`)

    const img = [
        'https://i.pinimg.com/736x/59/7d/a4/597da4f38a74528a40b2ea34d187f4b9.jpg',
        'https://i.pinimg.com/736x/3f/d3/d4/3fd3d42cfe6e2dab663f7ac1e2259596.jpg',
        'https://i.pinimg.com/736x/f6/8e/1f/f68e1f2198055d4ceb433e02e8e8597e.jpg',
        'https://i.pinimg.com/736x/b4/1a/23/b41a2312e27537be68de9571f1a41cb8.jpg',
        'https://i.pinimg.com/736x/1c/1b/7e/1c1b7e3389b106ed27b8daa2823f5d49.jpg'
    ]

  return (
    <div className='flex justify-evenly items-center gap-y-5 w-[100%] h-[100vh]'>
        <h1 className='text-[30px]'>Quiz Time</h1>
        <div className="w-[45%] h-[90vh] bg-yellow-200 flex flex-col gap-y-4 justify-center items-center rounded-md">
            <Link className='w-[90%] h-[10vh] text-semibold text-[24px] rounded-[12px] bg-white flex justify-center items-center' to='/quiz-page/easy'>Easy Level</Link>
            <Link className='w-[90%] h-[10vh] text-semibold text-[24px] rounded-[12px] bg-white flex justify-center items-center' to='/quiz-page/medium'>Medium Level</Link>
            <Link className='w-[90%] h-[10vh] text-semibold text-[24px] rounded-[12px] bg-white flex justify-center items-center' to='/quiz-page/hard'>Hard Level</Link>
        </div>
        <div className="w-[45%] h-[90vh] bg-yellow-300 flex flex-col justify-center items-center rounded-md">
            <div className="text-[21px] ">Enter Your Name</div>
            <div className="w-[80%]">
                <input className="w-[100%] pl-[12px] h-[4vh] rounded-md" type="text" placeholder='Name' value={profileName}
            onChange={(e) => setProfileName(e.target.value)}/>
            </div>
            <img className="w-[80%] mt-[21px] rounded-[12px]" src="https://i.pinimg.com/736x/59/7d/a4/597da4f38a74528a40b2ea34d187f4b9.jpg" alt="" />
        </div>
    </div>
  )
}

export default Homepage