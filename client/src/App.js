import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import VideoChat from "scenes/videoChatPage";
import Room from "scenes/videoChatPage/Room";
import EditProfile from "scenes/EditProfile";



function App() {
  const mode = useSelector((state) => state.mode);
  console.log("Mode:", mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/videochat" element={isAuth ? <VideoChat /> : <Navigate to="/" />} />
            <Route path="/videochat/:roomId" element={isAuth ? <Room /> : <Navigate to="/" />} />
            <Route path="/profile/:userId/edit" element={isAuth ? <EditProfile /> : <Navigate to="/" />} />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
