"use client";

import { useState } from "react";
import { ParsedJob } from "@/utlis/jobParser";

export function JobUploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ count: number; jobs: ParsedJob[] } | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/jobs/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to parse file");
      }

      const data = await response.json();
      setResult({ count: data.inserted || data.count || 0, jobs: data.jobs || [] });
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-4 mx-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Upload Jobs File</h2>
          <p className="text-sm text-gray-600">Upload .txt, .pdf, or .docx to parse jobs.</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-700"
          />
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isUploading ? "Processing..." : "Process"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-600">{error}</div>
      )}

      {result && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 font-semibold">Parsed {result.count} jobs.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {result.jobs.slice(0, 6).map((job, idx) => (
              <div key={`${job.referenceNumber || idx}-${idx}`} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <p className="text-sm font-semibold text-gray-900">{job.category}</p>
                <p className="text-sm text-gray-700">{job.jobTitle}</p>
                <p className="text-xs text-gray-600">{job.location}</p>
                <p className="text-xs text-gray-600">{job.schedule}</p>
                <p className="text-xs text-gray-800 font-medium">${job.pay}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
