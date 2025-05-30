import React from "react";
import "./App.css";
import Layout from "./layout/components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import GrammarPage from "@/pages/GrammarPage";
import IdiomsPage from "@/pages/IdiomsPage";
import IdiomDetailsPage from "@/pages/IdiomDetailsPage";
import GrammarDetailsPage from "@/pages/GrammarDetailsPage";
import VocabularyPage from "@/pages/VocabularyPage";
import VocabularyDetailsPage from "@/pages/VocabularyDetailsPage";
import GlobalStateProvider from "./context/global";
import AdminPage from "./pages/admin/AdminPage";
import AdminVocabFormPage from "./pages/admin/AdminVocabFormPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import SpeakingPage from "./pages/SpeakingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter 
          basename="/"
          future={{
            v7_relativeSplatPath: true,
          }}
        >
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
              <Route index element={<GrammarPage />} />
              <Route path="/:lang/grammar" element={<GrammarPage />} />
              <Route path="/:lang/idioms" element={<IdiomsPage />} />
              <Route path="/:lang/idiom/:slug" element={<IdiomDetailsPage />} />
              <Route path="/:lang/grammar/:slug" element={<GrammarDetailsPage />} />
              <Route path="/:lang/vocabulary/" element={<VocabularyPage />} />
              <Route path="/:lang/vocabulary/:slug" element={<VocabularyDetailsPage />} />
              <Route path="/:lang/speaking" element={<SpeakingPage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/vocab/form" element={<AdminVocabFormPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
