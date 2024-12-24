import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();
  const userIdElement = useRef();
  const titleElement = useRef();
  const bodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const title = titleElement.current.value;
    const body = bodyElement.current.value;
    const reactions = {
      likes: parseInt(reactionsElement.current.value, 10) || 0,
    }; // Store as an object
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    titleElement.current.value = "";
    bodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        reactions,
        userId,
        tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => addPost(post));
    navigate("/");
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      <form className="form-style " onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="userid" className="form-label">
            Enter User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="userid"
            placeholder="User Id"
            ref={userIdElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="How are you feeling Today..."
            ref={titleElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Enter Post Content
          </label>
          <textarea
            rows="4"
            type="text"
            className="form-control"
            id="body"
            placeholder="Tell us more about it..."
            ref={bodyElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Enter Number of People reacted
          </label>
          <input
            type="text"
            className="form-control"
            id="reactions"
            placeholder="Reactions"
            ref={reactionsElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter Hashtags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            placeholder="Hashtags in Space"
            ref={tagsElement}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
