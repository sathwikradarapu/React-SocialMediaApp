import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, dataFetched } = useContext(PostListData);

  return (
    <>
      {dataFetched && <LoadingSpinner />}
      {!dataFetched &&
        postList.length > 0 &&
        postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
