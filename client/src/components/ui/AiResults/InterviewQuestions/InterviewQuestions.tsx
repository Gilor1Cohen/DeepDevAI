import type {
  InterviewQuestion,
  InterviewQuestionSet,
} from "../../../../types/tools.types";
import { exportQuestionsToPDF } from "../../../helpers/exportQuestionsToPDF";
import "./InterviewQuestions.css";

export default function InterviewQuestions({
  data,
}: {
  data: InterviewQuestionSet;
}) {
  return (
    <article id="InterviewQuestions">
      <p
        id="DownloadQuestions"
        onClick={() => {
          exportQuestionsToPDF(data);
        }}
      >
        Download Questions
      </p>

      {data.questions.map((q: InterviewQuestion, index: number) => (
        <section key={`${q.question}-${index}`} className="question-card">
          <h3 className="question-text">{q.question}</h3>

          <span
            className={`difficulty-label level-${q.difficulty.toLowerCase()}`}
          >
            {q.difficulty}
          </span>

          <p className="answer-text">{q.answer}</p>
        </section>
      ))}
    </article>
  );
}
