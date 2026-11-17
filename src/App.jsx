import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ArrowUp, CalendarPlus, MessageCircle } from "lucide-react";
import { AppProvider, Link, useApp } from "./store";
import { Footer, LoginModal, Navbar, Toaster } from "./components";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Services, { ServiceDetail } from "./pages/Services";
import Contact from "./pages/Contact";
import Appointments from "./pages/Appointments";
import { AdminDashboard, AdminLogin } from "./pages/Admin";
function ScrollHelpers() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return _jsxs(_Fragment, {
    children: [
      _jsx("a", {
        href: "https://wa.me/9779819021699?text=Hello%20MediCare%2C%20I%20would%20like%20to%20book%20an%20appointment.",
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "Chat on WhatsApp",
        className:
          "fixed bottom-5 left-5 z-40 w-13 h-13 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg shadow-emerald-300/50 hover:scale-110 transition-transform",
        children: _jsx(MessageCircle, { size: 22 }),
      }),
      _jsx(Link, {
        to: "/doctors",
        "aria-label": "Quick book appointment",
        className:
          "fixed bottom-5 right-5 z-40 sm:hidden btn-primary w-13 h-13 rounded-full text-white grid place-items-center shadow-lg",
        children: _jsx(CalendarPlus, { size: 21 }),
      }),
      show &&
        _jsx("button", {
          onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          "aria-label": "Back to top",
          className:
            "fixed bottom-5 right-20 sm:right-5 z-40 w-12 h-12 rounded-full bg-white border border-emerald-200 text-emerald-700 grid place-items-center shadow-soft hover:-translate-y-1 transition-transform pop-in",
          children: _jsx(ArrowUp, { size: 19 }),
        }),
    ],
  });
}
function NotFound() {
  return _jsx("div", {
    className:
      "page-shell min-h-[65vh] grid place-items-center px-5 py-20 text-center",
    children: _jsxs("div", {
      className:
        "rounded-3xl bg-white border border-emerald-100 shadow-soft p-10 max-w-md",
      children: [
        _jsx("p", {
          className: "font-display text-6xl text-emerald-500",
          children: "404",
        }),
        _jsx("h1", {
          className: "font-display text-2xl text-emerald-950 mt-3",
          children: "Page Not Found",
        }),
        _jsx("p", {
          className: "text-sm text-slate-500 mt-2",
          children:
            "The page you're looking for isn't available. Let's get you back to great care.",
        }),
        _jsx(Link, {
          to: "/doctors",
          className:
            "btn-primary mt-6 inline-flex px-6 py-2.5 rounded-full text-white text-sm font-bold",
          children: "Browse Doctors",
        }),
      ],
    }),
  });
}
function Page() {
  const { route } = useApp();
  const path = route.split("?")[0].replace(/\/+$/, "") || "/";
  useEffect(() => {
    const titles = {
      "/": "MediCare+ | Premium Healthcare At Your Fingertips",
      "/doctors": "Our Medical Experts | MediCare",
      "/services": "Diagnostic Services | MediCare",
      "/appointments": "My Appointments | MediCare",
      "/contact": "Contact Our Clinic | MediCare",
    };
    document.title =
      titles[path] ??
      (path.startsWith("/doctors/")
        ? "Doctor Profile | MediCare"
        : path.startsWith("/services/")
          ? "Service Details | MediCare"
          : "MediCare | Doctor Appointment");
  }, [path]);
  if (path === "/") return _jsx(Home, {});
  if (path === "/doctors") return _jsx(Doctors, {});
  if (path.startsWith("/doctors/"))
    return _jsx(DoctorProfile, { id: path.slice("/doctors/".length) });
  if (path === "/services") return _jsx(Services, {});
  if (path.startsWith("/services/"))
    return _jsx(ServiceDetail, { id: path.slice("/services/".length) });
  if (path === "/appointments") return _jsx(Appointments, {});
  if (path === "/contact") return _jsx(Contact, {});
  if (path === "/doctor-admin/login") return _jsx(AdminLogin, {});
  if (path === "/doctor-admin") return _jsx(AdminDashboard, {});
  return _jsx(NotFound, {});
}
function Shell() {
  const { route } = useApp();
  const hideFooter = route.startsWith("/doctor-admin");
  return _jsxs("div", {
    className: "min-h-screen bg-[#f2fbf7] font-body",
    children: [
      _jsx(Navbar, {}),
      _jsx("main", { children: _jsx(Page, {}) }),
      !hideFooter && _jsx(Footer, {}),
      _jsx(Toaster, {}),
      _jsx(LoginModal, {}),
      _jsx(ScrollHelpers, {}),
    ],
  });
}
export default function App() {
  return _jsx(AppProvider, { children: _jsx(Shell, {}) });
}
