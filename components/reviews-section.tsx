"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: "review-1",
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Working with John was an absolute pleasure. He took our vague concept and transformed it into a stunning, functional website that perfectly represents our brand. His attention to detail and technical expertise are unmatched.",
    },
    {
      id: "review-2",
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Innovate Solutions",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "John delivered our e-commerce platform ahead of schedule and exceeded all our expectations. The site is not only beautiful but also performs exceptionally well. Our conversion rates have increased by 40% since launch!",
    },
    {
      id: "review-3",
      name: "Emily Rodriguez",
      position: "Product Manager",
      company: "Nexus Digital",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "I've worked with many developers over the years, but John stands out for his creativity, problem-solving skills, and communication. He's not just a coder but a true partner who understands business objectives.",
    },
    {
      id: "review-4",
      name: "David Wilson",
      position: "Founder",
      company: "Fitness Connect",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "John built our fitness tracking app from scratch and delivered a product that our users love. His technical skills combined with his eye for design created an intuitive, engaging experience that keeps our users coming back.",
    },
    {
      id: "review-5",
      name: "Sophia Lee",
      position: "Creative Director",
      company: "Artisan Studios",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "As a design agency, we have high standards for the developers we work with. John not only met but exceeded those standards. His ability to perfectly implement complex designs while adding thoughtful interactions impressed our entire team.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="section-container bg-[#121212]" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="section-heading text-center"
        >
          Client <span className="text-jordy_blue">Testimonials</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg"
        >
          Don't just take my word for it. Here's what clients and colleagues
          have to say about working with me.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#1a1a1a] rounded-3xl border border-gray-800"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-jordy_blue p-3 rounded-full">
              <Quote className="h-6 w-6 text-uranian_blue-100" />
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg italic mb-8">
                      {review.text}
                    </p>
                    <Avatar className="h-16 w-16 mb-4 border-2 border-jordy_blue-400">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-lg">{review.name}</h4>
                      <p className="text-gray-400">
                        {review.position}, {review.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-700 hover:bg-purple-500/10 hover:border-jordy_blue-500"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <div className="flex gap-2 items-center">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-8 bg-jordy_blue-400"
                      : "w-2.5 bg-gray-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-700 hover:bg-purple-500/10 hover:border-jordy_blue-400"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-gray-800 flex flex-col items-center text-center">
            <div className="bg-indigo_dye-500/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-jordy_blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">25+ Projects</h3>
            <p className="text-gray-400">
              Successfully completed for clients across various industries
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-gray-800 flex flex-col items-center text-center">
            <div className="bg-indigo_dye-500/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-jordy_blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">5+ Years</h3>
            <p className="text-gray-400">
              Of experience in web development and design
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-gray-800 flex flex-col items-center text-center">
            <div className="bg-indigo_dye-500/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-jordy_blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">100% Satisfaction</h3>
            <p className="text-gray-400">
              Client satisfaction rate with project deliverables
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
