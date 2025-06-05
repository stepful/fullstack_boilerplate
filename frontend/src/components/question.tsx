import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { quizQuestionPath } from "@/paths";
import { Link } from "react-router-dom";

function QuestionItem({ question }: { question: Question }) {
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
							<li key={index}>{choice}</li>
						))}
					</ul>
				) : (
					<em>Open-ended</em>
				)}
			</TableCell>
		</TableRow>
	);
}

export type Question = {
	id: number;
	title: string;
	choices: string | null;
};

export function QuizQuestionsList({ questions }: { questions: Question[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Actions</TableHead>
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
