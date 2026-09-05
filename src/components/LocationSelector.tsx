import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { INDIA_STATES_DISTRICTS, INDIAN_STATES } from '../data/indiaLocations';

interface LocationSelectorProps {
  title: string;
  type: 'permanent' | 'current' | 'preferred';
  selectedState: string;
  selectedDistrict: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  stateError?: string;
  districtError?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  title,
  type,
  selectedState,
  selectedDistrict,
  onStateChange,
  onDistrictChange,
  stateError,
  districtError
}) => {
  const districts = selectedState ? INDIA_STATES_DISTRICTS[selectedState] || [] : [];

  const getIcon = () => {
    switch (type) {
      case 'permanent':
        return <MapPin className="w-4 h-4 text-emerald-500" />;
      case 'current':
        return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'preferred':
        return <Compass className="w-4 h-4 text-purple-500" />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case 'permanent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'current':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'preferred':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h4 className="font-semibold text-slate-800 text-sm">{title} <span className="text-xs font-normal text-slate-400">(Optional)</span></h4>
        </div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getBadgeColor()}`}>
          Optional
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* State Select */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              onStateChange(e.target.value);
              onDistrictChange(''); // Reset district when state changes
            }}
            className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 transition-all ${
              stateError
                ? 'border-rose-400 focus:ring-rose-200 text-rose-900'
                : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800'
            }`}
          >
            <option value="">-- Select State (Optional) --</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {stateError && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{stateError}</p>
          )}
        </div>

        {/* District Select */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            District
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={!selectedState}
            className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 transition-all ${
              !selectedState
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                : districtError
                ? 'border-rose-400 focus:ring-rose-200 text-rose-900'
                : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800'
            }`}
          >
            <option value="">
              {selectedState ? '-- Select District (Optional) --' : 'Select State First'}
            </option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {districtError && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{districtError}</p>
          )}
        </div>
      </div>
    </div>
  );
};
