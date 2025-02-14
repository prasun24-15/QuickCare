"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import ResultsDisplay from "./result-display"

const questions = [
  {
    question: "How often do you feel overwhelmed by your daily tasks?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
  },
  {
    question: "How would you rate your overall mood in the past week?",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    question: "How well have you been sleeping lately?",
    options: ["Very well", "Fairly well", "Not so well", "Poorly"],
  },
  {
    question: "How often do you engage in activities you enjoy?",
    options: ["Daily", "A few times a week", "Rarely", "Almost never"],
  },
  {
    question: "How would you describe your stress levels?",
    options: ["Low", "Moderate", "High", "Very high"],
  },
]

export default function MentalHealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    const scoreMap: { [key: string]: number } = {
      Rarely: 3,
      Sometimes: 2,
      Often: 1,
      "Almost always": 0,
      Excellent: 3,
      Good: 2,
      Fair: 1,
      Poor: 0,
      "Very well": 3,
      "Fairly well": 2,
      "Not so well": 1,
      Poorly: 0,
      Daily: 3,
      "A few times a week": 2,
      Rarely: 1,
      "Almost never": 0,
      Low: 3,
      Moderate: 2,
      High: 1,
      "Very high": 0,
    }

    return answers.reduce((total, answer) => total + (scoreMap[answer] || 0), 0)
  }

  if (showResults) {
    return <ResultsDisplay score={calculateScore()} />
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <CardDescription>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]}>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!answers[currentQuestion]} className="w-full">
          {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  )
}

