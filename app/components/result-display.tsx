import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ResultsDisplayProps {
  score: number
}

export default function ResultsDisplay({ score }: ResultsDisplayProps) {
  const maxScore = 15 // 5 questions * 3 points max per question
  const percentage = (score / maxScore) * 100

  const getMessage = () => {
    if (percentage >= 80) {
      return "Great job! Your mental health seems to be in a good place. Keep up the positive habits!"
    } else if (percentage >= 60) {
      return "You're doing well, but there might be room for improvement. Consider incorporating more self-care activities."
    } else if (percentage >= 40) {
      return "It seems you might be facing some challenges. Consider reaching out to friends, family, or a professional for support."
    } else {
      return "Your responses indicate you might be struggling. It's important to seek help from a mental health professional."
    }
  }

  const getColor = () => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    if (percentage >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Mental Health Check-In Results</CardTitle>
        <CardDescription>Based on your responses, here's an overview of your mental well-being:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Mental Well-being Score</span>
              <span className="text-sm font-medium">
                {score} / {maxScore}
              </span>
            </div>
            <Progress value={percentage} className={`h-2 ${getColor()}`} />
          </div>
          <p className="text-lg">{getMessage()}</p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Resources for Mental Health Support:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>National Suicide Prevention Lifeline: 1-800-273-8255</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>
                Find a Therapist:{" "}
                <a
                  href="https://www.psychologytoday.com/us/therapists"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Psychology Today Therapist Directory
                </a>
              </li>
              <li>
                Mental Health America:{" "}
                <a
                  href="https://www.mhanational.org/finding-help"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resources and Tools
                </a>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

