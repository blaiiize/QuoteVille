'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '../../components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    // initialize state for posts and total likes
    const [posts, setPosts] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);

    // fetching user posts and total likes
    const fetchPostsAndLikes = async () => {
        try {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
            // extract quotes and totalLikes from response
            const { quotes, totalLikes } = data;
    
            setPosts(quotes);  // update posts state
            setTotalLikes(totalLikes);  // update totalLikes state

        } catch (error) {
            console.error('Error fetching posts and likes:', error);
        }
    };
    
    // fetch posts and likes when user session is available
    useEffect(() => {
        if (session?.user.id) {
            fetchPostsAndLikes();
        }
    }, [session?.user.id]);

    // handling post edit by navigating to the update page
    const handleEdit = (post) => {
        router.push(`/update-quote?id=${post._id}`);
    };

    // handling post deletion
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this Quote?');

        if (hasConfirmed) {
            try {

                // sending DELETE request to remove the post
                await fetch(`/api/quote/${post._id.toString()}`, {
                    method: 'DELETE',
                });

                // filtering out deleted post and update the state
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);

                // recalculating total likes after deletion
                const likesCount = filteredPosts.reduce((total, post) => total + (post.likes?.length || 0), 0);
                setTotalLikes(likesCount);

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile 
            name='My'
            desc='Welcome to your personalized Quote page'
            data={posts}
            totalLikes={totalLikes}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;