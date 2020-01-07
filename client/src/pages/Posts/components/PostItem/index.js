//Library imports
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";

//Redux imports
import { addLike, removeLike, deletePost } from "../../../../store/modules/posts/actions";

//Style imports
import "./styles.css";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const onAddLike = (postId) => dispatch(addLike(postId));
  const onRemoveLike = (postId) => dispatch(removeLike(postId));
  const onDeletePost = (postId) => dispatch(deletePost(postId));

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        <button type="button" className="btn btn-light" onClick={() => onAddLike(_id)}>
          <i className="fas fa-thumbs-up"></i>{" "}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button type="button" className="btn btn-light" onClick={() => onRemoveLike(_id)}>
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.isLoading && user === auth.user._id && (
          <button type="button" className="btn btn-danger" onClick={() => onDeletePost(_id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
