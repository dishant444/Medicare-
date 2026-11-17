import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
const Ctx = createContext(null);
const readLocal = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    }
    catch {
        return fallback;
    }
};
const currentRoute = () => {
    const hash = window.location.hash.replace(/^#/, "");
    return hash || "/doctors";
};
export function AppProvider({ children }) {
    const [route, setRoute] = useState(currentRoute);
    const [user, setUser] = useState(() => readLocal("medicare_user", null));
    const [admin, setAdminState] = useState(() => readLocal("medicare_admin", false));
    const [appointments, setAppointments] = useState(() => readLocal("medicare_appointments", []));
    const [loginOpen, setLoginOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    useEffect(() => {
        // A fresh visit without a hash opens the doctors directory (the reference page).
        if (!window.location.hash) {
            window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/doctors`);
        }
        const onHash = () => {
            setRoute(currentRoute());
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);
    useEffect(() => {
        localStorage.setItem("medicare_appointments", JSON.stringify(appointments));
    }, [appointments]);
    useEffect(() => {
        localStorage.setItem("medicare_user", JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        localStorage.setItem("medicare_admin", JSON.stringify(admin));
    }, [admin]);
    const navigate = useCallback((path) => {
        if (currentRoute() === path) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        window.location.hash = path;
    }, []);
    const dismissToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const toast = useCallback((message, tone = "success") => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, tone }]);
        window.setTimeout(() => dismissToast(id), 3800);
    }, [dismissToast]);
    const signIn = useCallback((value) => {
        setUser(value);
        setLoginOpen(false);
        toast(`Welcome back, ${value.name.split(" ")[0]}!`);
    }, [toast]);
    const signOut = useCallback(() => {
        setUser(null);
        toast("You have been signed out.", "info");
    }, [toast]);
    const setAdmin = useCallback((value) => {
        setAdminState(value);
        if (!value)
            localStorage.removeItem("medicare_admin");
    }, []);
    const addAppointment = useCallback((appointment) => {
        setAppointments((prev) => [appointment, ...prev]);
    }, []);
    const cancelAppointment = useCallback((id) => {
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a)));
    }, []);
    const value = useMemo(() => ({
        route,
        navigate,
        user,
        signIn,
        signOut,
        loginOpen,
        setLoginOpen,
        appointments,
        addAppointment,
        cancelAppointment,
        toasts,
        toast,
        dismissToast,
        admin,
        setAdmin,
    }), [
        route, navigate, user, signIn, signOut, loginOpen, appointments, addAppointment,
        cancelAppointment, toasts, toast, dismissToast, admin, setAdmin,
    ]);
    return _jsx(Ctx.Provider, { value: value, children: children });
}
export function useApp() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error("useApp must be used inside AppProvider");
    return ctx;
}
export function Link({ to, children, className = "", onClick, ...rest }) {
    const { navigate } = useApp();
    return (_jsx("a", { href: `#${to}`, className: className, onClick: (e) => {
            e.preventDefault();
            onClick?.();
            navigate(to);
        }, ...rest, children: children }));
}
