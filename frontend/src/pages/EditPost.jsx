import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PostForm from "../components/PostForm";
import { getPostById, updatePost } from "../api/postApi";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.post);
      } catch (error) {
        console.error(error);
        alert("Failed to load post.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdatePost = async (formData) => {
    try {
      setLoading(true);

      await updatePost(id, formData);

      alert("Post updated successfully.");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <h2>Loading...</h2>;
  }

  if (!post) {
    return <h2>Post not found.</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <h1>Edit Post</h1>

      <PostForm
        initialData={post}
        onSubmit={handleUpdatePost}
        loading={loading}
      />
    </div>
  );
};

export default EditPost;