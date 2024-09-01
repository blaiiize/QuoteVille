'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Form from '../../components/Form';

const EditQuote = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();

    // get the quote ID from the URL parameters
    const quoteId = searchParams.get('id'); 

    // initializing state for the quote, author, and tag 
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        quote: '',
        author: '',
        tag: '',
    });

    useEffect(() => {
        const getQuoteDetails = async () => {
            try {

                // fetching quote details using quote ID
                const response = await fetch(`/api/quote/${quoteId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost({
                        quote: data.quote,
                        author: data.author,
                        tag: data.tag,
                    });  // updating state with fetched quote details
                } else {
                    console.error('Failed to fetch quote details');
                }
            } catch (error) {
                console.error('Error fetching quote details:', error);
            }
        };

        if (quoteId) getQuoteDetails();  // fetch details only if quoteId is available
    }, [quoteId]);

    const updateQuote = async (e) => {
        e.preventDefault();
        setSubmitting(true);  // set submitting to true while the update is in progress

        try {

            // sending PATCH request to update quote
            const response = await fetch(`/api/quote/${quoteId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quote: post.quote,
                    author: post.author,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/');  // redirecting to homepage after successful update
            } else {
                console.error('Failed to update quote');
            }
        } catch (error) {
            console.error('Error updating quote:', error);
        } finally {
            setSubmitting(false);  // reset submitting state after the request completes
        }
    };

    return (
        <Form
            type='Edit'
            post={post}  
            setPost={setPost}  
            submitting={submitting}  
            handleSubmit={updateQuote}  
        />
    );
};

export default EditQuote;