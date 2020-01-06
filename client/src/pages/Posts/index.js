//Library imports
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Component imports
import Spinner from "../../components/Spinner";
import PostItem from "./components/PostItem";

//Redux imports
import { getPosts } from "../../store/modules/posts/actions";

const Posts = () => {
  const posts = useSelector(state => state.posts.posts);
  const isLoading = useSelector(state => state.posts.isLoading);

  const dispatch = useDispatch();

  const onGetPosts = useCallback(() => dispatch(getPosts()), [dispatch]);

  useEffect(() => {
    onGetPosts();
  }, [onGetPosts])

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user">Welcome to the community</i>
        </p>
        <div className="posts">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </>
    )
  )
}

export default Posts;
