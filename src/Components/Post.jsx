import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import Post from "./Post"; // Importing the Post component

function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "John Doe",
      content: "This is my first post!",
      likes: 5,
      comments: 2,
      shares: 1,
    },
    {
      id: 2,
      username: "Jane Smith",
      content: "Hello, everyone! Welcome to my profile.",
      likes: 10,
      comments: 5,
      shares: 3,
    },
  ]);

  const handlePost = () => {
    const newPost = {
      id: posts.length + 1,
      username: "New User",
      content: "This is a new post!",
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", width: "1000px" }}>
      <Grid container justifyContent="center" style={{ marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={handlePost}>
          Create New Post
        </Button>
      </Grid>
      <Grid container direction="column" spacing={3} alignItems="center">
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} style={{ width: "100%" }}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
