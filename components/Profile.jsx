import React from 'react';

import QuoteCard from './QuoteCard';

const Profile = ({ name, desc, data, totalLikes, handleEdit, handleDelete}) => {
  return (

    <section className = 'w-full'>
        <h1 className = 'head_text text-left'>
        <span className = 'blue_gradient'> {name} Profile </span>
        </h1>
        <p className = 'desc text-left'>{desc}</p>

        <div className="mt-6">
            <p>Total Quotes: {data.length}</p>
            <p>Total Likes: {totalLikes}</p>
        </div>

        <div className = 'mt-16 quote_layout'>
            {data.map((post) => (
                <QuoteCard
                    key = {post._id}
                    post = {post}
                    handleEdit = {() => handleEdit && handleEdit(post)}
                    handleDelete = {() => handleDelete && handleDelete(post)}
                />
            ))}
        </div>
    </section>

  )
}

export default Profile