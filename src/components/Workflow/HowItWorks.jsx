import React from "react";
import { Link } from "react-router";

export default function HowItWorks() {
  const steps = [
    {
      title: "Citizens Submit Report",
      desc: "Citizens submit issue details along with photos and location.",
    },
    {
      title: "Admin Reviews & Assigns",
      desc: "Admin verifies and assigns the issue to the appropriate staff.",
    },
    {
      title: "Staff Verifies & Updates",
      desc: "Staff visit the location, verify the issue and update progress.",
    },
    {
      title: "Live Status Tracking",
      desc: "System tracks the status from Pending → In-Progress → Resolved → Closed.",
    },
    {
      title: "Priority for Premium Users",
      desc: "Premium citizens get faster review & priority support.",
    },
  ];

  return (
    <section className=" px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        How The System Works
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow rounded-xl border border-[#ddd] hover:shadow-lg transition"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-full text-lg font-bold mb-4">
              {index + 1}
            </div>

            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link className="px-5 py-3 button ">
          Report an Issue
        </Link>
      </div>
    </section>
  );
}
