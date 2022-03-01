import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

import { QUESTIONS_MAX_FILES_COUNT } from 'constants/dashboardAdditionalDocuments';

import InputField from 'views/shared/InputField';
import CheckboxField from 'views/shared/CheckboxField';

const Questions = ({ questions, onAdd, onRemove }) => (
  <>
    <h2 className="text-headline mb-8">
      <FormattedMessage id="dashboard.editCamper.questions.title" />
    </h2>
    <p className="mb-24">
      <FormattedMessage id="dashboard.editCamper.questions.description" />
    </p>
    <div>
      {questions.map((question, index) => (
        <div
          key={question.id || question.listId}
          className="custom-add-wrap custom-add-wrap--question"
        >
          <Field
            id={`questions[${index}].text`}
            name={`questions[${index}].text`}
            formItemClasses="w-100 mb-8"
            component={InputField}
            label={{
              id: 'dashboard.editCamper.questions.label',
            }}
          />
          <Field
            id={`questions[${index}].required`}
            name={`questions[${index}].required`}
            component={CheckboxField}
            label={{
              id: 'dashboard.editCamper.questions.required',
            }}
          />
          <div className="custom-acc-wrap__close">
            <Button
              type="secondary"
              icon={<i className="icon icon-cross" />}
              onClick={onRemove({ index, questionId: question.id })}
            />
          </div>
        </div>
      ))}
    </div>
    <Button
      type="secondary"
      onClick={onAdd}
      disabled={questions.length === QUESTIONS_MAX_FILES_COUNT}
    >
      <FormattedMessage id="dashboard.editCamper.questions.add.btn" />
    </Button>
  </>
);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Questions;
