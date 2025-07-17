import React, { useState } from "react";
import {
  Search,
  Mail,
  AlertCircle,
  Copy,
  CheckCircle,
  Undo2,
} from "lucide-react";

export default function EmailExtractor() {
  const [url, setUrl] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setEmails([]);

    try {
      const response = await fetch(
        `https://email-extractor-0oyz.onrender.com/extract-emails?url=${encodeURIComponent(
          url
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEmails(data.emails || []);

      if (!data.emails || data.emails.length === 0) {
        setError("No emails found on this webpage");
      }
    } catch (err) {
      setError("Failed to extract emails. Please check the URL and try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (email, index) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copyAllEmails = async () => {
    try {
      const emailText = emails.join("\n");
      await navigator.clipboard.writeText(emailText);
      setCopiedIndex("all");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy all emails:", err);
    }
  };

  const resetEmailHandler = () => {
    setEmails([]);
    setUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            <img
              src="/vite.svg"
              alt="My Icon"
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
            />
            <h1 className="sm:text-4xl text-2xl font-bold text-gray-800">
              Email Extractor
            </h1>
          </div>
          <p className="text-gray-600">
            Extract email addresses from any webpage
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Webpage URL
              </label>
              <div className="relative">
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  disabled={loading}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    <span>Extract Emails</span>
                  </>
                )}
              </button>
              {emails.length > 0 && (
                <button
                  onClick={resetEmailHandler}
                  className="w-half bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <>
                    <Undo2 className="h-5 w-5" />
                    <span>Reset</span>
                  </>
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {emails.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-h-[40vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="sm:text-2xl text-xl font-bold text-gray-800">
                Found {emails.length} Email{emails.length !== 1 ? "s" : ""}
              </h2>
              <button
                onClick={copyAllEmails}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {copiedIndex === "all" ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-800 font-medium">{email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(email, index)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="mt-16 text-center">
        <p className="text-gray-600">
          © 2025{" "}
          <a
            href="https://haris-ejaz-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            Haris Ejaz
          </a>{" "}
          All rights reserved
        </p>
      </footer>
    </div>
  );
}
