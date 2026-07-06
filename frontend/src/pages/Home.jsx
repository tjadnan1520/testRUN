import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response.posts);
    } catch (error) {
      console.error(error);
      alert("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId)
    );
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
      }}
    >
      <h1>All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Home;