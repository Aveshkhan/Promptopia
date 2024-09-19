'use client'

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
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
  const [allPosts, setAllPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
      setSearchPosts(data); // Initialize searchPosts with allPosts
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // This effect runs every time searchText changes
    if (searchText === '') {
      setSearchPosts(allPosts); // Reset to allPosts if search text is empty
    } else {
      const filteredPosts = allPosts.filter((item) => {
        return (
          item.prompt.toLowerCase().includes(searchText.toLowerCase()) || 
          item.tag.toLowerCase().includes(searchText.toLowerCase()) || 
          item.creator.username.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setSearchPosts(filteredPosts);
    }
  }, [searchText, allPosts]); // Dependencies: searchText, allPosts

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update searchText state
  };

  const searchByTag = (e) => {
    console.log(e)
    setSearchText(e.toLowerCase())
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          onChange={handleSearchChange}
          value={searchText} // Controlled input
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchPosts} // Display filtered posts
        handleTagClick={searchByTag}
      />
    </section>
  );
};

export default Feed;
