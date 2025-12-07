import React from 'react';
import Banner from '../../assets/Banner.png';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Fast & Easy Issue Reporting",
      desc: "Submit issues in seconds with photos, location, and quick details — no hassle.",
    },
    {
      title: "Real-Time Tracking with Map",
      desc: "Track the exact status and location of your issue directly on an interactive map.",
    },
    {
      title: "Priority Support for Premium Users",
      desc: "Premium citizens get faster response and dedicated handling of their issues.",
    },
    {
      title: "Transparent Progress Updates",
      desc: "Stay informed at every step — from verification to resolution and closing.",
    },
    {
      title: "Photo & Location Based Verification",
      desc: "Staff can verify issues more accurately using uploaded photos and GPS location.",
    },
    {
      title: "Secure & Modern System",
      desc: "A safe, reliable, and scalable platform built with modern security standards.",
    },
  ];
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto   flex flex-col md:flex-row justify-around items-center gap-5">

        {/* LEFT SECTION */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900">Why choose us</h2>
          <p className="mt-3 text-gray-600 max-w-xl">
            Our system is designed to make public issue reporting simple, fast,
            and completely transparent. Citizens get full control and visibility
            throughout the process.
          </p>
          <button className="button px-5 py-2 ">
            Start reporting
          </button>
        </div>

        {/* GRID SECTION */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md  relative overflow-hidden  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer "
            >
              {/* Background brush style */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <img
                  src={Banner}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-semibold text-lg text-blue-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;


