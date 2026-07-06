import { useState } from "react";

const PostForm = ({ initialData = {}, onSubmit, loading }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (file) {
      formData.append("file", file);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "600px",
      }}
    >
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        rows="6"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {initialData.fileUrl && (
        <a
          href={initialData.fileUrl}
          target="_blank"
          rel="noreferrer"
        >
          Current File
        </a>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
};

export default PostForm;