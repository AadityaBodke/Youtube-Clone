import React, { useEffect, useState } from "react";
import "./_video.scss";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";
import request from "../../api";
import { useHistory } from "react-router";

const Video = ({ video, channelVideos }) => {
  const {
    id,
    snippet: {
      channelId,
      title,
      channelTitle,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [channelIcon, setChannelIcon] = useState("");

  const seconds = moment.duration(duration).asSeconds();
  const videoDuration = moment.utc(seconds * 1000).format("mm:ss");

  // const videoId = id?.videoId || id; //hack to get the proper id
  const videoId = channelVideos ? resourceId?.videoId : id?.videoId || id;
  const history = useHistory();

  useEffect(() => {
    request("/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videoId,
      },
    })
      .then((data) => {
        setViews(data.data.items[0]?.statistics.viewCount);
        setDuration(data.data.items[0]?.contentDetails.duration);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [videoId]);

  useEffect(() => {
    request
      .get("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      })
      .then((data) => {
        setChannelIcon(data.data.items[0].snippet.thumbnails.default);
      });
  }, [channelId]);

  const handleVideoClick = () => {
    history.push(`/watch/${videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <img src={medium.url} alt="Video Preview" />
        <span>{videoDuration}</span>
      </div>
      <div className="video__description">
        {!channelVideos && <img src={channelIcon?.url} alt="channel" />}
        <div className="details">
          <div className="details__title">{title}</div>
          {!channelVideos && (
            <div className="details__channel">
              <span>{channelTitle}</span>
            </div>
          )}
          <div className="details__stats">
            <span>
              <AiFillEye /> {numeral(views).format("0.a")} Views •
            </span>
            <span> {moment(publishedAt).fromNow()} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
