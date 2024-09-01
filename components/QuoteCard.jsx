'use client';

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const QuoteCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
  
    const [likes, setLikes] = useState(post.likes.length);
    const [copied, setCopied] = useState('');
  
    const handleCopy = () => {
      setCopied(post.quote);
      navigator.clipboard.writeText(post.quote);
      setTimeout(() => setCopied(''), 3000);
    };
  
    const handleLikeToggle = async () => {
      try {
        const response = await fetch(`/api/quote/${post._id}/like`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quoteId: post._id,
            userId: session?.user.id,
          }),
        });
  
        if (response.ok) {
          const updatedQuote = await response.json();
          setLikes(updatedQuote.likes.length);  // Update the likes count with the length of the likes array
        } else {
          console.log('Failed to toggle like:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className='quote_card'>
        <div className='flex items-center gap-2'>
          <Image
            src={post?.creator?.image || '/../public/images/default-pfp.png'}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col ml-2'>
            <h3 className='text-lg font-bold'>{post.creator.username}</h3>
          </div>
          <div className='copy_btn ml-auto' onClick={handleCopy}>
            <Image
              src={copied === post.quote ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
              width={20}
              height={20}
            />
          </div>
        </div>
  
        <p className='desc text-center'>"{post.quote}"</p>
  
        <div className='author-section flex justify-end items-center mt-1'>
          <p className='text-sm text-gray-500'>- {post.author}</p>
        </div>
  
        <p className='tag' onClick={() => handleTagClick(post.tag)}>
          {post.tag}
        </p>
  
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className='mt-2 flex-center gap-4 border-t border-gray-100 pt-1'>
            <p className='desc text-center' onClick={handleEdit}>
              Edit
            </p>
            <p className='desc text-center' onClick={handleDelete}>
              Delete
            </p>
          </div>
        )}
  
        <div className='like_button_container'>
          <button onClick={handleLikeToggle} className='like_button'>
            <Image
              src='/assets/icons/like.svg'
              width={24}
              height={24}
              alt='like'
            />
          </button>
          <p className='likes_count'>{likes}</p>
        </div>
      </div>
    );
  }
  
  export default QuoteCard;