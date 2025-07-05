import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { MOOD_CONFIG } from "../config/mood";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const MoodCarousel = ({ onMoodSelect, selectedMood }) => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with neutral mood

  const moods = [
    {
      rating: 1,
      emoji: MOOD_CONFIG.emojis[1],
      label: MOOD_CONFIG.labels[1],
      color: MOOD_CONFIG.colors[1],
      description: MOOD_CONFIG.descriptions[1],
    },
    {
      rating: 2,
      emoji: MOOD_CONFIG.emojis[2],
      label: MOOD_CONFIG.labels[2],
      color: MOOD_CONFIG.colors[2],
      description: MOOD_CONFIG.descriptions[2],
    },
    {
      rating: 3,
      emoji: MOOD_CONFIG.emojis[3],
      label: MOOD_CONFIG.labels[3],
      color: MOOD_CONFIG.colors[3],
      description: MOOD_CONFIG.descriptions[3],
    },
    {
      rating: 4,
      emoji: MOOD_CONFIG.emojis[4],
      label: MOOD_CONFIG.labels[4],
      color: MOOD_CONFIG.colors[4],
      description: MOOD_CONFIG.descriptions[4],
    },
    {
      rating: 5,
      emoji: MOOD_CONFIG.emojis[5],
      label: MOOD_CONFIG.labels[5],
      color: MOOD_CONFIG.colors[5],
      description: MOOD_CONFIG.descriptions[5],
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    onMoodSelect(moods[swiper.activeIndex]);
  };

  const handleMoodClick = (mood, index) => {
    setActiveIndex(index);
    onMoodSelect(mood);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="heading-md mb-2">How are you feeling?</h2>
        <p className="text-brown-600 font-light">
          Swipe or click to select your current mood
        </p>
      </div>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        initialSlide={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        onSlideChange={handleSlideChange}
        className="mood-carousel"
      >
        {moods.map((mood, index) => (
          <SwiperSlide key={mood.rating} className="mood-slide">
            <div
              onClick={() => handleMoodClick(mood, index)}
              className={`mood-card ${
                activeIndex === index ? "active" : ""
              } ${selectedMood?.rating === mood.rating ? "selected" : ""}`}
            >
              <div className={`mood-gradient bg-gradient-to-br ${mood.color}`}>
                <div className="mood-emoji">{mood.emoji}</div>
              </div>
              <div className="mood-info">
                <h3 className="mood-label">{mood.label}</h3>
                <p className="mood-description">{mood.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Current mood display */}
      {activeIndex !== null && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 border border-brown-200">
            <span className="text-2xl">{moods[activeIndex].emoji}</span>
            <div className="text-left">
              <p className="font-medium text-brown-800">
                {moods[activeIndex].label}
              </p>
              <p className="text-sm text-brown-600">
                {moods[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodCarousel;
