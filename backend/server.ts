import cors from "@fastify/cors";
import fastify from "fastify";
import { db } from "./db-client";

const server = fastify();

server.register(cors, {});

const PORT = +(process.env.BACKEND_SERVER_PORT ?? 3001);

server.get("/", async (_request, _reply) => {
	return "hello world\n";
});

server.get("/users", (_request, reply) => {
	const data = db.prepare("SELECT * FROM users").all();

	return data;
});

server.get("/quizzes", (_request, reply) => {
	const data = db.prepare("SELECT * FROM assignments").all();

	return data;
});

server.get("/quizzes/:id", (request, reply) => {
	try {
		const query = `
		SELECT a.title, a.id, a.created_at, q.question_content, q.choices
		FROM assignments a
		INNER JOIN assignment_questions q ON a.id = q.assignment_id
		WHERE a.id = :id;
	`;
		const data = db.prepare(query);
		console.log(data.all(request.params));
		return data.all(request.params);
	}
	catch (error) {
		console.error("Error fetching quiz:", error);
	}
});

server.listen({ port: PORT }, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at http://localhost:${PORT}`);
});
