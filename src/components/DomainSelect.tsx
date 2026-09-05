import React from 'react';
import Select from 'react-select';
import type { MultiValue, StylesConfig } from 'react-select';
import { TRAINING_DOMAINS } from '../data/trainingDomains';
import type { TrainingDomainOption } from '../types/trainer';
import { Layers } from 'lucide-react';

interface DomainSelectProps {
  value: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const DomainSelect: React.FC<DomainSelectProps> = ({
  value,
  onChange,
  error
}) => {
  // Map values back to react-select option objects
  const selectedOptions = TRAINING_DOMAINS.filter((opt) =>
    value.includes(opt.value)
  );

  const handleSelectChange = (
    newValue: MultiValue<TrainingDomainOption>
  ) => {
    onChange(newValue.map((item) => item.value));
  };

  // Custom styling to match corporate blue/slate theme
  const customStyles: StylesConfig<TrainingDomainOption, true> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#ffffff',
      borderColor: error ? '#f87171' : state.isFocused ? '#2563eb' : '#cbd5e1',
      boxShadow: state.isFocused
        ? error
          ? '0 0 0 3px rgba(248, 113, 113, 0.2)'
          : '0 0 0 3px rgba(37, 99, 235, 0.15)'
        : 'none',
      borderRadius: '0.75rem',
      padding: '2px 4px',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: error ? '#ef4444' : '#94a3b8'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#eff6ff',
      border: '1px solid #bfdbfe',
      borderRadius: '0.5rem',
      padding: '2px 6px'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1e40af',
      fontWeight: 500,
      fontSize: '0.8125rem'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#3b82f6',
      ':hover': {
        backgroundColor: '#dbeafe',
        color: '#1e3a8a'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      zIndex: 40,
      padding: '4px'
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      padding: '8px 12px',
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? '#2563eb'
        : state.isFocused
        ? '#f1f5f9'
        : 'transparent',
      color: state.isSelected ? '#ffffff' : '#1e293b',
      active: {
        backgroundColor: '#1d4ed8'
      }
    })
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          Topics / Domains Interested In <span className="text-rose-500">*</span>
        </label>
        <span className="text-xs text-slate-500 font-normal">
          {value.length} selected
        </span>
      </div>

      <div className="relative">
        <Select<TrainingDomainOption, true>
          isMulti
          options={TRAINING_DOMAINS}
          value={selectedOptions}
          onChange={handleSelectChange}
          placeholder="Search or select professional training domains..."
          styles={customStyles}
          closeMenuOnSelect={false}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-rose-500 font-medium flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      <p className="mt-1 text-[11px] text-slate-400">
        You can choose multiple domains across Web Dev, AI/Data, Cloud, Agile, Soft Skills, etc.
      </p>
    </div>
  );
};
