'use client';

import React, { useState, useEffect } from 'react';

import QuoteCard from './QuoteCard';

const QuoteCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 quote_layout'>
            {data.map((post) => (
                <QuoteCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [activeTag, setActiveTag] = useState(null);

    // handle search text change and filter posts accordingly
    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);

        // filter posts based on search text
        if (text.trim() === '') {
            setFilteredPosts(posts); // show all posts if search text is empty
        } else {
            const filtered = posts.filter((post) => {
                const { quote, tag, author, username } = post;
                return (
                    (quote && quote.toLowerCase().includes(text.toLowerCase())) ||
                    (tag && tag.toLowerCase().includes(text.toLowerCase())) ||
                    (author && author.toLowerCase().includes(text.toLowerCase())) ||
                    (username && username.toLowerCase().includes(text.toLowerCase()))
                );
            });

            // update filtered posts based on search text
            setFilteredPosts(filtered); 
        }
    };

    // filter posts by tag and set active tag
    const handleTagClick = (tag) => {
        const filtered = posts.filter((post) => post.tag === tag);
        setFilteredPosts(filtered);
        setActiveTag(tag); // set the active tag to the clicked tag
    };

    // reset to show all posts and clear active tag
    const handleBackClick = () => {
        setFilteredPosts(posts);
        setActiveTag(null); // clear the active tag
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/quote');
            const data = await response.json();

            setPosts(data); // store fetched posts
            setFilteredPosts(data); // initialize filtered posts with all posts
        };

        fetchPosts(); 
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* display active tag and back button */}
            {activeTag && (
                <div className='tag-info'>
                    <p>Showing posts with <strong>{activeTag}</strong></p>
                    <button onClick={handleBackClick} className='back-button'>
                        Back
                    </button>
                </div>
            )}

            <QuoteCardList
                data={filteredPosts}
                handleTagClick={handleTagClick} 
            />
        </section>
    );
};

export default Feed;