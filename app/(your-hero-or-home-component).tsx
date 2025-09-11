// ...existing imports...
import { useState } from "react"

const sliderImages = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
  // ...add your image paths
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  // Simple auto-slide logic (replace with keen-slider/swiper for more features)
  // useEffect(() => {
  //   const interval = setInterval(() => setCurrent((c) => (c + 1) % sliderImages.length), 4000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <section className="w-full h-[500px] flex flex-col md:flex-row">
      {/* Left static part */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-blue-900 text-white relative z-10">
        {/* ...existing static content... */}
        <h2 className="text-green-400 text-sm font-semibold mb-2 tracking-widest">WELCOME TO SIDDHARTH INSTITUTE OF PHARMACY</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          We Provide High<br />Quality <span className="underline decoration-green-400">Education</span><br />For Everyone
        </h1>
        <p className="mb-8 text-lg">
          The college aims at shaping the bright future of students in a proper way, because a student is the central figure in the stream of education in the universe.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded transition">GET STARTED</button>
        {/* ...any other static elements... */}
      </div>
      {/* Right slider part */}
      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div className="w-full h-[220px] sm:h-[300px] md:h-[500px]">
          <img
            src={sliderImages[current]}
            alt="Slider"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
        {/* Optional: Add navigation arrows or dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${current === idx ? "bg-green-500" : "bg-white/50"}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
