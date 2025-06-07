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

export type Question = {
	id: number;
	title: string;
	choices: string | null;
	answer: string | null;
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
