import React from 'react'

const About = () => {
    return (
        <div className='px-4 py-12 max-w-2xl mx-auto'>
            <h1 className=' text-3xl font-bold mb-4'>About</h1>
            <p className='mb-4 text-slate-700'> The front end of this app is all about React – we've got client-side routing with React Router. On the backend, it's Node.js and Express holding things together, and our trusty data buddy is MongoDB. 🌟</p>
            <p className='mb-4 text-slate-700'>Now, about security – we've got your back with JSON Web Tokens (JWTs) for authentication. So you can trust that your data stays safe and sound.</p>
            <p className='mb-4 text-slate-700'>But here's the best part – this app is like your coding playground! It's a template you can use to cook up your very own full-stack web apps with authentication using the MERN stack. So let your ideas run wild and make some digital magic happen! 🪄💻✨</p>
        </div>
    )
}

export default About