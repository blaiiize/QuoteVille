import React from 'react'

import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className  = 'w-full max-w-full flex-start flex-col'>
        <h1 className = 'head_text text-left'>
            <span className = 'blue_gradient'> 
            {type} Post 
            </span>
        </h1>

        <p className = 'desc text-left max-w-md'>
            {type} and share amazing quotes with the world,
            and let yourself become inspired.
        </p>

        <form 
            onSubmit = {handleSubmit}
            className = 'mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>

            <label>
                <span className = 'desc text-left max-w-md'>Your Quote</span>

                <textarea
                    value = {post.quote}
                    onChange = {(e) => setPost({ ...post, quote: e.target.value})}
                    placeholder = 'Write your quote here...'
                    required
                    className = 'form_textarea'
                    />
            </label>
            <label>
                <span className='desc text-left max-w-md'>Author</span>
                <textarea
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value })}
                    placeholder='Author name'
                    required
                    className='form_textarea'
                />
            </label>
            <label>
                <span className = 'desc text-left max-w-md'>
                    Tag {' '}
                </span>

                <textarea
                    value = {post.tag}
                    onChange = {(e) => setPost({ ...post, tag: e.target.value})}
                    placeholder = '#inspirational, #motivational, #goodvibes'
                    required
                    className = 'form_textarea'
                    />
            </label>

            <div className = 'flex-end mx-3 mb-5 gap-4'>
                <Link href = '/' className = 'text-gray-500 text-sm'>
                Cancel 
                </Link>

                <button type = 'submit' disabled = {submitting}
                className = 'px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                    {submitting ? '${type}...' : type}
                </button>

            </div>
        </form>

    </section>
  )
}

export default Form