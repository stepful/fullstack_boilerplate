import { type Params, path as pathFactory } from "static-path";

const SERVER_HOST = import.meta.env.VITE_BACKEND_SERVER || "localhost:3001";
export const SERVER_ORIGIN = `http://${SERVER_HOST}`;

const apiUrlFactory = <T extends string>(pattern: T) => {
	const builder = pathFactory(pattern);
	return (params: Params<T>) => SERVER_ORIGIN + builder(params);
};

// api urls
export const quizApiUrl = apiUrlFactory("/quizzes/:id");
export const quizQuestionApiUrl = apiUrlFactory("/quizzes/:id/questions");
export const quizzesApiUrl = apiUrlFactory("/quizzes");
export const scoresApiUrl = apiUrlFactory("/scores/:assignment_id/:user_id");
export const allScoresApiUrl = apiUrlFactory("/scores");
export const scoresBaseUrl = () => `${SERVER_ORIGIN}/scores`;

// local routes
export const rootPath = pathFactory("/");
export const quizPath = pathFactory("/quizzes/:id");
export const quizQuestionPath = pathFactory("/quizzes/:id/questions");
export const quizzesPath = pathFactory("/quizzes");
