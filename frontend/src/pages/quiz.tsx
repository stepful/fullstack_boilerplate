import type { QuestionProps } from '@/components/question';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ErrorComponent } from '@/components/error';
import { quizApiUrl, rootPath } from '@/paths';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuestionItem from '@/components/question';

export function QuizPage() {
  const { id } = useParams();
  if (!id) throw new Error('Quiz id param is required');

  const [quiz, setQuiz] = useState<QuestionProps[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const handleStart = () => {
    setProgress(1);
    setCurrentQuestion(1);
  };
  const handleNextQuestion = () => {
    setProgress((prev) => prev + 1);
    setCurrentQuestion((prev) => prev + 1);
  };

  useEffect(() => {
    fetch(quizApiUrl({ id }))
      .then((res) => res.json())
      .then(setQuiz)
      .catch(setError);
  }, [id]);

  if (error !== null) return <ErrorComponent error={error} />;

  if (!quiz) return <div className="text-center p-8">Loading...</div>;

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader className="pb-8">
        <CardTitle>Quiz name: {quiz[0].title}</CardTitle>
        <CardDescription>
          This quiz is {quiz.length} questions long.
        </CardDescription>
      </CardHeader>
      {currentQuestion === 0 ? (
        <CardContent>
          <Button onClick={handleStart}>Start</Button>
        </CardContent>
      ) : (
        <>
          {currentQuestion < quiz.length - 1 ? (
            <>
              <CardContent>
                <QuestionItem question={quiz[currentQuestion - 1]} />
              </CardContent>
              <CardContent>
                <Button onClick={handleNextQuestion}>Next</Button>
              </CardContent>
            </>
          ) : (
            <>
              <CardContent>
                Ready to submit? Click the button below.
              </CardContent>
              <CardContent>
                <Button onClick={() => alert('Sucess!')}>Submit</Button>
              </CardContent>
            </>
          )}
          {/* <Button onClick={handleNextQuestion}>Next</Button>} */}
        </>
      )}
      <CardFooter className="flex justify-between pt-8">
        <Link
          to={rootPath.pattern}
          className="text-muted-foreground hover:text-blue-600"
        >
          Back to home page
        </Link>
        <div className="text-muted-foreground">
          {/* <p>Created at: {(quiz.created_at as Date).toLocaleString()}</p> */}
          <p>Updated at: {new Date().toLocaleString()}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
