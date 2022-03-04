import { Container } from "react-bootstrap";
import "./_app.scss";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen/HomeScreen.js";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import WatchScreen from "./screens/WatchScreen/WatchScreen.js";
import SearchScreen from "./screens/SearchScreen/SearchScreen.js";
import SubsScreen from "./screens/SubscriptionsScreen/SubsScreen.js";
import ChannelScreen from "./screens/ChannelScreen/ChannelScreen.js";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { useSelector } from "react-redux";

function App() {
  const [active, setActive] = useState("");
  const { user } = useSelector((state) => state.auth);

  const Layout = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const handleToggleSidebar = () => setToggleSidebar(!toggleSidebar);

    return (
      <>
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className="app__container">
          <Sidebar
            toggleSidebar={toggleSidebar}
            active={active}
            setActive={setActive}
          />
          <Container fluid className="app__main">
            {children}
          </Container>
        </div>
      </>
    );
  };

  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <HomeScreen setActive={setActive} />
        </Layout>
      </Route>
      <Route exact path="/watch/:id">
        <Layout>
          <WatchScreen setActive={setActive} />
        </Layout>
      </Route>
      <Route exact path="/search/:text">
        <Layout>
          <SearchScreen setActive={setActive} />
        </Layout>
      </Route>
      <Route exact path="/feed/subscriptions">
        <Layout>
          {user !== null ? (
            <SubsScreen setActive={setActive} />
          ) : (
            <LoginScreen setActive={setActive} value="Subscriptions" />
          )}
        </Layout>
      </Route>
      <Route exact path="/channel/:channelId">
        <Layout>
          <ChannelScreen setActive={setActive} />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
