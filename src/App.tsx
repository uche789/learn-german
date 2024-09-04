import React from "react";
import "./App.css";
import Layout from "./features/layout/components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import Practice from "@/pages/practice";
import Learn from "@/pages/learn";
import GlobalStateProvider from "./context/global";

export type Word = {
  english: string;
  german: string;
};

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to /en or any default language */}
          <Route path="/" element={<Navigate to="/de" />} />

          {/* Dynamic route that handles /:lang */}
          <Route
            path="/:lang"
            element={
              <GlobalStateProvider>
                <Layout />
              </GlobalStateProvider>
            }
          >
            <Route index element={<Learn />} />
            <Route path="/:lang/practice" element={<Practice />} />
            <Route path="/:lang/learn" element={<Learn />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      {/* <ContinueButton answer="This is the answer" type="check" onClick={() => console.log('works')} /> */}
    </>
  );
};

export default App;
