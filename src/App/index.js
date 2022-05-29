import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "../theme";
import OnlineTracker from "./OnlineTracker";

import Layout from "../Layout";
import UiNowPlaying from "../UiNowPlaying";
import UiTopRated from "../UiTopRated";
import UiNotFound from "../UiNotFound";
import UiDetail from "../UiDetail";

function App() {
  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="now-playing" />} />

            <Route path="now-playing" element={<UiNowPlaying />} />
            <Route path="top-rated" element={<UiTopRated />} />
          </Route>

          <Route path="*" element={<UiNotFound />} />
        </Routes>

        <UiDetail />
        <OnlineTracker />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
