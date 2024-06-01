import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import VideoChat from "scenes/videoChatPage";
import Room from "scenes/videoChatPage/Room";
import EditProfile from "scenes/EditProfile";
import RegisterPage from "scenes/RegisterPage";
import LoginPage from "scenes/LoginPage";



function App() {
  const mode = useSelector((state) => state.mode);
  // console.log("Mode:", mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/videochat" element={isAuth ? <VideoChat /> : <Navigate to="/login" />} />
            <Route path="/videochat/:roomId" element={isAuth ? <Room /> : <Navigate to="/login" />} />
            <Route path="/profile/:userId/edit" element={isAuth ? <EditProfile /> : <Navigate to="/login" />} />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
