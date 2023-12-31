import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

// Reusable Input component
const InputField = ({ type, id, placeholder, onChange }) => (
    <input
        type={type}
        id={id}
        placeholder={placeholder}
        className='bg-slate-100 text-blue-900  p-3 border border-slate-300 rounded-lg'
        autoComplete={placeholder === 'Username' ? 'username' : placeholder === 'Email' ? 'email' : placeholder === 'Password' ? 'current-password' : ''}
        onChange={onChange}
    />
);

const Signin = () => {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());
            // Send a POST request to the '/api/auth/signin' endpoint
            const res = await fetch('/api/auth/signin', { //remove this fetch if using axious
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the form data as a JSON string in the request body
                body: JSON.stringify(formData),
            });

            // Parse the response JSON data
            const data = await res.json();

            if (data.success === false) {
                dispatch(signInFailure(data.message))
                return;
            }

            dispatch(signInSuccess(data))
            navigate('/');

        } catch (error) {
            dispatch(signInFailure(error))
        }

    };

    return (
        <section className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>
                Sign In
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <InputField type='email' id='email' placeholder='Email' onChange={handleChange} />
                <InputField type='password' id='password' placeholder='Password' onChange={handleChange} />
                <button disabled={loading} className=' bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-40'>
                    {
                        loading ? 'Loading...' : 'Sign In'
                    }
                </button>
                <OAuth/>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Don&#39;t have an Account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>

            <p className=' text-red-600 text-center mt-5'>
                {
                    error ? error || 'Something went wrong!' : ' '
                }
            </p>

        </section>
    );
};
export default Signin;