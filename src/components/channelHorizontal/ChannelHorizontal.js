import numeral from "numeral";
import { useHistory } from "react-router";
import "./_channelHorizontal.scss";

const ChannelHorizontal = ({ channel }) => {
  const {
    snippet: {
      title,
      description,
      thumbnails: { medium },
      resourceId: { channelId },
    },
    contentDetails: { totalItemCount },
  } = channel;

  const history = useHistory();

  const handleChannelClick = () => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <div className="channelHorizontal" onClick={handleChannelClick}>
      <div className="channelHorizontal__left">
        <img src={medium.url} alt="video" />
      </div>
      <div className="channelHorizontal__right">
        <h6>{title}</h6>
        <p>{description}</p>
        <span>{numeral(totalItemCount).format("0.a")} Videos</span>
      </div>
    </div>
  );
};

export default ChannelHorizontal;
