//Library imports
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

//Component imports
import Spinner from "../../../../components/Spinner";
import PostItem from "../PostItem";
import CommentForm from "./components/CommentForm";
import CommentItem from "./components/CommentItem";

//Redux imports
import { getPost, clearPost } from "../../../../store/modules/posts/actions";

const Post = ( { match } ) => {
  const post = useSelector(state => state.posts.post);
  const isLoading = useSelector(state => state.posts.isLoading);

  const dispatch = useDispatch();

  const onGetPost = useCallback((postId) => dispatch(getPost(postId)), [dispatch]);
  const onClearPost = useCallback(() => dispatch(clearPost()), [dispatch]);

  useEffect(() => {
    onGetPost(match.params.id);

    return (() => {
      onClearPost();
    })
  }, [onGetPost,match.params.id,onClearPost])

  return (
    isLoading || post === null ? (
      <Spinner />
    ) : (
      <>
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        <PostItem post={post} />
        <CommentForm postId={post._id}/>
        <div className="comments">
          {
            post.comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))
          }
        </div>
      </>
    )
  )
}

export default Post;
