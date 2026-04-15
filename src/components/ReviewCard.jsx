import React from 'react';
import Icon from './Icon';

function ReviewCard({ name, time, text }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-medium/40 flex flex-col h-full relative hover:shadow-md transition-shadow review-card">
      <div className="absolute top-6 right-6 opacity-10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 21L16.411 14.976C15.006 14.694 14 13.438 14 11.954C14 10.271 15.352 8.909 17.023 8.909C18.693 8.909 20.046 10.271 20.046 11.954C20.046 14.593 18.064 19.349 15.698 21H14.017ZM3.971 21L6.365 14.976C4.96 14.694 3.954 13.438 3.954 11.954C3.954 10.271 5.306 8.909 6.977 8.909C8.647 8.909 10 10.271 10 11.954C10 14.593 8.018 19.349 5.652 21H3.971Z" />
        </svg>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-brand-medium flex items-center justify-center text-brand-dark font-bold text-xl">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-serif font-bold text-brand-dark text-lg">{name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex text-yellow-400">
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
            </div>
            <span className="text-sm text-slate-500">{time}</span>
          </div>
        </div>
      </div>
      <p className="text-slate-600 text-base leading-relaxed flex-grow italic">"{text}"</p>
    </div>
  );
}

export default ReviewCard;