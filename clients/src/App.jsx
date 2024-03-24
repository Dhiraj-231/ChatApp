import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/Auth/ProtectRoute";
import { LayoutLoader } from "./components/layouts/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const DashBoard = lazy(() => import("./pages/Admin/DashBoard"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagment"));
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagment"));
const GroupManagement = lazy(() => import("./pages/Admin/GroupManagment"));
let user = true;
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/group-management" element={<GroupManagement />} />
          <Route
            path="/admin/message-management"
            element={<MessageManagement />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
