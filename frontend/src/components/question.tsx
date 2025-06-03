import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
export interface QuestionProps {
  id: number;
  title: string;
  question_content: string;
  choices: string;
  children?: React.ReactNode;
}

function QuestionItem({ question }: { question: QuestionProps }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <p className="text-lg font-semibold">{question.question_content}</p>
      <p className="text-sm text-muted-foreground">
        <RadioGroup>
          {question.choices.split(';;').map((choice, index) => (
            <Label
              key={`label-${choice}`}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={choice} id={`choice-${index}`} />
              <span>{choice}</span>
            </Label>
          ))}
        </RadioGroup>
      </p>
    </div>
  );
}

export default QuestionItem;
