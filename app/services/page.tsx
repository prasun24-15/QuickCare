"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Calendar, Brain, FileText, Bell, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import MentalHealthQuiz from "../components/mental-health-quiz"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
}

const ServiceCardPreview: React.FC<ServiceCardProps> = ({ title, description, icon, href }) => {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    }
  }

  return (
    <div 
      className="group transition-all duration-300 hover:z-10 cursor-pointer" 
      onClick={handleClick}
    >
      <div className="transform transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-2xl">
        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl h-full transition-all duration-300 hover:shadow-xl border-blue-200">
          <CardHeader>
            <div className="mb-4 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:transform">
              {icon}
            </div>
            <CardTitle className="text-xl font-semibold transition-colors duration-300 group-hover:text-blue-600">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 transition-opacity duration-300 group-hover:opacity-90">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const BackgroundElement: React.FC<{ icon: string }> = ({ icon }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      gsap.set(elementRef.current, {
        x: `random(0, ${window.innerWidth})`,
        y: `random(0, ${window.innerHeight})`,
        scale: "random(0.5, 1.5)",
        opacity: "random(0.1, 0.3)",
      })

      gsap.to(elementRef.current, {
        x: `random(0, ${window.innerWidth})`,
        y: `random(0, ${window.innerHeight})`,
        rotation: "random(-180, 180)",
        scale: "random(0.5, 1.5)",
        opacity: "random(0.1, 0.3)",
        duration: "random(20, 40)",
        repeat: -1,
        yoyo: true,
        ease: "none",
      })
    }
  }, [])

  return (
    <div ref={elementRef} className="absolute text-4xl pointer-events-none select-none">
      {icon}
    </div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }

    const tl = gsap.timeline({ repeat: -1 })
    tl.to(containerRef.current, {
      backgroundPosition: "100% 100%",
      duration: 20,
      ease: "none",
    })
  }, [])

  const services = [
    {
      title: "Appointment Booking",
      description: "Easily schedule appointments with your preferred doctors.",
      icon: <Calendar className="w-6 h-6" />,
      href: "/appointment",
    },
    {
      title: "AI-Powered Health Assistant",
      description: "Get instant answers to your health queries using our advanced AI.",
      icon: <Brain className="w-6 h-6" />,
      href: "/ai-help",
    },
    {
      title: "Book Labtest",
      description: "Book our various pathology services anytime, anywhere.",
      icon: <FileText className="w-6 h-6" />,
      href: "/consultation",
    },
    {
      title: "Lab Report Analyser",
      description: "Securely understand your lab report with authentic information anytime, anywhere.",
      icon: <FileText className="w-6 h-6" />,
      href: "/labreport",
    },
    {
      title: "Online Pharmacy",
      description: "Get your medicine delivered at your doorsteps instantly",
      icon: <Bell className="w-6 h-6" />,
      href: "/Onlinepharmacy",
    },
    {
      title: "Diet Planner",
      description: "Reach your dream body weight goal naturally.",
      icon: <Activity className="w-6 h-6" />,
      href: "/diet",
    },
  ]

  const medicalIcons = ["🩺", "💊", "🏥", "🧬", "🫀", "🧠", "🦠", "💉", "🩸", "🧪", "🩹", "🚑"]

  return (
    <div
      ref={containerRef}
      className="min-h-screen p-8 relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"
      style={{
        backgroundSize: "400% 400%",
      }}
    >
      {medicalIcons.map((icon, index) => (
        <BackgroundElement key={index} icon={icon} />
      ))}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 mb-12 shadow-xl border border-blue-200">
          <p className="text-xl text-gray-800 mb-6 leading-relaxed">
            We are dedicated to revolutionizing healthcare through innovative technology. Our mission is to make quality
            healthcare accessible to everyone, anytime, anywhere.
          </p>
        </div>
        <h2 ref={titleRef} className="text-4xl font-bold text-center mb-12 text-blue-800 drop-shadow-md">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCardPreview key={index} {...service} />
          ))}
        </div>
        <h1 className="text-3xl font-bold text-center mt-12">Mental Health Check-In</h1>
        <MentalHealthQuiz />
      </div>
    </div>
  )
}
