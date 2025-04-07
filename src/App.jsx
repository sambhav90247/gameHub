import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import GameDetails from "./pages/GameDetailPage"; // ✅ Fix: import sahi component
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import { useState, useRef } from "react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const resetHomeRef = useRef(null);

  const handleToggleFilters = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleResetHome = () => {
    setSearchQuery("");
    setIsSidebarVisible(false);

    if (resetHomeRef.current) {
      resetHomeRef.current.resetToDefault(); // 👈 call reset from HomePage
    }
  };

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <Router>
          <div>
            <Header
              onSearch={setSearchQuery}
              onToggleFilters={handleToggleFilters}
              onResetHome={handleResetHome}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    searchQuery={searchQuery}
                    onToggleFilters={handleToggleFilters}
                    isSidebarVisible={isSidebarVisible}
                    setResetRef={resetHomeRef}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage
                      searchQuery={searchQuery}
                      isSidebarVisible={isSidebarVisible}
                      onToggleFilters={handleToggleFilters}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/game/:id" element={<GameDetails />} /> {/* ✅ Route fix */}
              <Route path="/sign-in" element={<SignInPage />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </ClerkProvider>
  );
};

export default App;
