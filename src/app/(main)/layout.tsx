"use client";
import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer";
import {BackgroundSystem} from "@/app/components/BackgroundSystem";
import {CookieConsent} from "@/app/components/CookieConsent";
import {ReactNode} from "react";

export default function MainLayout({children,}: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex min-h-screen flex-col relative">
            <BackgroundSystem />
            <Header/>
            <main className="flex-1 pt-20"> {children} </main>
            <Footer/>
            <CookieConsent />
        </div>
    );
}