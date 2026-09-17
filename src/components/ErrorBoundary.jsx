import React from 'react';
import { AlertCircle, RotateCcw, Home, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { safeStorage } from '../utils/storage';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleClearCacheAndReload = () => {
    safeStorage.clearAppKeys();
    try {
      window.localStorage?.clear();
    } catch {}
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    safeStorage.setItem('kc_view', 'landing');
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="max-w-xl w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 mb-2">
                  System Diagnostics
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Display Recovery Mode
                </h1>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  A client-side initialization fault was caught. This typically happens when older session data in your browser is incompatible with the updated platform layout.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleClearCacheAndReload}
                className="flex-1 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Cache & Launch App</span>
              </button>
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Landing Page</span>
              </button>
            </div>

            {/* Diagnostics toggle */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={this.toggleDetails}
                className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-slate-800 py-1 transition"
              >
                <span>Technical Trace Details</span>
                {this.state.showDetails ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {this.state.showDetails && (
                <div className="mt-3 p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto space-y-2 max-h-60">
                  <div className="text-red-400 font-bold">
                    {this.state.error?.toString()}
                  </div>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-[11px] text-slate-400 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
