import React from 'react';
import { Link } from 'react-router-dom';

// Reusable Input component
const InputField = ({ type, id, placeholder }) => (
    <input
        type={type}
        id={id}
        placeholder={placeholder}
        className='bg-slate-100 text-blue-900  p-3 border border-slate-300 rounded-lg'
        autoComplete={placeholder === 'Username' ? 'username' : placeholder === 'Email' ? 'email' : placeholder === 'Password' ? 'current-password' : ''}
    />
);

const Signup = () => {
    return (
        <section className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4'>
                <InputField type='text' id='username' placeholder='Username' />
                <InputField type='email' id='email' placeholder='Email' />
                <InputField type='password' id='password' placeholder='Password' />
                <button className=' bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    Sign Up
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an Account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-500'>Sign In</span>
                </Link>
            </div>
        </section>
    );
};
export default Signup;