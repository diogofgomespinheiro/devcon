//Library imports
import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

//Redux imports
import { removeComment } from "../../../../../../store/modules/posts/actions";

const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  postId
}) => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const onRemoveComment = (postId, commentId) =>
    dispatch(removeComment(postId, commentId));

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
        {!auth.isLoading && auth.user._id === user && (
          <button type="button" className="btn btn-danger" onClick={() => onRemoveComment(postId, _id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
};

export default CommentItem;
