//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Redux imports
import { addPost } from "../../../../store/modules/posts/actions";

//Style imports
import "./styles.css";

const PostForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onAddPost = (text) => dispatch(addPost(text));

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPost({text});
    setText("");
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={event => setText(event.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Create" />
      </form>
    </div>
  );
};

export default PostForm;
