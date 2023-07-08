'use client';

import { useState,useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({data,handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
       {data.map((post)=>(
        <PromptCard
         key={post._id}
         post = {post}
         handleTagClick={handleTagClick} />
       ))}
    </div>
  )
}

const Feed = () => {

  const [posts, setPosts] = useState([]);

  // Search States
  const [searchText,setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setsearchedResults] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=> {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  },[]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText,"i");
    return posts.filter((item) => regex.test(item.creator.userName) || regex.test(item.tag) || regex.test(item.prompt));
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(()=>{
        const searchedResults = filterPrompts(e.target.value);
        setsearchedResults(searchedResults);
      },500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchedResults = filterPrompts(tagName);
    setsearchedResults(searchedResults);
  };


  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      {
        searchText ? (
          <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      }
    </section>
  )
}

export default Feed