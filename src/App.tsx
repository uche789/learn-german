import React from "react";
import "./App.css";
import Layout from "./features/layout/components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import PracticePage from "@/pages/PracticePage";
import GrammarPage from "@/pages/GrammarPage";
import IdiomsPage from "@/pages/IdiomsPage";
import IdiomDetailsPage from "@/pages/IdiomDetailsPage";
import GrammarDetailsPage from "@/pages/GrammarDetailsPage";
import VocabularyPage from "@/pages/VocabularyPage";
import VocabularyDetailsPage from "@/pages/VocabularyDetailsPage";
import VocabPractice from "@/pages/VocabPractice";
import GlobalStateProvider from "./context/global";
import VocabAmin from "./pages/VocabAdmin";
import VocabFormAdmin from "./pages/VocabFormAdmin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/learn-german">
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
              <Route path="/:lang/practice" element={<PracticePage />} />
              <Route path="/:lang/practice/vocabulary" element={<VocabPractice />} />
              <Route path="/:lang/grammar" element={<GrammarPage />} />
              <Route path="/:lang/idioms" element={<IdiomsPage />} />
              <Route path="/:lang/idiom/:slug" element={<IdiomDetailsPage />} />
              <Route path="/:lang/grammar/:slug" element={<GrammarDetailsPage />} />
              <Route path="/:lang/vocabulary/" element={<VocabularyPage />} />
              <Route path="/:lang/vocabulary/:slug" element={<VocabularyDetailsPage />} />
            </Route>
            <Route path="/admin" element={<VocabAmin />} />
            <Route path="/admin/vocab/form" element={<VocabFormAdmin />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
