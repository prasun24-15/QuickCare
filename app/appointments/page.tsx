"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, DollarSign, Activity, MessageCircle } from "lucide-react";

const demoAppointments = [
  {
    id: "1",
    doctor: {
      _id: "d1",
      name: "Dr. Sarah Wilson",
      speciality: "Cardiologist",
      fees: 1500,
      availability: "Mon-Fri",
      rating: 4.8,
      image: "doctor1.jpg"
    },
    userId: "u1",
    date: "2025-02-15",
    time: "10:00 AM",
    status: "upcoming"
  },
  {
    id: "2",
    doctor: {
      _id: "d2",
      name: "Dr. Michael Chen",
      speciality: "Neurologist",
      fees: 2000,
      availability: "Tue-Sat",
      rating: 4.9,
      image: "doctor2.jpg"
    },
    userId: "u1",
    date: "2025-02-20",
    time: "2:30 PM",
    status: "upcoming"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-500";
    case "completed":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function AppointmentsPage() {
  const handleChatWithDoctor = () => {
    window.open('https://1095.3cx.cloud/prasunsingh', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          My Appointments
        </h1>
        
        <div className="space-y-6">
          <div className="grid gap-6">
            {demoAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white shadow-lg border-0">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-blue-700">
                      {appointment.doctor.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-600">
                      <Activity className="w-4 h-4" />
                      {appointment.doctor.speciality}
                    </CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">Date:</span>
                      <span className="text-gray-900">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">Time:</span>
                      <span className="text-gray-900">{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-gray-700">Fees:</span>
                      <span className="text-gray-900">₹{appointment.doctor.fees}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-700">Rating:</span>
                      <span className="text-gray-900">{appointment.doctor.rating}/5</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={handleChatWithDoctor}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat with Doctor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => window.location.href = '/appointment'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Book New Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
