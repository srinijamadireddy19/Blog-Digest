import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Output() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialOption = location?.state?.selectedOption || 'summary';
  const processedId = location?.state?.processedId;
  
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [currentOutput, setCurrentOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update selectedOption if navigation state changes
  useEffect(() => {
    const navOption = location?.state?.selectedOption;
    if (navOption && navOption !== selectedOption) {
      setSelectedOption(navOption);
    }
  }, [location?.state?.selectedOption, selectedOption]);

  // Fetch data from backend
  useEffect(() => {
    const fetchBackendOutput = async () => {
      // Check if processedId exists
      if (!processedId) {
        console.warn('No processedId found in location state');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/result/${processedId}`);
        const data = await response.json();
        
        if (response.ok && data.status === 'success') {
          setCurrentOutput(data);
          console.log('Successfully loaded results:', data);
        } else {
          console.error('Error from backend:', data.message);
          setCurrentOutput(null);
        }
      } catch (error) {
        console.error("Error fetching backend output:", error);
        setCurrentOutput(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackendOutput();
  }, [processedId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-300 text-xl">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!currentOutput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 flex items-center justify-center p-4">
        <div className="text-center bg-emerald-900/30 backdrop-blur-lg rounded-2xl border-2 border-rose-400/30 p-8 max-w-md">
          <svg className="w-16 h-16 text-rose-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-rose-400 text-xl font-semibold mb-2">No results found</p>
          <p className="text-emerald-300 mb-6">Please try processing your content again.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-emerald-500 text-emerald-950 font-semibold rounded-lg hover:bg-emerald-400 transition-all"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">BlogDigest</h1>
          <p className="text-emerald-300">Your Results Are Ready</p>
        </div>

        {/* Option Selector */}
        <div className="bg-emerald-900/30 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/30 p-4 mb-6 animate-slide-up">
          <div className="flex flex-wrap gap-2">
            {['summary', 'pdf', 'keywords', 'topics', 'sentiment', 'translation'].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedOption === option
                    ? 'bg-emerald-500 text-emerald-950'
                    : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Output Display */}
        <div className="bg-emerald-900/30 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/30 p-8 animate-slide-up-delay">
          {/* Summary */}
          {selectedOption === 'summary' && currentOutput.summary && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.summary.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.summary.title}</h2>
              </div>
              <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                <p className="text-emerald-100 text-lg leading-relaxed mb-4">{currentOutput.summary.content}</p>
                {currentOutput.summary.key_points && (
                  <div className="mt-6">
                    <h3 className="text-emerald-300 font-semibold mb-3">Key Points:</h3>
                    <ul className="space-y-2">
                      {currentOutput.summary.key_points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-emerald-100">
                          <span className="text-emerald-400 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PDF */}
          {selectedOption === 'pdf' && currentOutput.pdf && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.pdf.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.pdf.title}</h2>
              </div>
              <div className="bg-emerald-950/50 rounded-xl p-8 border border-emerald-400/20 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-emerald-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-emerald-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0116 6V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-emerald-300 mb-2">{currentOutput.pdf.fileName}</h3>
                <p className="text-emerald-400 mb-4">{currentOutput.pdf.fileSize}</p>
                <p className="text-emerald-100 mb-6">{currentOutput.pdf.content}</p>
                <button className="px-6 py-3 bg-emerald-500 text-emerald-950 font-semibold rounded-lg hover:bg-emerald-400 transition-all">
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {/* Keywords */}
          {selectedOption === 'keywords' && currentOutput.keywords && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.keywords.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.keywords.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOutput.keywords.keywords.map((kw, i) => (
                  <div key={i} className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-400/20 hover:border-emerald-400/40 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-emerald-100 font-semibold">{kw.word}</span>
                      <span className="text-emerald-400 text-sm font-medium">{kw.relevance}%</span>
                    </div>
                    <div className="w-full bg-emerald-900/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500" style={{ width: `${kw.relevance}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {selectedOption === 'topics' && currentOutput.topics && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.topics.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.topics.title}</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                  <p className="text-emerald-300 mb-2">Primary Topic:</p>
                  <h3 className="text-2xl font-bold text-emerald-100 mb-1">{currentOutput.topics.primary_topic}</h3>
                  <p className="text-emerald-400">Confidence: {currentOutput.topics.confidence}%</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentOutput.topics.categories.map((cat, i) => (
                    <div key={i} className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-400/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-emerald-100 font-semibold">{cat.name}</span>
                        <span className="text-emerald-400 text-sm font-medium">{cat.score}%</span>
                      </div>
                      <div className="w-full bg-emerald-900/50 rounded-full h-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-500" style={{ width: `${cat.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sentiment */}
          {selectedOption === 'sentiment' && currentOutput.sentiment && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.sentiment.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.sentiment.title}</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                  <div className="text-center mb-4">
                    <p className="text-emerald-300 mb-2">Overall Sentiment</p>
                    <h3 className="text-3xl font-bold text-emerald-100">{currentOutput.sentiment.overall_sentiment}</h3>
                    <p className="text-emerald-400 mt-2">Score: {currentOutput.sentiment.sentiment_score}% | Confidence: {currentOutput.sentiment.confidence}%</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <p className="text-emerald-300 text-sm mb-1">Positive</p>
                      <p className="text-2xl font-bold text-green-400">{currentOutput.sentiment.sentiment_breakdown.positive}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emerald-300 text-sm mb-1">Neutral</p>
                      <p className="text-2xl font-bold text-blue-400">{currentOutput.sentiment.sentiment_breakdown.neutral}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emerald-300 text-sm mb-1">Negative</p>
                      <p className="text-2xl font-bold text-rose-400">{currentOutput.sentiment.sentiment_breakdown.negative}%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-emerald-300 font-semibold mb-3">Emotion Analysis:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentOutput.sentiment.emotions.map((emotion, i) => (
                      <div key={i} className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-400/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-emerald-100 font-medium">{emotion.name}</span>
                          <span className="text-emerald-400 text-sm">{emotion.value}%</span>
                        </div>
                        <div className="w-full bg-emerald-900/50 rounded-full h-2">
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" style={{ width: `${emotion.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Translation */}
          {selectedOption === 'translation' && currentOutput.translation && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.translation.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.translation.title}</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-400/20">
                  <p className="text-emerald-300">Original Language: <span className="text-emerald-100 font-semibold">{currentOutput.translation.original_language}</span></p>
                </div>
                {currentOutput.translation.translations.map((trans, i) => (
                  <div key={i} className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-semibold text-emerald-300">{trans.language}</h4>
                        <p className="text-emerald-500 text-sm">Code: {trans.code}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                        {trans.confidence}% confident
                      </span>
                    </div>
                    <p className="text-emerald-100 leading-relaxed">{trans.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center animate-fade-in-delay">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-emerald-800/50 text-emerald-300 font-semibold rounded-lg hover:bg-emerald-800/70 transition-all border border-emerald-400/20"
          >
            ← Process Another
          </button>
          <button className="px-6 py-3 bg-emerald-500 text-emerald-950 font-semibold rounded-lg hover:bg-emerald-400 transition-all">
            Save Results
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.3s backwards; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-up-delay { animation: slide-up 0.6s ease-out 0.2s backwards; }
      `}</style>
    </div>
  );
}