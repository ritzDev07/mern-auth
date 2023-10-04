import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className=' p-3 max-w-lg '>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form action=""
                className=' flex flex-col gap-4 '>
                <img src={currentUser.profilePicture} alt="profile"
                    className=' h-24 w-24 self-center cursor-pointer rounded-full  object-cover ' />
                <input type="text" name="username" placeholder='Username' id="username"
                    className=' bg-slate-200 rounded-lg p-3 ' />
                <input type="email" name="email" placeholder='Email' id="email"
                    className=' bg-slate-200 rounded-lg p-3 ' />
                <input type="password" name="password" placeholder='Password' id="password"
                    className=' bg-slate-200 rounded-lg p-3 ' />
                <button className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>
                    update
                </button>
            </form>
            <div className=' flex justify-between mt-5'>
                <span className=' text-red-700 cursor-pointer '>
                    Delete Account
                </span>
                <span className=' text-red-700 cursor-pointer '>
                    Sign out
                </span>
            </div>
        </div>
    )
}

export default Profile