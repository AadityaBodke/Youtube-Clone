import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import {
  getRelatedVideos,
  getVideoById,
} from "../../store/actions/videoActions";
import "./watchScreen.scss";

const WatchScreen = ({ setActive }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  useEffect(() => {
    setActive("");
  });

  return (
    <Row>
      <Col lg={8}>
        <div className="watchscreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet.title}
            allowFullScreen
            height="100%"
            width="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} id={id} />
        ) : (
          <div>Loading...</div>
        )}
        <Comments videoId={id} commentCount={video?.statistics.commentCount} />
      </Col>
      <Col lg={4}>
        {!relatedVideosLoading &&
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;
