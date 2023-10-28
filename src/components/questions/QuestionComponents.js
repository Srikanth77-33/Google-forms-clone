import React from 'react';
import MultipleOptionInput from './MultipleOptionInput';
import TextInput from './TextInput';
import DateTimeInput from './DateTimeInput';

const QuestionComponents = ({ formData: {id, inputs} }) => {
  return inputs.map((input, ind) => <QuestionComp key={ind} input={input} ind={ind} formId={id}/>)
}

const QuestionComp = ({input, ind, formId}) => {
    if (
      input.type === "multiple-choice" ||
      input.type === "dropdown" ||
      input.type === "checkboxes"
    ) {
      return (
        <MultipleOptionInput
          key={ind}
          input={input}
          inputIndex={ind}
          formId={formId}
        />
      );
    } else if (input.type === "short-answer" || input.type === "paragraph") {
      return <TextInput key={ind} input={input} inputIndex={ind} formId={formId} />;
    } else if (input.type === "date" || input.type === "time") {
      return (
        <DateTimeInput key={ind} input={input} inputIndex={ind} formId={formId} />
      );
    }
  };

export default QuestionComponents;