import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { AlertCircle, ArrowRight, Building2, Clock3, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, } from "lucide-react";
import { useApp } from "../store";
import { clinicServices, departments } from "../data";
const blank = { name: "", email: "", phone: "", department: "", service: "", message: "" };
export default function Contact() {
    const [form, setForm] = useState(blank);
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const { toast } = useApp();
    const set = (key, value) => {
        setForm((f) => ({ ...f, [key]: value }));
        setErrors((e) => ({ ...e, [key]: undefined }));
    };
    const validate = () => {
        const e = {};
        if (form.name.trim().length < 2)
            e.name = "Full name is required";
        if (!/^\S+@\S+\.\S+$/.test(form.email))
            e.email = form.email ? "Enter a valid email" : "Email is required";
        if (!/^\d{10}$/.test(form.phone))
            e.phone = form.phone ? "Phone number must be exactly 10 digits" : "Phone number is required";
        if (!form.department && !form.service)
            e.department = "Please choose a department or service";
        if (form.message.trim().length < 10)
            e.message = "Please write a short message";
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    const submit = (e) => {
        e.preventDefault();
        if (!validate())
            return toast("Please fix the highlighted fields.", "error");
        const text = [
            "Hello MediCare 👋",
            "",
            `*Name:* ${form.name}`,
            `*Email:* ${form.email}`,
            `*Phone:* ${form.phone}`,
            `*Department:* ${form.department || "Not specified"}`,
            `*Service:* ${form.service || "Not specified"}`,
            `*Message:* ${form.message}`,
        ].join("\n");
        setSending(true);
        toast("Opening WhatsApp and preparing your message...", "info");
        window.open(`https://wa.me/9779819021699?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
        window.setTimeout(() => {
            setSending(false);
            setForm(blank);
            toast("Message prepared! Send it in WhatsApp to connect with us.");
        }, 800);
    };
    const fieldClass = (key) => `field ${errors[key] ? "field-error" : ""}`;
    return (_jsxs("div", { className: "page-shell min-h-screen py-10 sm:py-14 relative overflow-hidden", children: [_jsx("div", { className: "soft-grid absolute inset-0 opacity-60" }), _jsx("div", { className: "absolute -top-32 -left-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-8", children: [_jsxs("div", { className: "text-center fade-up", children: [_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-emerald-200 text-emerald-700 text-[0.75rem] font-extrabold tracking-[0.16em] uppercase shadow-sm", children: [_jsx(MessageCircle, { size: 14 }), " Get In Touch"] }), _jsx("h1", { className: "mt-4 font-display text-4xl sm:text-5xl bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent", children: "Contact Our Clinic" }), _jsx("p", { className: "mt-3 text-sm sm:text-base text-emerald-800/70", children: "Fill the form \u2014 we'll open WhatsApp so you can connect with us instantly." }), _jsx("div", { className: "mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-emerald-400 to-teal-500" })] }), _jsxs("div", { className: "mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start", children: [_jsxs("form", { onSubmit: submit, noValidate: true, className: "rounded-[2rem] bg-white/95 border border-emerald-100 shadow-soft p-6 sm:p-8 fade-up", children: [_jsx("h2", { className: "font-display text-2xl text-emerald-950", children: "Send Us a Message" }), _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "We usually respond within a few minutes during clinic hours." }), _jsxs("div", { className: "mt-6 grid sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-emerald-900", children: "Full Name *" }), _jsx("input", { className: `${fieldClass("name")} mt-1.5`, placeholder: "Your full name", value: form.name, onChange: (e) => set("name", e.target.value) }), errors.name && _jsxs("p", { className: "text-[0.75rem] text-rose-600 mt-1 flex items-center gap-1", children: [_jsx(AlertCircle, { size: 11 }), errors.name] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-emerald-900", children: "Email Address *" }), _jsx("input", { className: `${fieldClass("email")} mt-1.5`, placeholder: "you@example.com", value: form.email, onChange: (e) => set("email", e.target.value) }), errors.email && _jsxs("p", { className: "text-[0.75rem] text-rose-600 mt-1 flex items-center gap-1", children: [_jsx(AlertCircle, { size: 11 }), errors.email] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-emerald-900", children: "Phone Number *" }), _jsx("input", { className: `${fieldClass("phone")} mt-1.5`, placeholder: "10 digit mobile number", inputMode: "numeric", maxLength: 10, value: form.phone, onChange: (e) => set("phone", e.target.value.replace(/\D/g, "")) }), errors.phone && _jsxs("p", { className: "text-[0.75rem] text-rose-600 mt-1 flex items-center gap-1", children: [_jsx(AlertCircle, { size: 11 }), errors.phone] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-bold text-emerald-900", children: "Select Department" }), _jsxs("select", { className: `${fieldClass("department")} mt-1.5`, value: form.department, onChange: (e) => set("department", e.target.value), children: [_jsx("option", { value: "", children: "Select Department" }), departments.map((d) => _jsx("option", { children: d }, d))] }), errors.department && _jsxs("p", { className: "text-[0.75rem] text-rose-600 mt-1 flex items-center gap-1", children: [_jsx(AlertCircle, { size: 11 }), errors.department] })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { className: "text-xs font-bold text-emerald-900", children: "Select Service (or choose Department above)" }), _jsxs("select", { className: `${fieldClass("service")} mt-1.5`, value: form.service, onChange: (e) => set("service", e.target.value), children: [_jsx("option", { value: "", children: "Select Service" }), clinicServices.map((s) => _jsx("option", { children: s }, s))] })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { className: "text-xs font-bold text-emerald-900", children: "Your Message *" }), _jsx("textarea", { className: `${fieldClass("message")} mt-1.5 min-h-28 resize-y`, placeholder: "Tell us briefly how we can help you...", value: form.message, onChange: (e) => set("message", e.target.value) }), errors.message && _jsxs("p", { className: "text-[0.75rem] text-rose-600 mt-1 flex items-center gap-1", children: [_jsx(AlertCircle, { size: 11 }), errors.message] })] })] }), _jsx("button", { type: "submit", disabled: sending, className: "btn-primary mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-bold disabled:opacity-70", children: sending ? _jsxs(_Fragment, { children: [_jsx(Send, { size: 17 }), " Opening WhatsApp and clearing form..."] }) : _jsxs(_Fragment, { children: [_jsx(MessageCircle, { size: 18 }), " Send via WhatsApp ", _jsx(ArrowRight, { size: 16 })] }) }), _jsxs("p", { className: "text-center text-[0.75rem] text-slate-400 mt-3 flex items-center justify-center gap-1.5", children: [_jsx(ShieldCheck, { size: 13, className: "text-emerald-500" }), " Your details are only used to respond to your enquiry."] })] }), _jsxs("div", { className: "space-y-5 fade-up", style: { animationDelay: "0.1s" }, children: [_jsxs("div", { className: "rounded-[2rem] bg-linear-to-br from-emerald-600 to-teal-600 p-7 text-white shadow-soft relative overflow-hidden", children: [_jsx("div", { className: "absolute -right-10 -bottom-12 w-44 h-44 rounded-full bg-white/10" }), _jsx("h2", { className: "font-display text-2xl relative", children: "We're here to help" }), _jsx("p", { className: "text-sm text-emerald-50/90 mt-2 relative leading-relaxed", children: "Reach out for appointments, reports, billing or general enquiries. Our care coordinators are happy to assist." }), _jsxs("a", { href: "tel:+9779819021699", className: "mt-5 relative inline-flex items-center gap-2 rounded-full bg-white text-emerald-700 px-5 py-2.5 text-sm font-bold hover:shadow-lg transition", children: [_jsx(Phone, { size: 16 }), " +977 9819021699"] })] }), [
                                        { Icon: MapPin, title: "Visit Our Clinic", lines: ["Pulchowk, Lalitpur", "Bagmati Province, Nepal"] },
                                        { Icon: Clock3, title: "Clinic Hours", lines: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Emergency only"] },
                                        { Icon: Mail, title: "Email Us", lines: ["hexagonsservices@gmail.com", "We reply within 24 hours"] },
                                    ].map(({ Icon, title, lines }) => (_jsxs("div", { className: "rounded-2xl bg-white/90 border border-emerald-100 shadow-soft p-5 flex items-start gap-4", children: [_jsx("span", { className: "w-11 h-11 rounded-2xl bg-emerald-50 grid place-items-center text-emerald-600 shrink-0", children: _jsx(Icon, { size: 20 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-extrabold text-emerald-950", children: title }), lines.map((l) => _jsx("p", { className: "text-xs text-slate-500 mt-1", children: l }, l))] })] }, title))), _jsxs("div", { className: "rounded-2xl bg-white/90 border border-emerald-100 shadow-soft overflow-hidden", children: [_jsxs("div", { className: "relative h-40 bg-linear-to-br from-emerald-100 to-teal-100 grid place-items-center", children: [_jsx("div", { className: "soft-grid absolute inset-0 opacity-60" }), _jsx(Building2, { size: 42, className: "text-emerald-600/70 relative" }), _jsx("span", { className: "absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold text-emerald-800", children: "\uD83D\uDCCD Lalitpur, Nepal" })] }), _jsxs("a", { href: "https://maps.google.com/?q=Lalitpur+Nepal", target: "_blank", rel: "noreferrer", className: "flex items-center justify-between px-5 py-3.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition", children: ["Open in Google Maps ", _jsx(ArrowRight, { size: 16 })] })] })] })] })] })] }));
}
