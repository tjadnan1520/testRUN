import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePost } from "../api/postApi";

const PostCard = ({ post, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post.id);

      if (onDelete) {
        onDelete(post.id);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete post.");
    }
  };

  const isImage =
    post.fileType === "IMAGE";

  const isPdf =
    post.fileType === "PDF";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>{post.title}</h2>

      <p>{post.content}</p>

      {isImage && (
        <img
          src={post.fileUrl}
          alt={post.title}
          width="300"
        />
      )}

      {isPdf && (
        <p>
          <a
            href={post.fileUrl}
            target="_blank"
            rel="noreferrer"
          >
            View PDF
          </a>
        </p>
      )}

      {!isImage && !isPdf && post.fileUrl && (
        <p>
          <a
            href={post.fileUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download File
          </a>
        </p>
      )}

      <hr />

      <p>
        <strong>Author:</strong> {post.author.name}
      </p>

      {user?.id === post.authorId && (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Link to={`/edit/${post.id}`}>
            Edit
          </Link>

          <button onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;