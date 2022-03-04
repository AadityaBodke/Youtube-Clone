import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsByVideoId,
} from "../../store/actions/commentsActions";
import numeral from "numeral";

const Comments = ({ videoId, commentCount }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.commentList);
  const { user } = useSelector((state) => state.auth);

  const commentsSnippets = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  useEffect(() => {
    dispatch(getCommentsByVideoId(videoId));
  }, [dispatch, videoId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) return;
    dispatch(addComment(videoId, input));
    setInput("");
  };

  return (
    <div className="comments">
      <p>{numeral(commentCount).format("0.a")} Comments</p>
      <div className="comments__form">
        <img src={user?.photoURL} alt="profile pic" />
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button>Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {commentsSnippets?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
