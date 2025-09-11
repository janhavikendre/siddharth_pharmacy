"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
	{
		id: 1,
		image: "/image2.png?height=600&width=1200",
		title: "Shaping the Future of Fashion Design",
		description: "Discover your creative potential with our industry-leading programs",
		cta: "Explore Programs",
		link: "/academics/programs",
	},
	{
		id: 2,
		image: "/image2.png?height=600&width=1200",
		title: "Learn from Industry Experts",
		description: "Our faculty brings years of professional experience to the classroom",
		cta: "Meet Our Faculty",
		link: "/academics/faculty",
	},
	{
		id: 3,
		image: "/image2.png?height=600&width=1200",
		title: "State-of-the-Art Facilities",
		description: "Access to modern design studios and cutting-edge technology",
		cta: "View Facilities",
		link: "/facilities",
	},
]

export default function HeroBanner() {
	const [currentSlide, setCurrentSlide] = useState(0)

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
	}

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
	}

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide()
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<section className="w-full flex flex-col md:flex-row h-auto">
			{/* Left static part with background image and overlay */}
			<div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[300px] md:min-h-[500px]">
				{/* Background image */}
				<Image
					src="/image2.png?height=600&width=1200"
					alt="Background"
					fill
					className="object-cover z-0"
					priority
				/>
				{/* Overlay */}
				<div className="absolute inset-0 bg-blue-900/90 z-10" />
				{/* Centered content */}
				<div className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-8 py-8 md:py-12 text-white">
					<div className="mb-2">
						{/* <span className="block text-xs sm:text-sm md:text-base text-blue-400 font-semibold tracking-widest">
              Inspiring Creativity, Empowering Futures
            </span> */}
					</div>
					<h2 className="text-green-400 text-xs sm:text-sm md:text-base font-semibold mb-4 md:mb-6 tracking-widest">
						WELCOME TO SIDDHARTH INSTITUTE OF PHARMACY
					</h2>
					<h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-extrabold mb-6 md:mb-10 leading-[1.1] md:leading-[1.08] tracking-tight">
						We Provide High
						<br />
						Quality{" "}
						<span className="underline decoration-green-400 decoration-[6px] underline-offset-[10px]">
							Education
						</span>
						<br />
						For Everyone
					</h1>
					<p className="mb-8 md:mb-12 text-base sm:text-lg md:text-2xl max-w-2xl text-white/90">
						The college aims at shaping the bright future of students in a proper
						wave, because a student is the central figure in the stream of
						education in the universe.
					</p>
					<Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded transition w-fit text-sm sm:text-base">
						GET STARTED
					</Button>
				</div>
			</div>
			{/* Right slider part */}
			<div className="w-full md:w-1/2 flex items-stretch relative overflow-hidden">
				<div className="relative w-full h-[220px] sm:h-[300px] md:h-[500px] flex-1">
					<Image
						src={slides[currentSlide].image}
						alt={slides[currentSlide].title}
						fill
						className="object-cover transition-all duration-700"
						priority
					/>
					<div className="absolute inset-0 bg-black/40" />
					<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-2 sm:p-4">
						<h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 max-w-2xl">
							{slides[currentSlide].title}
						</h1>
						<p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-8 max-w-xl">
							{slides[currentSlide].description}
						</p>
						<Button
							asChild
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-base"
						>
							<Link href={slides[currentSlide].link}>
								{slides[currentSlide].cta}
							</Link>
						</Button>
					</div>
					{/* Navigation arrows */}
					<button
						onClick={prevSlide}
						className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full"
						aria-label="Previous slide"
					>
						<ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full"
						aria-label="Next slide"
					>
						<ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
					</button>
					{/* Dots */}
					<div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
									index === currentSlide ? "bg-white" : "bg-white/50"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
