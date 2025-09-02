import React, { useState } from 'react';
import { X } from 'lucide-react';

const ThemaEvaluatieModal = ({ 
  isOpen, 
  onClose, 
  themeTitle, 
  onScoreSubmit, 
  loading = false, 
  error = null 
}) => {
  const [selectedScore, setSelectedScore] = useState(null);

  if (!isOpen) return null;

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
  };

  const handleSubmit = () => {
    if (selectedScore) {
      onScoreSubmit(selectedScore);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">
            Bekijk jouw score en resultaten op dit thema
          </h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thema titel */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">
              Beoordeel <span className="font-semibold text-[var(--kleur-primary)]">{themeTitle}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Sloten de vragen goed aan bij jouw situatie?
            </p>
          </div>

          {/* Score selectie */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 text-center">
              Score 1 t/m 10:
            </p>
            
            {/* Score knoppen - responsive grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  onClick={() => handleScoreSelect(score)}
                  disabled={loading}
                  className={`
                    w-full aspect-square rounded-lg border-2 transition-all duration-200
                    ${selectedScore === score
                      ? 'bg-[var(--kleur-primary)] text-white border-[var(--kleur-primary)]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--kleur-primary)] hover:bg-[var(--kleur-primary)] hover:bg-opacity-10'
                    }
                    ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    text-sm font-medium
                  `}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Error melding */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit knop */}
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={!selectedScore || loading}
              className={`
                w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${selectedScore && !loading
                  ? 'bg-[var(--kleur-primary)] text-white hover:bg-[var(--kleur-primary)] hover:bg-opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Bezig met opslaan...
                </div>
              ) : (
                'Bekijk resultaten'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemaEvaluatieModal;
