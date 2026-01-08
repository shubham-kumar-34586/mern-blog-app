import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DataProvider from "./context/DataProvider";

// components
import Login from "./components/account/Login";
import Header from "./components/account/header/Header";
import Home from "./components/home/Home";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

// 🔐 Protected Layout
const ProtectedLayout = () => {
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <DataProvider>
      <div style={{ marginTop: 64 }}>
        <Routes>

          {/* 🔓 Public */}
          <Route path="/login" element={<Login />} />

          {/* 🔐 Protected */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update/:id" element={<CreatePost />} />
            <Route path="/details/:id" element={<DetailView />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* 🚫 Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
