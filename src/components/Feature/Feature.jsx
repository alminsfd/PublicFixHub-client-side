import React from 'react';
import { FaTools, FaMapMarkedAlt, FaClock, FaListAlt, FaFlag, FaChartBar } from "react-icons/fa"
import FeatureCard from './FeatureCard';
import { MdTimeline } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
const Feature = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold">Our Key Features</h2>
        <p className="text-gray-600 mt-2">
          We make public issue reporting faster, smarter and more efficient.
        </p>
      </div>
      <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >

        <SwiperSlide>
          <FeatureCard
            icon={<FaMapMarkedAlt />}
            title="Easy Location Reporting"
            description="Users can pin exact issue locations directly on the map."
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon={<FaTools />}
            title="Fast Resolution"
            description="Admin quickly assigns issues to the right department."
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon={<FaClock />}
            title="Real-time Tracking"
            description="Track every public issue until it gets solved."
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon={<MdTimeline />}
            title="Reduce response time"
            description="After submission issue our promise solve  every public issue quickly"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon={<FaListAlt />}
            title="Smart Issue Categorization"
            description="Issues are organized into predefined categories for efficient management."
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon={<FaFlag />}
            title="Priority-based Issue Handling"
            description="Critical issues receive higher priority to ensure quicker resolution."
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon={<FaChartBar />}
            title="Analytics & Reports Dashboard"
            description="Admins can analyze trends, hotspots, and department efficiency through detailed reports."
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Feature;