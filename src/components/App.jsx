import "../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeContext } from "../utils/contexts/ModeContext";
import { Routes, Route } from "react-router-dom";

import Main from "./Main/Main";
import Timer from "./Main/Timer";
import Stopwatch from "./Main/Stopwatch";
import ReportsPage from "./Reports/ReportsPage";
import Header from "./Header";
import AuthorizationApi from "../utils/AuthorizationApi";
import Api from "../utils/Api";
import AuthPage from "./AuthPage";
import ProtectedElement from "./ProtectedElement";
import { CurrentUserDataContext } from "../utils/contexts/currentUserDataContext";
import SubscriptionPage from "./SubscriptionPage";
import YouTubePlayer from "./Playlist/YouTubePlayer";
import AdminPlaylistManager from "./Playlist/AdminPlaylistManager";
const baseUrl = "http://localhost:3001";
// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? "website"
//     : "http://localhost:5000";
const authorizeUser = new AuthorizationApi(baseUrl);
const api = new Api(baseUrl);

// need to make a subscription confirmation page
function App() {
  const [mode, setMode] = useState("timer");
  const [elapsedTimesObjs, setElapsedTimesObjs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [token, setToken] = useState("");
  const [pageModifier, setPageModifier] = useState("");
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [savedSessionData, setSavedSessionData] = useState({});
  const [frequentlyUsedLabelsData, setFrequentlyUsedLabelsData] = useState({});

  const navigate = useNavigate();

  // AUTHORIZATION
  function loginUser({ email, password }, resetForm) {
    authorizeUser
      .loginUser({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        getUserData(data.token);
        setIsLoggedIn(true);
        resetForm();
      })
      .catch(console.error);
  }

  function registerAndLoginUser(
    { email, password, username, avatar },
    resetForm
  ) {
    authorizeUser
      .registerUser({ email, password, username, avatar })
      .then(() => {
        loginUser({ email, password }, resetForm);
        navigate("/");
      })
      .catch(console.error);
  }

  function getUserData(token) {
    api
      .getUserData(token)
      .then((responseUserData) => {
        setCurrentUserData(responseUserData);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }

  function logoutUser() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setCurrentUserData({});
  }
  // // check for jwt upon initial visit
  useEffect(() => {
    if ("jwt" in localStorage) {
      const token = localStorage.getItem("jwt");
      setToken(token);
      getUserData(token);
    } else setIsLoggedIn(false);
  }, [setIsLoggedIn, isLoggedIn]);
  // END OF AUTHORIZATION

  //STRIPE
  function redirectToCustomerPortalUrl(e) {
    e.preventDefault();
    api
      .createCustomerPortalSession(token, {
        customerId: currentUserData.stripeInfo.id,
        returnUrl: "http://localhost:5173/",
      })
      .then((res) => {
        window.location.href = res.url;
        console.log(res.url);
      })
      .catch(console.error);
  }
  // END OF STRIPE

  // PLAYLIST
  useEffect(() => {
    function fetchPlaylist() {
      if (token) {
        api
          .fetchPlaylist(token)
          .then((data) => setPlaylistId(data.playlistId))
          .catch((err) => console.error("Error fetching playlist ID:", err));
      }
    }

    fetchPlaylist();
  }, [token]);

  function savePlaylist() {
    if (currentUserData && token) {
      const { _id, admin } = currentUserData;

      const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
      const match = playlistUrl.match(regex);
      const extractedPlaylistId = match ? match[1] : null;
      setPlaylistId(extractedPlaylistId);

      api
        .savePlaylist(token, {
          adminId: _id,
          admin,
          playlistId: extractedPlaylistId,
        })
        .then(() => {
          alert("Playlist saved successfully!");
        })
        .catch((err) => console.error("Error saving playlist:", err));
    }
  }
  // END OF PLAYLIST

  // SESSIONS

  function getStudySessions() {
    api
      .getStudySessions(token)
      .then((data) => {
        setSavedSessionData(data.data);
        const formattedFreqLabelsData = Object.keys(data.freqLabels).reduce(
          (acc, label) => {
            acc[label] = data.freqLabels[label].map((item) => ({
              ...item,
              avgElapsedTime: parseFloat(item.avgElapsedTime), // Convert string to number
            }));
            return acc;
          },
          {}
        );
        setFrequentlyUsedLabelsData(
          new Map(Object.entries(formattedFreqLabelsData))
        );
      })
      .catch(console.error);
  }

  // END OF SESSIONS

  // function removeSpacebarFunctionalityOnActiveBtn(e) {
  //   if (
  //     e.code === "Space" &&
  //     !document.activeElement.classList.contains("lap-btn")
  //   ) {
  //     e.preventDefault();
  //   }
  // }

  // // come back and fix the logic for the spacebar/lap time functionality
  // useEffect(() => {
  //   document.addEventListener(
  //     "keydown",
  //     removeSpacebarFunctionalityOnActiveBtn
  //   );

  //   return () => {
  //     document.removeEventListener(
  //       "keydown",
  //       removeSpacebarFunctionalityOnActiveBtn
  //     );
  //   };
  // }, []);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <CurrentUserDataContext.Provider value={{ currentUserData, isLoggedIn }}>
        <div className={`page ${pageModifier}`}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header logoutUser={logoutUser} />
                  <Main
                    elapsedTimesObjs={elapsedTimesObjs}
                    api={api}
                    token={token}
                  >
                    <Timer
                      elapsedTimesObjs={elapsedTimesObjs}
                      setElapsedTimesObjs={setElapsedTimesObjs}
                    />
                  </Main>
                </>
              }
            />
            <Route
              path="/stopwatch"
              element={
                <>
                  <Header logoutUser={logoutUser} />
                  <Main
                    elapsedTimesObjs={elapsedTimesObjs}
                    api={api}
                    token={token}
                  >
                    <Stopwatch
                      elapsedTimesObjs={elapsedTimesObjs}
                      setElapsedTimesObjs={setElapsedTimesObjs}
                    />
                  </Main>
                </>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedElement
                  isAllowed={
                    isLoggedIn && currentUserData.subscriptionTier === "Premium"
                  }
                >
                  <ReportsPage
                    header={<Header logoutUser={logoutUser} />}
                    savedSessionData={savedSessionData}
                    getStudySessions={getStudySessions}
                    frequentlyUsedLabelsData={frequentlyUsedLabelsData}
                  />
                </ProtectedElement>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedElement isAllowed={!isLoggedIn}>
                  <AuthPage
                    handleAuth={loginUser}
                    title="Login"
                    formName="login"
                    inputs={[
                      { inputName: "email", type: "email", required: true },
                      {
                        inputName: "password",
                        type: "password",
                        required: true,
                      },
                    ]}
                  >
                    <Link className="auth-pg__link">Forgot password?</Link>
                    <Link to="/signup" className="auth-pg__link">
                      Or signup here
                    </Link>
                  </AuthPage>
                </ProtectedElement>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthPage
                  handleAuth={registerAndLoginUser}
                  title="Register Account"
                  formName="signup"
                  inputs={[
                    { inputName: "email", type: "email", required: true },
                    { inputName: "password", type: "password", required: true },
                    {
                      inputName: "username",
                      type: "text",
                      required: true,
                      min: 2,
                      max: 40,
                    },
                    {
                      inputName: "avatar link",
                      type: "url",
                      required: false,
                    },
                  ]}
                >
                  <Link to="/login" className="auth-pg__link">
                    Or login here
                  </Link>
                </AuthPage>
              }
            />
            <Route
              path="/subscribe"
              element={
                <SubscriptionPage
                  header={<Header logoutUser={logoutUser} />}
                  setPageModifier={setPageModifier}
                  redirectToCustomerPortalUrl={redirectToCustomerPortalUrl}
                />
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedElement isAllowed={currentUserData.admin}>
                  <AdminPlaylistManager
                    playlistUrl={playlistUrl}
                    setPlaylistUrl={setPlaylistUrl}
                    savePlaylist={savePlaylist}
                  />
                </ProtectedElement>
              }
            />
          </Routes>
          <YouTubePlayer playlistId={playlistId} />
        </div>
      </CurrentUserDataContext.Provider>
    </ModeContext.Provider>
  );
}

export default App;
