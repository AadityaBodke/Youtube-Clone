import moment from "moment";
import React from "react";
import "./_comment.scss";

const Comment = ({
  comment: {
    textOriginal,
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
  },
}) => {
  return (
    <div className="comment">
      <img src={authorProfileImageUrl} alt="profile pic" />
      <div className="comment__body">
        <span className="comment__header">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </span>
        <span>{textOriginal}</span>
      </div>
    </div>
  );
};

export default Comment;
