import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import request from "../../api";
import "./_videoHorizontal.scss";

const VideoHorizontal = ({ video, channelVideos }) => {
  const {
    id,
    snippet: {
      publishedAt,
      channelId,
      title,
      thumbnails: { medium },
      channelTitle,
      resourceId,
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  // const [channelIcon, setChannelIcon] = useState(null);

  const history = useHistory();

  const seconds = moment.duration(duration).asSeconds();
  const videoDuration = moment.utc(seconds * 1000).format("mm:ss");

  const videoId = channelVideos ? resourceId?.videoId : id.videoId;

  useEffect(() => {
    request("/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videoId,
      },
    })
      .then((data) => {
        setViews(data.data.items[0].statistics.viewCount);
        setDuration(data.data.items[0].contentDetails.duration);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [videoId]);

  const handleVideoClick = () => {
    history.push(`/watch/${videoId}`);
  };

  return (
    <div className="videoHorizontal" onClick={handleVideoClick}>
      <div className="videoHorizontal__left">
        <img src={medium.url} alt="video" />
        {videoDuration && <span>{videoDuration}</span>}
      </div>
      <div className="videoHorizontal__right">
        <div className="videoHorizontal__title">{title}</div>
        <div className="videoHorizontal__details">
          <span>{channelTitle}</span>
          <span>
            {numeral(views).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoHorizontal;
