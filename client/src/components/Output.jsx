import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Output() {
  const location = useLocation();
  const initialOption = location?.state?.selectedOption || 'summary';
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // update selectedOption if navigation state changes (e.g. user clicks an action that targets a specific tab)
  useEffect(() => {
    const navOption = location?.state?.selectedOption;
    if (navOption && navOption !== selectedOption) {
      setSelectedOption(navOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state?.selectedOption]);

  // Mock data for different outputs
  const outputData = {
    summary: {
      title: "Summary",
      content: "This comprehensive blog post explores the evolution of artificial intelligence in modern web development. The author discusses how AI-powered tools are revolutionizing the way developers build applications, from automated code generation to intelligent debugging. Key points include the integration of machine learning models, the rise of low-code platforms, and the importance of maintaining human creativity in an AI-assisted workflow. The article concludes with predictions about future trends and the potential impact on the software development industry.",
      icon: "✨"
    },
    pdf: {
      title: "PDF Export",
      content: "Your document has been successfully converted to PDF format. The file includes the complete blog content with proper formatting, headers, and styling preserved.",
      fileName: "blog-summary-2024.pdf",
      fileSize: "2.4 MB",
      icon: "📄"
    },
    keywords: {
      title: "Keyword Extraction",
      keywords: [
        { word: "Artificial Intelligence", relevance: 95 },
        { word: "Web Development", relevance: 88 },
        { word: "Machine Learning", relevance: 82 },
        { word: "Automation", relevance: 76 },
        { word: "Code Generation", relevance: 71 },
        { word: "Low-code Platforms", relevance: 68 },
        { word: "Future Trends", relevance: 65 },
        { word: "Developer Tools", relevance: 60 }
      ],
      icon: "🔤"
    },
    topics: {
      title: "Topic Classification",
      topics: [
        { name: "Technology", confidence: 92, color: "from-blue-500 to-blue-600" },
        { name: "Software Development", confidence: 88, color: "from-purple-500 to-purple-600" },
        { name: "Artificial Intelligence", confidence: 85, color: "from-pink-500 to-pink-600" },
        { name: "Innovation", confidence: 72, color: "from-orange-500 to-orange-600" }
      ],
      icon: "🏷️"
    },
    sentiment: {
      title: "Sentiment Analysis",
      overall: "Positive",
      score: 78,
      breakdown: {
        positive: 65,
        neutral: 25,
        negative: 10
      },
      insights: "The content maintains an optimistic and forward-thinking tone. The author expresses enthusiasm about technological advancement while acknowledging potential challenges. Overall sentiment leans strongly positive with constructive observations.",
      icon: "😊"
    },
    translation: {
      title: "Multi-lingual Translation",
      originalLang: "English",
      targetLang: "Spanish",
      content: "Esta publicación de blog integral explora la evolución de la inteligencia artificial en el desarrollo web moderno. El autor analiza cómo las herramientas impulsadas por IA están revolucionando la forma en que los desarrolladores crean aplicaciones, desde la generación automatizada de código hasta la depuración inteligente.",
      icon: "🌍"
    }
  };

  const currentOutput = outputData[selectedOption];

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
            <button
              onClick={() => setSelectedOption('summary')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedOption === 'summary'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              ✨ Summary
            </button>
            <button
              onClick={() => setSelectedOption('pdf')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedOption === 'pdf'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium"> PDF Version</span>
            </button>
            <button
              onClick={() => setSelectedOption('keywords')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedOption === 'keywords'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Keyword Extraction</span>
            </button>
            <button
              onClick={() => setSelectedOption('topics')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedOption === 'topics'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Topic Classification</span>
            </button>
            <button
              onClick={() => setSelectedOption('sentiment')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedOption === 'sentiment'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
               <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Sentiment Analysis</span>
            </button>
            <button
              onClick={() => setSelectedOption('translation')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedOption === 'translation'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Multi-lingual Translation</span>
            </button>
          </div>
        </div>

        {/* Output Display */}
        <div className="bg-emerald-900/30 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/30 p-8 animate-slide-up-delay">
          {/* Summary Output */}
          {selectedOption === 'summary' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.title}</h2>
              </div>
              <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                <p className="text-emerald-100 text-lg leading-relaxed">{currentOutput.content}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-6 py-3 bg-emerald-500 text-emerald-950 font-semibold rounded-lg hover:bg-emerald-400 transition-all">
                  Copy to Clipboard
                </button>
                <button className="px-6 py-3 bg-emerald-800/50 text-emerald-300 font-semibold rounded-lg hover:bg-emerald-800/70 transition-all">
                  Share
                </button>
              </div>
            </div>
          )}

          {/* PDF Output */}
          {selectedOption === 'pdf' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.title}</h2>
              </div>
              <div className="bg-emerald-950/50 rounded-xl p-8 border border-emerald-400/20 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-emerald-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-emerald-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-emerald-300 mb-2">{currentOutput.fileName}</h3>
                <p className="text-emerald-400 mb-4">{currentOutput.fileSize}</p>
                <p className="text-emerald-100 mb-6">{currentOutput.content}</p>
                <button className="px-8 py-3 bg-emerald-500 text-emerald-950 font-bold rounded-lg hover:bg-emerald-400 transition-all transform hover:scale-105">
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {/* Keywords Output */}
          {selectedOption === 'keywords' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOutput.keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-400/20 hover:border-emerald-400/40 transition-all"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-emerald-100 font-semibold">{keyword.word}</span>
                      <span className="text-emerald-400 text-sm font-medium">{keyword.relevance}%</span>
                    </div>
                    <div className="w-full bg-emerald-900/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${keyword.relevance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics Output */}
          {selectedOption === 'topics' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.title}</h2>
              </div>
              <div className="space-y-4">
                {currentOutput.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-emerald-100">{topic.name}</h3>
                      <span className="px-3 py-1 bg-emerald-500 text-emerald-950 rounded-full text-sm font-bold">
                        {topic.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-emerald-900/50 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${topic.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${topic.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sentiment Output */}
          {selectedOption === 'sentiment' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.title}</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-emerald-100">Overall Sentiment</h3>
                    <span className="px-6 py-2 bg-emerald-500 text-emerald-950 rounded-full text-xl font-bold">
                      {currentOutput.overall}
                    </span>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold text-emerald-400">{currentOutput.score}%</div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-emerald-300">Positive</span>
                        <span className="text-emerald-400 font-semibold">{currentOutput.breakdown.positive}%</span>
                      </div>
                      <div className="w-full bg-emerald-900/50 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${currentOutput.breakdown.positive}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-emerald-300">Neutral</span>
                        <span className="text-emerald-400 font-semibold">{currentOutput.breakdown.neutral}%</span>
                      </div>
                      <div className="w-full bg-emerald-900/50 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${currentOutput.breakdown.neutral}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-emerald-300">Negative</span>
                        <span className="text-emerald-400 font-semibold">{currentOutput.breakdown.negative}%</span>
                      </div>
                      <div className="w-full bg-emerald-900/50 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${currentOutput.breakdown.negative}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                  <h4 className="text-lg font-semibold text-emerald-300 mb-3">Insights</h4>
                  <p className="text-emerald-100 leading-relaxed">{currentOutput.insights}</p>
                </div>
              </div>
            </div>
          )}

          {/* Translation Output */}
          {selectedOption === 'translation' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentOutput.icon}</span>
                <h2 className="text-3xl font-bold text-emerald-400">{currentOutput.title}</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-2 bg-emerald-800/50 text-emerald-300 rounded-lg font-medium">
                    {currentOutput.originalLang}
                  </span>
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="px-4 py-2 bg-emerald-500 text-emerald-950 rounded-lg font-medium">
                    {currentOutput.targetLang}
                  </span>
                </div>
                <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-400/20">
                  <p className="text-emerald-100 text-lg leading-relaxed">{currentOutput.content}</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-emerald-500 text-emerald-950 font-semibold rounded-lg hover:bg-emerald-400 transition-all">
                    Copy Translation
                  </button>
                  <button className="px-6 py-3 bg-emerald-800/50 text-emerald-300 font-semibold rounded-lg hover:bg-emerald-800/70 transition-all">
                    Change Language
                  </button>
                </div>
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

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s backwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.2s backwards;
        }
      `}</style>
    </div>
  );
}