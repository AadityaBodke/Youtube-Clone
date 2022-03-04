import moment from "moment";
import numeral from "numeral";
import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ReactShowMoreText from "react-show-more-text";
import { useDispatch } from "react-redux";
import {
  getChannelDetails,
  getSubscriptionStatus,
} from "../../store/actions/channelActions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const VideoMetaData = ({ video: { snippet, statistics }, id }) => {
  const { publishedAt, channelId, title, description, channelTitle } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();
  const history = useHistory();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const { subscriptionStatus } = useSelector((state) => state.channelDetails);

  const handleChannelClick = () => {
    history.push(`/channel/${channelId}`);
  };

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(getSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="videoMetaData__top__stats">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}{" "}
          </span>
          <div className="videoMetaData__top__stats__icons">
            <span>
              <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
            </span>
            <span>
              <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel">
        <div
          className="videoMetaData__channel__details"
          onClick={handleChannelClick}
        >
          <img
            src={channelSnippet?.thumbnails.default.url}
            alt="channel icon"
          />
          <div>
            <span style={{ color: "#fff" }}>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={
            subscriptionStatus
              ? "videoMetaData__channel__subscribed"
              : "videoMetaData__channel__notSubscribed"
          }
        >
          {subscriptionStatus ? "SUBSCRIBED" : "SUBSCRIBE"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ReactShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
