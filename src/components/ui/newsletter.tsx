"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);

    useEffect(() => {
        const savedEmails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
        if (savedEmails.length > 0) {
            setEmail(savedEmails[savedEmails.length - 1]);
            setAlreadySubscribed(true);
            setSubscribed(true);
        }
    }, []);

    const imageUrls = [
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=1780&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop',
    ];

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            const savedEmails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
            if (savedEmails.includes(email.toLowerCase())) {
                setAlreadySubscribed(true);
                setSubscribed(true);
                return;
            }
            
            try {
                await fetch("https://formspree.io/f/xbdenjyk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email, form: "Newsletter Subscription" })
                });
            } catch (err) {
                console.error("Formspree error:", err);
            }

            localStorage.setItem('subscribedEmails', JSON.stringify([...savedEmails, email.toLowerCase()]));
            setAlreadySubscribed(false);
            setSubscribed(true);
        }
    };

    return (
        <div className="w-full max-w-2xl relative">
            <div className="glass h-full rounded-2xl p-5 overflow-hidden relative border border-white/5 shadow-[0_0_20px_rgba(0,183,181,0.03)]">
                <AnimatePresence mode="wait">
                    {!subscribed ? (
                        <motion.form
                            onSubmit={handleSubscribe}
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full items-center justify-center text-center"
                        >
                            <div className="flex justify-center items-center mb-3">
                                {imageUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full border-2 border-[#05131a] object-cover"
                                        style={{ 
                                            marginLeft: index === 0 ? 0 : '-12px',
                                            zIndex: 5 - index 
                                        }}
                                    />
                                ))}
                            </div>
                            
                            <h3 className="text-xl font-bold font-heading text-foreground mb-1">Subscribe to our newsletter</h3>
                            <p className="text-xs text-muted-foreground mb-4">
                                Never miss an update. Get the latest news, articles, and exclusive offers straight to your inbox!
                            </p>
                            
                            <div className="w-full relative flex items-center mb-1">
                                <Mail className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full bg-black/40 border border-white/10 focus:border-secondary/50 outline-none rounded-xl py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <button type="submit" className="w-full mt-2 py-2 rounded-xl btn-gradient btn-gradient-hover font-semibold text-sm transition-all shadow-lg hover:shadow-[0_0_15px_rgba(0,183,181,0.3)]">
                                Subscribe
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="thank-you"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full items-center justify-center text-center py-4"
                        >
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-secondary shadow-[0_0_15px_rgba(0,183,181,0.2)]">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                                {alreadySubscribed ? 'Already Subscribed!' : 'Email Sent!'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {alreadySubscribed 
                                    ? <><span className="text-white font-medium">{email}</span> is already on our newsletter list. You'll continue to receive updates!</>
                                    : <>We've sent a confirmation email to <span className="text-white font-medium">{email}</span>. Check your inbox for more details.</>}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
