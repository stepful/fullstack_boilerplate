import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

function QuestionItem({ question }: { question: Question }) {
	const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
	const [openEndedAnswer, setOpenEndedAnswer] = useState<string>("");

	const choices = question.choices
		? question.choices.split(";;").map((choice) => choice.trim())
		: null;
	return (
		<TableRow>
			<TableCell>{question.id}</TableCell>
			<TableCell>{question.title}</TableCell>
			<TableCell>
				{choices ? (
					<ul className="list-disc list-inside space-y-1">
						{choices.map((choice, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<label key={index} className="flex items-center space-x-2">
								<input
									type="radio"
									name={`question-${question.id}`}
									value={choice}
									checked={selectedChoice === choice}
									onChange={() => setSelectedChoice(choice)}
								/>
								<span>{choice}</span>
							</label>
						))}
					</ul>
				) : (
					<div className="flex flex-col space-y-2">
						<em>Open-ended</em>
						<textarea
							value={openEndedAnswer}
							onChange={(e) => setOpenEndedAnswer(e.target.value)}
							placeholder="Type your answer here..."
							className="w-full p-2 border border-gray-300 rounded-md"
							rows={3}
						/>
					</div>
				)}
			</TableCell>
		</TableRow>
	);
}

export function QuizStepper({ questions }: { questions: Question[] }) {
	// Unique key based on quiz ID to persist progress per quiz
	const quizKey = `quiz-progress-${questions[0]?.id}`;

	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [submitted, setSubmitted] = useState(false);
	const [hasHydrated, setHasHydrated] = useState(false);
	const currentQuestion = questions[currentIndex];
	const isLastQuestion = currentIndex === questions.length - 1;
	const isFirstQuestion = currentIndex === 0;

	// Load from localStorage once on mount
	useEffect(() => {
		const saved = localStorage.getItem(quizKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				setCurrentIndex(parsed.currentIndex ?? 0);
				setAnswers(parsed.answers ?? {});
				setSubmitted(parsed.submitted ?? false);
				setHasHydrated(true);
			} catch (err) {
				console.error("Error parsing saved quiz progress", err);
			}
		}
	}, [quizKey]);

	// Save to localStorage on state change *after* initial load
	useEffect(() => {
		if (!hasHydrated) return; //  skip initial render

		const data = {
			currentIndex,
			answers,
			submitted,
		};
		localStorage.setItem(quizKey, JSON.stringify(data));
	}, [currentIndex, answers, submitted, quizKey, hasHydrated]);

	const handleChoiceChange = (value: string) => {
		setAnswers((prev) => ({
			...prev,
			[currentQuestion.id]: value,
		}));
	};

	const handleSubmit = () => {
		setSubmitted(true);
	};

	const renderChoices = () => {
		const choices = currentQuestion.choices
			? currentQuestion.choices.split(";;").map((c) => c.trim())
			: [];

		const selected = answers[currentQuestion.id];

		return (
			<div className="flex flex-col space-y-2">
				{choices.map((choice, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<label key={index} className="flex items-center space-x-2">
						<input
							type="radio"
							name={`question-${currentQuestion.id}`}
							value={choice}
							checked={selected === choice}
							onChange={() => handleChoiceChange(choice)}
							disabled={submitted}
						/>
						<span>{choice}</span>
					</label>
				))}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			<div className="border p-4 rounded-md">
				<p className="font-semibold mb-2">
					Question {currentIndex + 1} of {questions.length}
				</p>
				<p className="mb-4">{currentQuestion.title}</p>
				{renderChoices()}
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					onClick={() => setCurrentIndex((i) => i - 1)}
					disabled={isFirstQuestion}
					className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
				>
					← Back
				</button>
				{!submitted && isLastQuestion ? (
					<button
						type="button"
						onClick={handleSubmit}
						className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
					>
						Submit
					</button>
				) : (
					<button
						type="button"
						onClick={() => setCurrentIndex((i) => i + 1)}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Next →
					</button>
				)}
			</div>
		</div>
	);
}

export type Question = {
	id: number;
	title: string;
	choices: string;
	answer: string;
	points: number;
};

export function QuizQuestionsList({ questions }: { questions: Question[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Question</TableHead>
					<TableHead>Answer</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{questions.map((question) => (
					<QuestionItem key={question.id} question={question} />
				))}
			</TableBody>
		</Table>
	);
}
