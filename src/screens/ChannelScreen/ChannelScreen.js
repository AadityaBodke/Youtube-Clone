import React, { useEffect } from "react";
import "./channelScreen.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getVideosByChannel } from "../../store/actions/videoActions";
import { Col, Container, Row } from "react-bootstrap";
import Video from "../../components/video/Video";
import {
  getChannelDetails,
  getSubscriptionStatus,
} from "../../store/actions/channelActions";
import numeral from "numeral";

const ChannelScreen = ({ setActive }) => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );
  const { subscriptionStatus } = useSelector((state) => state.channelDetails);

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(getSubscriptionStatus(channelId));
  }, [dispatch, channelId]);
  useEffect(() => {
    setActive("");
  });

  return (
    <>
      <div className="channelHeader">
        <div className="channelHeader__main">
          <img src={snippet?.thumbnails?.default?.url} alt="" />
          <div>
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>
        <button
          className={
            subscriptionStatus
              ? "channelHeader__subscribed"
              : "channelHeader__notSubscribed"
          }
        >
          {subscriptionStatus ? "SUBSCRIBED" : "SUBSCRIBE"}
        </button>
      </div>
      <hr />
      <Container>
        {!loading && (
          <Row>
            {videos.map((video) => (
              <Col lg={3} md={4}>
                <Video video={video} key={video.id} channelVideos />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ChannelScreen;
