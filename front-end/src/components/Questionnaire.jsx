import React, { useState } from 'react';

function Questionnaire({ onComplete }) {
  const [answers, setAnswers] = useState({
    mental_health: '',
    suicidal_thoughts: '',
    therapy: '',
    substance_abuse: '',
    self_harm: '',
    support_system: '',
    stress_anxiety: '',
    employment: '',
    healthcare_access: '',
    mental_health_management: ''
  });

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEligible = evaluateAnswers(answers);
    onComplete(isEligible);
  };

  const evaluateAnswers = (answers) => {
    if (
      answers.mental_health === 'no' &&
      answers.suicidal_thoughts === 'no' &&
      answers.therapy === 'no' &&
      answers.substance_abuse === 'no' &&
      answers.self_harm === 'no' &&
      answers.support_system === 'yes' &&
      answers.stress_anxiety === 'no' &&
      answers.employment === 'yes' &&
      answers.healthcare_access === 'yes' &&
      answers.mental_health_management === 'yes'
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="container">
      <h2>Mental State Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <p>Have you been diagnosed with any mental health conditions?</p>
          <div className="option">
            <input
              type="radio"
              name="mental_health"
              value="yes"
              checked={answers.mental_health === 'yes'}
              onChange={handleChange}
              id="mental_health_yes"
            />
            <label htmlFor="mental_health_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="mental_health"
              value="no"
              checked={answers.mental_health === 'no'}
              onChange={handleChange}
              id="mental_health_no"
            />
            <label htmlFor="mental_health_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Have you experienced suicidal thoughts or tendencies in the past?</p>
          <div className="option">
            <input
              type="radio"
              name="suicidal_thoughts"
              value="yes"
              checked={answers.suicidal_thoughts === 'yes'}
              onChange={handleChange}
              id="suicidal_thoughts_yes"
            />
            <label htmlFor="suicidal_thoughts_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="suicidal_thoughts"
              value="no"
              checked={answers.suicidal_thoughts === 'no'}
              onChange={handleChange}
              id="suicidal_thoughts_no"
            />
            <label htmlFor="suicidal_thoughts_no">No</label>
          </div>
        </div>
        {/* Repeat similarly for other questions */}
        <div className="question">
          <p>Are you currently undergoing any therapy or counseling sessions?</p>
          <div className="option">
            <input
              type="radio"
              name="therapy"
              value="yes"
              checked={answers.therapy === 'yes'}
              onChange={handleChange}
              id="therapy_yes"
            />
            <label htmlFor="therapy_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="therapy"
              value="no"
              checked={answers.therapy === 'no'}
              onChange={handleChange}
              id="therapy_no"
            />
            <label htmlFor="therapy_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Do you have a history of drug or alcohol abuse?</p>
          <div className="option">
            <input
              type="radio"
              name="substance_abuse"
              value="yes"
              checked={answers.substance_abuse === 'yes'}
              onChange={handleChange}
              id="substance_abuse_yes"
            />
            <label htmlFor="substance_abuse_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="substance_abuse"
              value="no"
              checked={answers.substance_abuse === 'no'}
              onChange={handleChange}
              id="substance_abuse_no"
            />
            <label htmlFor="substance_abuse_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Have you ever attempted self-harm or suicide?</p>
          <div className="option">
            <input
              type="radio"
              name="self_harm"
              value="yes"
              checked={answers.self_harm === 'yes'}
              onChange={handleChange}
              id="self_harm_yes"
            />
            <label htmlFor="self_harm_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="self_harm"
              value="no"
              checked={answers.self_harm === 'no'}
              onChange={handleChange}
              id="self_harm_no"
            />
            <label htmlFor="self_harm_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Do you currently have a strong support system or network of friends and family?</p>
          <div className="option">
            <input
              type="radio"
              name="support_system"
              value="yes"
              checked={answers.support_system === 'yes'}
              onChange={handleChange}
              id="support_system_yes"
            />
            <label htmlFor="support_system_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="support_system"
              value="no"
              checked={answers.support_system === 'no'}
              onChange={handleChange}
              id="support_system_no"
            />
            <label htmlFor="support_system_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Are you currently experiencing significant stress or anxiety in your life?</p>
          <div className="option">
            <input
              type="radio"
              name="stress_anxiety"
              value="yes"
              checked={answers.stress_anxiety === 'yes'}
              onChange={handleChange}
              id="stress_anxiety_yes"
            />
            <label htmlFor="stress_anxiety_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="stress_anxiety"
              value="no"
              checked={answers.stress_anxiety === 'no'}
              onChange={handleChange}
              id="stress_anxiety_no"
            />
            <label htmlFor="stress_anxiety_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Are you currently employed or engaged in meaningful activities?</p>
          <div className="option">
            <input
              type="radio"
              name="employment"
              value="yes"
              checked={answers.employment === 'yes'}
              onChange={handleChange}
              id="employment_yes"
            />
            <label htmlFor="employment_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="employment"
              value="no"
              checked={answers.employment === 'no'}
              onChange={handleChange}
              id="employment_no"
            />
            <label htmlFor="employment_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Do you have access to adequate healthcare resources and support?</p>
          <div className="option">
            <input
              type="radio"
              name="healthcare_access"
              value="yes"
              checked={answers.healthcare_access === 'yes'}
              onChange={handleChange}
              id="healthcare_access_yes"
            />
            <label htmlFor="healthcare_access_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="healthcare_access"
              value="no"
              checked={answers.healthcare_access === 'no'}
              onChange={handleChange}
              id="healthcare_access_no"
            />
            <label htmlFor="healthcare_access_no">No</label>
          </div>
        </div>
        <div className="question">
          <p>Are you currently managing your mental health effectively?</p>
          <div className="option">
            <input
              type="radio"
              name="mental_health_management"
              value="yes"
              checked={answers.mental_health_management === 'yes'}
              onChange={handleChange}
              id="mental_health_management_yes"
            />
            <label htmlFor="mental_health_management_yes">Yes</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name="mental_health_management"
              value="no"
              checked={answers.mental_health_management === 'no'}
              onChange={handleChange}
              id="mental_health_management_no"
            />
            <label htmlFor="mental_health_management_no">No</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Questionnaire;
