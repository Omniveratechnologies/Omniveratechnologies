import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import WhyChooseUsPage from "./pages/WhyChooseUsPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import LoginPage from "./pages/LoginPage";
import StudioPage from "./pages/StudioPage";

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
      <Route path="/company-profile" element={<CompanyProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/studio" element={<StudioPage />} />
      <Route path="/studio/admin" element={<StudioPage expectedRole="admin" />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
