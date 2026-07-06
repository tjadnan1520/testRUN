import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PostForm from "../components/PostForm";
import { createPost } from "../api/postApi";

const CreatePost = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (formData) => {
    try {
      setLoading(true);

      await createPost(formData);

      alert("Post created successfully.");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <h1>Create Post</h1>

      <PostForm
        onSubmit={handleCreatePost}
        loading={loading}
      />
    </div>
  );
};

export default CreatePost;