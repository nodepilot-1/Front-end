import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, RefreshCcw } from 'lucide-react';

const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

export function ContactSection() {
    const [formStatus, setFormStatus] = useState("");
    const [captchaCode, setCaptchaCode] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    useEffect(() => {
        setCaptchaCode(generateCaptcha());
    }, []);

    const handleRefreshCaptcha = () => {
        setCaptchaCode(generateCaptcha());
        setCaptchaInput("");
        setCaptchaError("");
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (captchaInput !== captchaCode) {
            setCaptchaError("Incorrect CAPTCHA code. Please try again.");
            handleRefreshCaptcha();
            return;
        }

        setCaptchaError("");
        setFormStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
            const response = await fetch("https://formspree.io/f/xbdenjyk", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                setFormStatus("success");
                form.reset();
                setCaptchaInput("");
                setCaptchaCode(generateCaptcha());
            } else {
                setFormStatus("error");
            }
        } catch (error) {
            setFormStatus("error");
        }
    };

    const contactMethods = [
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email us",
            contact: "contact@node-pilot.com",
            href: "mailto:contact@node-pilot.com"
        },
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Call us",
            contact: "+1 (310) 784-5201",
            href: "tel:+13107845201"
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Visit us",
            contact: "1100 Glendon Ave, Los Angeles, CA 90024, USA",
            href: "https://maps.google.com/?q=1100+Glendon+Ave,+Los+Angeles,+CA+90024,+USA",
            target: "_blank",
            rel: "noopener noreferrer"
        },
    ];

    return (
        <section id="contact" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mx-auto gap-16 justify-between lg:flex lg:max-w-none">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }} 
                        viewport={{ once: true }}
                        className="max-w-lg flex flex-col"
                    >
                        <div className="space-y-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-secondary mb-2">
                                <MapPin className="w-4 h-4" />
                                Contact
                            </span>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
                                Let us know how we can help
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We're here to help and answer any question you might have. We look forward to hearing from you! Please fill out the form, or use the contact information below.
                            </p>
                        </div>
                        
                        <div className="pt-8 flex flex-col flex-1">
                            <ul className="flex flex-col gap-y-6">
                                {
                                    contactMethods.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-x-4">
                                            <div className="flex-none w-12 h-12 flex items-center justify-center rounded-xl bg-[#111111] border border-white/10 shadow-sm text-white">
                                                {item.icon}
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-[15px] font-bold text-white mb-0.5">{item.title}</h4>
                                                {item.href ? (
                                                    <a 
                                                        href={item.href} 
                                                        target={item.target} 
                                                        rel={item.rel}
                                                        className="text-muted-foreground text-sm font-medium hover:text-secondary transition-colors"
                                                    >
                                                        {item.contact}
                                                    </a>
                                                ) : (
                                                    <p className="text-muted-foreground text-sm font-medium hover:text-secondary transition-colors cursor-default">{item.contact}</p>
                                                )}
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            
                            <div className="mt-10 relative w-full flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,183,181,0.05)] group pb-12 lg:pb-0">
                                <a 
                                    href="https://maps.google.com/?q=San+Francisco,+California,+United+States" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-10 cursor-pointer"
                                    aria-label="Open in Google Maps"
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
                                        <div className="bg-[#05131a]/80 backdrop-blur-md border border-secondary/30 px-4 py-2 rounded-full text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
                                            <MapPin className="w-4 h-4 text-secondary" />
                                            Open in Google Maps
                                        </div>
                                    </div>
                                </a>
                                <iframe 
                                    src="https://maps.google.com/maps?q=San%20Francisco,%20California&t=m&z=13&output=embed&iwloc=near" 
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    aria-hidden="false" 
                                    tabIndex={-1}
                                    className="pointer-events-none"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} 
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }} 
                        viewport={{ once: true }}
                        className="flex-1 w-full mt-12 lg:max-w-xl lg:mt-8 glass-strong rounded-3xl p-6 sm:p-8 h-fit"
                    >
                        <form
                            onSubmit={handleFormSubmit}
                            className="space-y-6"
                        >
                            <input type="hidden" name="form" value="Contact Us" />
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary/60 bg-transparent text-foreground placeholder:text-muted-foreground/50"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary/60 bg-transparent text-foreground placeholder:text-muted-foreground/50"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                                    Briefly describe your edge AI initiative...
                                </label>
                                <textarea 
                                    name="message"
                                    required 
                                    placeholder="Tell us about your needs..."
                                    className="w-full h-28 glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary/60 resize-none bg-transparent text-foreground placeholder:text-muted-foreground/50"
                                ></textarea>
                            </div>
                            
                            <div>
                                <label className="text-sm font-semibold text-muted-foreground mb-4 block">I'm looking for...</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                                    {[
                                        "Edge Node Deployment",
                                        "AI Model Orchestration",
                                        "Low-latency Inference",
                                        "Global CDN Integration",
                                        "Enterprise Security",
                                        "Custom Hardware Setup",
                                        "Distributed Database",
                                        "Other"
                                    ].map((option, i) => (
                                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center w-5 h-5 border border-white/20 rounded-full glass group-hover:border-secondary/50 transition-colors">
                                                <input type="checkbox" name="interest" value={option} className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-secondary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                            </div>
                                            <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* CAPTCHA Section */}
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                                <label className="text-xs font-semibold text-muted-foreground block">
                                    Security Check
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1 bg-black/40 rounded-xl overflow-hidden h-12 flex items-center justify-center select-none border border-white/10">
                                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                                        <span className="font-mono text-xl tracking-[0.3em] font-bold text-white opacity-90 mix-blend-screen transform -skew-x-12">{captchaCode}</span>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={handleRefreshCaptcha}
                                        className="p-3 glass rounded-xl text-muted-foreground hover:text-white transition-colors"
                                        aria-label="Refresh CAPTCHA"
                                    >
                                        <RefreshCcw className="w-5 h-5" />
                                    </button>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={captchaInput}
                                        onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(""); }}
                                        className="w-full glass rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/60 bg-transparent text-foreground placeholder:text-muted-foreground/50 font-mono tracking-wider"
                                        placeholder="Type the 6-character code"
                                    />
                                    {captchaError && (
                                        <p className="text-red-400 text-xs mt-2">{captchaError}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={captchaInput !== captchaCode || formStatus === "submitting" || formStatus === "success"}
                                className={`w-full mt-2 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 shadow-lg transition-all ${
                                    captchaInput === captchaCode 
                                    ? "btn-gradient btn-gradient-hover hover:shadow-[0_0_15px_rgba(0,183,181,0.3)] text-white" 
                                    : "bg-black/40 text-muted-foreground/50 border border-white/5 cursor-not-allowed"
                                }`}
                            >
                                {formStatus === "submitting" ? "Sending..." : formStatus === "success" ? "Message Sent!" : "Send Message"}
                            </button>
                            
                            {formStatus === "error" && (
                                <p className="text-red-400 text-sm text-center mt-2">Oops! There was a problem submitting your form.</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
