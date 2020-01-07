//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Redux imports
import { addComment } from "../../../../../../store/modules/posts/actions";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onAddComment = (postId,text) => dispatch(addComment(postId,text));

  const handleSubmit = event => {
    event.preventDefault();
    onAddComment(postId,{text});
    setText("");
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={event => setText(event.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Comment" />
      </form>
    </div>
  );
};

export default CommentForm;
