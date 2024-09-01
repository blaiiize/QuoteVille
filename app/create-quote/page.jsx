'use client';

import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '../../components/Form';

const CreateQuote = () => {
    const router = useRouter();
    const { data: session } = useSession();

    // initialize state for submission status and form data
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        quote: '',
        tag: '',
        author: '',
    });

    // handling quote creation
    const createQuote = async (e) => {

        e.preventDefault();
        setSubmitting(true);  // indicate that submission is in progress

        try {

            // sending POST request to create a new quote
            const response = await fetch('/api/quote/new', 
            {
                method: 'POST',
                body: JSON.stringify({
                    quote: post.quote,
                    userId: session?.user.id,
                    tag: post.tag,
                    author: post.author,
                }),
            });

            // if response ok, navigate to the homepage
            if(response.ok) {
                router.push('/');
            } else {
                console.log('Failed to create quote:', response.statusText);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);  // reset submission status after completion
        }
    };

    return (
      <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createQuote}
      />
    );
}

export default CreateQuote;