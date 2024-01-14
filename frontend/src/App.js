import "./App.css";
import React, { useState, useEffect } from "react";
import LoginSignUp from "./component/User/LoginSignUp";
// import '@mui/x-data-grid-pro/dist/index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import { ThemeProviderWrapper } from "./component/admin/ThemeContext";
import DashboardPage from "./component/admin/DashboardPage";
import UsersPage from "./component/admin/UsersPage";
import CategoryPage from "./component/admin/CategoryPage";
import Dailytips from "./component/admin/Dailytips";
import Setting from "./component/admin/Setting";

import InterestPage from "./component/admin/InterestPage";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import BlockWords from "./component/admin/BlockWords";

import DailyQuiz from "./component/admin/DailyQuiz";
import Notification from "./component/admin/Notification";
import Blog from "./component/admin/Blog";
import SubCategoryPage from "./component/admin/Subcategory";
import Exercise_or_Meditation from "./component/admin/Exercise_or_Meditation";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      {/* <ThemeProviderWrapper>
      <AdminPanel />
    </ThemeProviderWrapper> */}

      <ThemeProviderWrapper>
        <Router>
          <Routes>
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route exact path="/" element={<DashboardPage />} />
              <Route exact path="/users" element={<UsersPage />} />
              <Route exact path="/category" element={<CategoryPage />} />
              <Route exact path="/dailytips" element={<Dailytips />} />
              <Route exact path="/subcategory" element={<SubCategoryPage />} />
              <Route exact path="/setting" element={<Setting />} />

              <Route exact path="/interest" element={<InterestPage />} />
              <Route exact path="/dailyquiz" element={<DailyQuiz />} />
              <Route exact path="/blockwords" element={<BlockWords />} />
              <Route exact path="/interest" element={<InterestPage />} />
              <Route exact path="/dailyquiz" element={<DailyQuiz />} />
              <Route exact path="/blockwords" element={<BlockWords />} />

              <Route exact path="/notification" element={<Notification />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route
                exact
                path="/exercise_or_meditation"
                element={<Exercise_or_Meditation />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProviderWrapper>

      {/* <LoginSignUp/> */}
    </>
  );
}

export default App;
