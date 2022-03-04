import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CategoriesBar from "../../components/categoriesbar/CategoriesBar";
import Video from "../../components/video/Video";
import { getPopularVideos } from "../../store/actions/videoActions";

const HomeScreen = ({ setActive }) => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  useEffect(() => {
    setActive("Home");
  });
  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map((video) => (
          <Col lg={3} md={4}>
            <Video video={video} key={video.id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
