//Library imports
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Component imports
import Spinner from "../../components/Spinner";

//Redux imports
import { getPosts } from "../../store/modules/posts/actions";

const Posts = () => {
  const posts = useSelector(state => state.posts.posts);
  
  const dispatch = useDispatch();

  const onGetPosts = useCallback(() => dispatch(getPosts()), [dispatch]);

  useEffect(() => {
    onGetPosts();
  }, [onGetPosts])
  
  return (
    <div>
      
    </div>
  )
}

export default Posts;
