import React, { useState } from 'react';
import Modal from './Modal';
import Icon from './Icon';
import { useLeadForm } from '../context/LeadFormContext';
import { WHATSAPP_CONFIG, LEAD_FORM_STEPS, buildLeadMessage, maskPhone, isValidPhone } from '../constants/contact';
import { sendLeadToSheets } from '../constants/leadCapture';

const emptyAnswers = LEAD_FORM_STEPS.reduce((acc, step) => ({ ...acc, [step.key]: '' }), {});

const LeadFormModal = () => {
  const { isOpen, closeLeadForm } = useLeadForm();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(emptyAnswers);

  const step = LEAD_FORM_STEPS[stepIndex];
  const isLastStep = stepIndex === LEAD_FORM_STEPS.length - 1;
  const currentValue = answers[step.key];
  const isInputStep = step.type === 'text' || step.type === 'tel';
  const canAdvance = step.type === 'tel' ? isValidPhone(currentValue) : currentValue.trim() !== '';

  const reset = () => {
    setStepIndex(0);
    setAnswers(emptyAnswers);
  };

  const handleClose = () => {
    closeLeadForm();
    reset();
  };

  const goToWhatsApp = (finalAnswers) => {
    sendLeadToSheets(finalAnswers);
    const url = WHATSAPP_CONFIG.link(buildLeadMessage(finalAnswers));
    window.open(url, '_blank', 'noopener,noreferrer');
    closeLeadForm();
    reset();
  };

  const handleChoice = (option) => {
    const nextAnswers = { ...answers, [step.key]: option };
    setAnswers(nextAnswers);
    if (isLastStep) {
      goToWhatsApp(nextAnswers);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleTextChange = (e) => {
    const value = step.type === 'tel' ? maskPhone(e.target.value) : e.target.value;
    setAnswers({ ...answers, [step.key]: value });
  };

  const handleNext = () => {
    if (!canAdvance) return;
    if (isLastStep) {
      goToWhatsApp(answers);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} contentClassName="max-w-lg">
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-2 mb-8">
          {LEAD_FORM_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= stepIndex ? 'bg-brand-accent' : 'bg-brand-medium/40'}`}
            />
          ))}
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">
          Passo {stepIndex + 1} de {LEAD_FORM_STEPS.length}
        </p>
        <h3 className={`text-2xl md:text-3xl font-serif font-bold text-brand-dark leading-snug ${step.hint ? 'mb-3' : 'mb-8'}`}>
          {step.question}
        </h3>
        {step.hint && (
          <p className="text-sm text-brand-muted mb-8 leading-relaxed">{step.hint}</p>
        )}

        {step.type === 'choice' && (
          <div className="flex flex-col gap-3">
            {step.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChoice(option)}
                className="w-full text-left px-6 py-4 rounded-xl border-2 border-brand-medium/50 text-brand-dark font-bold hover:border-brand-accent hover:bg-brand-light transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {isInputStep && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <input
              type={step.type === 'tel' ? 'tel' : 'text'}
              inputMode={step.type === 'tel' ? 'numeric' : undefined}
              autoComplete={step.type === 'tel' ? 'tel-national' : undefined}
              maxLength={step.type === 'tel' ? 15 : undefined}
              autoFocus
              value={currentValue}
              onChange={handleTextChange}
              placeholder={step.placeholder}
              className="w-full px-6 py-4 rounded-xl border-2 border-brand-medium/50 text-brand-dark font-bold focus:outline-none focus:border-brand-accent transition-colors"
            />
            <div className="flex items-center gap-3 mt-6">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full font-bold text-brand-muted hover:text-brand-dark transition-colors"
                >
                  Voltar
                </button>
              )}
              <button
                type="submit"
                disabled={!canAdvance}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-brand-accent text-brand-dark hover:bg-brand-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLastStep ? 'Falar com a Dra.' : 'Continuar'}
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </form>
        )}

        {step.type === 'choice' && stepIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 px-2 py-1 font-bold text-brand-muted hover:text-brand-dark transition-colors text-sm"
          >
            ← Voltar
          </button>
        )}
      </div>
    </Modal>
  );
};

export default LeadFormModal;
