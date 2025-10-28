import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogDigestInput() {
  const [activeTab, setActiveTab] = useState('link');
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showInputRequired, setShowInputRequired] = useState(false);

  const navigate = useNavigate();

  const sendDataToBackend = async (selectedOption = 'summary') => {
      const formData = new FormData();

      if (activeTab === 'picture' && selectedFile) {
        formData.append('file', selectedFile);
      } else {
        formData.append('inputValue', inputValue);
        formData.append('type', activeTab); // 'link' or 'text'
      }

      formData.append('action', selectedOption); // e.g., summary, pdf, keywords

      try {
        const response = await fetch('http://localhost:5000/process', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log('Backend response:', result);
        // Optionally navigate after successful response
        navigate('/summary', { state: result });
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  /*const navigateToOutput = (tab = 'summary') => {
    // Require at least one input type before navigating
    const hasInput = Boolean(
      (activeTab === 'picture' && selectedFile) ||
      (activeTab !== 'picture' && inputValue && inputValue.trim())
    );

    if (!hasInput) {
      setShowInputRequired(true);
      return;
    }

    // clear any previous error and navigate
    setShowInputRequired(false);
    if (activeTab === 'picture' && selectedFile) {
      navigate('/summary', { state: { source: 'picture', fileName: selectedFile.name, selectedOption: tab } });
    } else {
      navigate('/summary', { state: { source: activeTab, input: inputValue, selectedOption: tab } });
    }
  };*/

  const handleSubmit = () => {
  // Require at least one input type
  const hasInput = Boolean(
    (activeTab === 'picture' && selectedFile) ||
    (activeTab !== 'picture' && inputValue && inputValue.trim())
  );

  if (!hasInput) {
    setShowInputRequired(true);
    return;
  }

  setShowInputRequired(false);

  sendDataToBackend('summary'); // Send form data to Flask
};

const navigateToOutput = (tab = 'summary') => {
  const hasInput = Boolean(
    (activeTab === 'picture' && selectedFile) ||
    (activeTab !== 'picture' && inputValue && inputValue.trim())
  );

  if (!hasInput) {
    setShowInputRequired(true);
    return;
  }

  setShowInputRequired(false);
  sendDataToBackend(tab);
};


  // clear the error when user starts typing or selects a file
  useEffect(() => {
    if (showInputRequired) {
      const hasInputNow = Boolean(
        (activeTab === 'picture' && selectedFile) ||
        (activeTab !== 'picture' && inputValue && inputValue.trim())
      );
      if (hasInputNow) setShowInputRequired(false);
    }
  }, [inputValue, selectedFile, activeTab, showInputRequired]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-4xl">
        {/* Logo and Title */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-emerald-400 mb-2">BlogDigest</h1>
          <p className="text-emerald-300">Choose your input method and get started</p>
        </div>

        {/* Card Container */}
        <div className="bg-emerald-900/30 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/30 p-8 shadow-2xl animate-slide-up">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('link')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'link'
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/50'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Link
              </div>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'text'
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/50'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Text
              </div>
            </button>

            <button
              onClick={() => setActiveTab('picture')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'picture'
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/50'
                  : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-800/70'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Picture
              </div>
            </button>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            {activeTab === 'link' && (
              <div className="animate-fade-in">
                <label className="block text-emerald-300 mb-3 text-lg font-medium">
                  Enter Blog URL
                </label>
                <input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="https://example.com/blog-post"
                  className="w-full px-6 py-4 bg-emerald-950/50 border-2 border-emerald-400/30 rounded-xl text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-lg"
                />
              </div>
            )}

            {activeTab === 'text' && (
              <div className="animate-fade-in">
                <label className="block text-emerald-300 mb-3 text-lg font-medium">
                  Paste Your Text
                </label>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Paste the blog content here..."
                  rows="12"
                  className="w-full px-6 py-4 bg-emerald-950/50 border-2 border-emerald-400/30 rounded-xl text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-lg resize-none"
                />
              </div>
            )}

            {activeTab === 'picture' && (
              <div className="animate-fade-in">
                <label className="block text-emerald-300 mb-3 text-lg font-medium">
                  Upload Image
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-emerald-400 bg-emerald-400/10'
                      : 'border-emerald-400/30 bg-emerald-950/50'
                  }`}
                >
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-emerald-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-emerald-300 font-medium text-lg">{selectedFile.name}</p>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-emerald-400 hover:text-emerald-300 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <svg className="w-16 h-16 mx-auto text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div>
                        <p className="text-emerald-300 mb-2 text-lg">Drag and drop your image here</p>
                        <p className="text-emerald-500 mb-4">or</p>
                        <label className="inline-block px-6 py-3 bg-emerald-500 text-emerald-950 rounded-lg font-semibold cursor-pointer hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105">
                          Browse Files
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons Section */}
          <div className="space-y-4">
            {/* Primary Action - Generate Summary */}
            <button
              onClick={handleSubmit}
              className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-emerald-950 font-bold text-xl rounded-xl hover:from-emerald-400 hover:to-emerald-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              ✨ Generate Summary
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-emerald-400/20"></div>
              <span className="text-emerald-400 text-sm font-medium">Additional Options</span>
              <div className="flex-1 h-px bg-emerald-400/20"></div>
            </div>

            {/* Secondary Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigateToOutput('pdf')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Convert to PDF</span>
              </button>

              <button
                onClick={() => navigateToOutput('keywords')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Keyword Extraction</span>
              </button>

              <button
                onClick={() => navigateToOutput('topics')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Topic Classification</span>
              </button>

              <button
                onClick={() => navigateToOutput('sentiment')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Sentiment Analysis</span>
              </button>

              <button
                onClick={() => navigateToOutput('translation')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg transition-all duration-300 transform hover:scale-105 group col-span-2 md:col-span-1"
              >
                <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-emerald-300 text-sm font-medium">Multi-lingual Translation</span>
              </button>
            </div>

            {/* Render a small inline message near the input area (no CSS changes) */}
            {showInputRequired && (
              <div className="text-rose-400 text-sm mt-2">
                Please add a link, paste text, or upload a file before using this action.
              </div>
            )}
          </div>
        </div>

        {/* Features Footer */}
        
      </div>

      {/* Custom Animations */}
      <style >{`
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
      `}</style>
    </div>
  );
}