import {
  createContext,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from "react";

const postListReducer = (currPostList, action) => {
  switch (action.type) {
    case "DELETE_POST":
      return currPostList.filter((post) => post.id !== action.payload.postId);
    case "ADD_INITIAL_POSTS":
      return action.payload.posts;
    case "ADD_POST":
      return [action.payload, ...currPostList];
    default:
      return currPostList;
  }
};

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  dataFetched: false,
  deletePost: () => {},
});

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [dataFetched, setDataFetched] = useState(false);

  const addPost = (post) => {
    dispatchPostList({ type: "ADD_POST", payload: post });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({ type: "ADD_INITIAL_POSTS", payload: { posts } });
  };

  const deletePost = useCallback((postId) => {
    dispatchPostList({ type: "DELETE_POST", payload: { postId } });
  }, []);

  useEffect(() => {
    setDataFetched(true); // Show loader
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((obj) => {
        addInitialPosts(obj.posts);
        setDataFetched(false); // Hide loader
      })
      .catch(() => {
        setDataFetched(false); // Ensure loader hides even on error
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, dataFetched }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
