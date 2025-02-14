"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Calendar, Brain, FileText, Bell, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import gsap from "gsap"

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
    <div className="group transition-all duration-300 hover:z-10 cursor-pointer" onClick={handleClick}>
      <div className="transform transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-2xl">
        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl h-full transition-all duration-300 hover:shadow-xl border-blue-200">
          <CardHeader>
            <div className="mb-4 text-blue-600 transition-transform duration-300 group-hover:scale-110">
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

export default function About() {
  const services = [
    { title: "Appointment Booking", description: "Schedule appointments easily.", icon: <Calendar className="w-6 h-6" />, href: "/appointment" },
    { title: "AI-Powered Health Assistant", description: "Instant health advice using AI.", icon: <Brain className="w-6 h-6" />, href: "/ai-help" },
    { title: "Book Lab Test", description: "Pathology services at your fingertips.", icon: <FileText className="w-6 h-6" />, href: "/consultation" },
    { title: "Lab Report Analyser", description: "Understand your lab reports easily.", icon: <FileText className="w-6 h-6" />, href: "/labreport" },
    { title: "Online Pharmacy", description: "Get medicines delivered instantly.", icon: <Bell className="w-6 h-6" />, href: "/Onlinepharmacy" },
    { title: "Diet Planner", description: "Achieve your health goals naturally.", icon: <Activity className="w-6 h-6" />, href: "/diet" },
    { title: "Mental Health Check-In", description: "Take a quick self-assessment quiz.", icon: <Brain className="w-6 h-6" />, href: "/mentalhealth-quiz.tsx" },
  ]

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800 drop-shadow-md">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCardPreview key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  )
}
