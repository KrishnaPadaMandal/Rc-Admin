import { Navigate, Route, Routes } from "react-router-dom";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/Users/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/About/AboutPage";
import AboutNewPage from "./pages/About/AboutNewPage";
import ContactPage from "./pages/ContactUs/ContactPage";
import ContactNewPage from "./pages/ContactUs/ContactNewPage";
import Login from "./pages/Login/Login";
import { useAuth } from "./context/AuthProvider";
import ProtectedRoute from "./Protected/ProtectedRoute";
import UserNewPage from "./pages/Users/UserNewPage";
import SiteSettingPage from "./pages/SiteSetting/SiteSettingPage";
import SiteSettingNewPage from "./pages/SiteSetting/SiteSettingNewPage";
import ServicePage from "./pages/Services/ServicePage";
import ServiceNewPage from "./pages/Services/ServiceNewPage";
import BlogPage from "./pages/Blog/BlogPage";
import BlogNewPage from "./pages/Blog/BlogNewPage";
import MyEditor from "./components/common/CKEditor";
import OurTeamPage from "./pages/Our Team/OurTeamPage";
import OurTeamNewPage from "./pages/Our Team/OurTeamNewPage";
import LightMood from "./components/Test/LightMood";

function App() {
  const { authUser } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/"
          element={<ProtectedRoute element={<OverviewPage />} />}
        />
        <Route
          path="/products"
          element={<ProtectedRoute element={<ProductsPage />} />}
        />
        {/* About Routes */}
        <Route
          path="/about"
          element={<ProtectedRoute element={<AboutPage />} />}
        />
        <Route
          path="/about/:id"
          element={<ProtectedRoute element={<AboutNewPage />} />}
        />
        <Route
          path="/about/new-about"
          element={<ProtectedRoute element={<AboutNewPage />} />}
        />
        {/* Contact Routes */}
        <Route
          path="/contact"
          element={<ProtectedRoute element={<ContactPage />} />}
        />
        <Route
          path="/contact/:id"
          element={<ProtectedRoute element={<ContactNewPage />} />}
        />

        {/* Site Setting Routes */}
        <Route
          path="/site-setting"
          element={<ProtectedRoute element={<SiteSettingPage />} />}
        />
        <Route
          path="/site-setting/:id"
          element={<ProtectedRoute element={<SiteSettingNewPage />} />}
        />

        {/* Blog Routes */}
        <Route
          path="/blog"
          element={<ProtectedRoute element={<BlogPage />} />}
        />
        <Route
          path="/blog/:id"
          element={<ProtectedRoute element={<BlogNewPage />} />}
        />
        <Route
          path="/blog/new-blog"
          element={<ProtectedRoute element={<BlogNewPage />} />}
        />

        {/* Our Team Routes */}

        <Route
          path="/our-team"
          element={<ProtectedRoute element={<OurTeamPage />} />}
        />
        <Route
          path="/our-team/:id"
          element={<ProtectedRoute element={<OurTeamNewPage />} />}
        />
        <Route
          path="/our-team/new-our-team"
          element={<ProtectedRoute element={<OurTeamNewPage />} />}
        />

        {/* Users Routes */}
        <Route
          path="/users"
          element={<ProtectedRoute element={<UsersPage />} />}
        />
        <Route
          path="/users/:id"
          element={<ProtectedRoute element={<UserNewPage />} />}
        />
        <Route
          path="/users/new-user"
          element={<ProtectedRoute element={<UserNewPage />} />}
        />

        {/* Services Route */}
        <Route
          path="/services"
          element={<ProtectedRoute element={<ServicePage />} />}
        />
        <Route
          path="/services/:id"
          element={<ProtectedRoute element={<ServiceNewPage />} />}
        />
        <Route
          path="/services/new-service"
          element={<ProtectedRoute element={<ServiceNewPage />} />}
        />

        <Route
          path="/sales"
          element={<ProtectedRoute element={<SalesPage />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<OrdersPage />} />}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute element={<AnalyticsPage />} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<SettingsPage />} />}
        />

        <Route path="/ck-editor" element={<MyEditor />} />
        <Route path="/light-mood" element={<LightMood />} />
      </Routes>
    </>
  );
}

export default App;
