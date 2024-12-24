import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="card post-card" style={{ width: "60%" }}>
        <div className="card-body">
          <h5 className="card-title">
            {post.title || "Untitled Post"}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              onClick={() => deletePost(post.id)}
              style={{ cursor: "pointer" }} // Make it clear that it's clickable
            >
              <MdDelete />
            </span>
          </h5>
          <p className="card-text">{post.body || "No content available."}</p>
          {/* Render tags only if tags exist and are an array */}
          {Array.isArray(post.tags) &&
            post.tags.map((tag) => (
              <span
                className="badge text-bg-primary"
                style={{ marginRight: "5px" }}
                key={tag}
              >
                {tag}
              </span>
            ))}
          <div className="alert alert-success mt-3" role="alert">
            {`This post has been reacted to by ${
              post.reactions?.likes ?? 0
            } people.`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
