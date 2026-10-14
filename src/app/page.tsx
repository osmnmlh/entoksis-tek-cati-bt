"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import ServicePackages from "@/components/ServicePackages";
import PilotScope from "@/components/PilotScope";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { PackageId } from "@/lib/schema";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("tek-cati-hepsi");

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Header & Sticky Nav */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Value Proposition */}
        <Hero />

        {/* Problem Definition & Target Audience */}
        <ProblemStatement />

        {/* 4 Core Service Packages */}
        <ServicePackages onSelectPackage={(pkgId) => setSelectedPackage(pkgId)} />

        {/* Pilot Scope & Conditions */}
        <PilotScope />

        {/* The Audited Lead Form */}
        <LeadForm
          selectedPackage={selectedPackage}
          onPackageChange={(pkgId) => setSelectedPackage(pkgId)}
        />

        {/* FAQ Accordion */}
        <FAQ />
      </main>

      {/* Corporate & Evaluator Footer */}
      <Footer />
    </div>
  );
}
