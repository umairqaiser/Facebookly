import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react"; // Import Emoji Picker

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  const handlePost = () => {
    if (newPostContent.trim() === "") return; // Prevent empty posts
    const newPost = {
      id: posts.length + 1,
      username: `@User${posts.length + 1}`, // Default username logic
      content: newPostContent.trim(),
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    if (comment.trim() === "") return; // Prevent empty comments
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const handleShare = (postId) => {
    const sharedPost = posts.find((post) => post.id === postId);
    if (sharedPost) {
      const postLink = `${window.location.origin}/post/${postId}`;
      navigator.clipboard.writeText(postLink); // Copy the link to the clipboard
      alert(`Post link copied to clipboard:\n${postLink}`);
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", width: "1000px" }}>
      {/* Add Post Section */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={8}>
          <TextField
            placeholder="What's on your mind?"
            variant="outlined"
            fullWidth
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePost}
            style={{ height: "100%" }}
          >
            Post
          </Button>
        </Grid>
      </Grid>

      {/* Display Posts */}
      <Grid container direction="column" spacing={3} alignItems="center">
        {posts.map((post) => (
          <Grid item key={post.id} style={{ width: "100%" }}>
            <Post
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={(comment) => handleComment(post.id, comment)}
              onShare={() => handleShare(post.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function Post({ post, onLike, onComment, onShare }) {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); // Emoji picker state

  const toggleCommentBox = () => setIsCommentBoxOpen(!isCommentBoxOpen);

  const handleAddComment = () => {
    onComment(newComment);
    setNewComment("");
    setIsCommentBoxOpen(false); // Optionally close the comment box
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment((prev) => prev + emojiObject.emoji);
    setIsEmojiPickerOpen(false); // Close emoji picker after selecting
  };

  return (
    <Paper
      style={{
        padding: "20px",
        marginBottom: "20px", // Gap between posts
        width: "100%",
      }}
    >
      {/* Username */}
      <Typography
        variant="subtitle1"
        style={{ fontWeight: "bold", color: "#3f51b5" }}
      >
        {post.username}
      </Typography>

      {/* Post Content */}
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        {post.content}
      </Typography>

      {/* Buttons: Like, Comment, Share */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Button variant="text" onClick={onLike}>
          Like ({post.likes})
        </Button>
        <Button variant="text" onClick={toggleCommentBox}>
          Comment ({post.comments.length})
        </Button>
        <Button variant="text" onClick={onShare}>
          Share ({post.shares})
        </Button>
      </div>

      {/* Comment Section */}
      {isCommentBoxOpen && (
        <div style={{ marginTop: "10px" }}>
          <TextField
            placeholder="Write a comment..."
            variant="outlined"
            fullWidth
            size="small"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton color="primary" onClick={toggleEmojiPicker}>
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleAddComment}>
              <SendIcon />
            </IconButton>
          </div>
          {isEmojiPickerOpen && (
            <div style={{ marginTop: "10px" }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      )}

      {/* Display Comments */}
      {post.comments.map((comment, index) => (
        <Typography
          key={index}
          variant="body2"
          style={{
            backgroundColor: "#f5f5f5",
            padding: "5px",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          {comment}
        </Typography>
      ))}
    </Paper>
  );
}

export default Home;
