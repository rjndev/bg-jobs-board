"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Job } from "@/types/job-types";
import { useJobs } from "@/hooks/jobsHooks";
import { PendingDoctorsPanel } from "./_components/PendingDoctorsPanel";
import { JobUploadPanel } from "./_components/JobUploadPanel";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "jobs";
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { res, isLoading } = useJobs({});
  const jobs = res?.jobs || [];

  if (tab === "doctors") {
    return <PendingDoctorsPanel />;
  }

  if (tab === "upload") {
    return (
      <div className="min-h-screen bg-gray-50 w-full">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="text-sm text-gray-600">Upload job files to parse and review</span>
          </div>
        </header>
        <JobUploadPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Add New Job
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Jobs List Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading jobs...</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    setIsEditing(false);
                  }}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedJob?.id === job.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    {job.is_urgent && (
                      <span className="px-2 py-1 text-xs bg-purple-500 text-white rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{job.facility}</p>
                  <p className="text-sm text-gray-500">{job.location}, {job.state}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {job.shift_type}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {job.rate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Details Panel */}
        <div className="flex-1 overflow-y-auto">
          {selectedJob ? (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? "Edit Job" : "Job Details"}
                </h2>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <JobEditForm job={selectedJob} />
              ) : (
                <JobDetailsView job={selectedJob} />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-4 text-lg">Select a job to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Job Details View Component
function JobDetailsView({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <DetailRow label="Title" value={job.title} />
      <DetailRow label="Job Type" value={job.job} />
      <DetailRow label="Facility" value={job.facility} />
      <DetailRow label="Location" value={job.location} />
      <DetailRow label="State" value={job.state} />
      <DetailRow label="Shift Type" value={job.shift_type} />
      <DetailRow label="Rate" value={`$${job.rate}`} />
      <DetailRow label="Start Date" value={new Date(job.start_date).toLocaleDateString()} />
      <DetailRow label="End Date" value={new Date(job.end_date).toLocaleDateString()} />
      <DetailRow label="Urgent" value={job.is_urgent ? "Yes" : "No"} />
      <DetailRow label="Created At" value={new Date(job.created_at).toLocaleString()} />
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-2">Coordinates</p>
        <p className="text-sm text-gray-600">Latitude: {job.lat}</p>
        <p className="text-sm text-gray-600">Longitude: {job.long}</p>
      </div>
    </div>
  );
}

// Job Edit Form Component
function JobEditForm({ job }: { job: Job }) {
  return (
    <form className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <FormField label="Title" name="title" defaultValue={job.title} />
      <FormField label="Job Type" name="job" defaultValue={job.job} />
      <FormField label="Facility" name="facility" defaultValue={job.facility} />
      <FormField label="Location" name="location" defaultValue={job.location} />
      <FormField label="State" name="state" defaultValue={job.state} />
      <FormField label="Rate" name="rate" defaultValue={job.rate} type="text" />
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Shift Type
        </label>
        <select
          name="shift_type"
          defaultValue={job.shift_type}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Day">Day</option>
          <option value="Night">Night</option>
          <option value="Evening">Evening</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>

      <FormField 
        label="Start Date" 
        name="start_date" 
        type="date" 
        defaultValue={job.start_date.split('T')[0]} 
      />
      <FormField 
        label="End Date" 
        name="end_date" 
        type="date" 
        defaultValue={job.end_date.split('T')[0]} 
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_urgent"
          defaultChecked={job.is_urgent}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Mark as Urgent
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Latitude" name="lat" type="number" step="any" defaultValue={job.lat.toString()} />
        <FormField label="Longitude" name="long" type="number" step="any" defaultValue={job.long.toString()} />
      </div>
    </form>
  );
}

// Helper Components
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

function FormField({ 
  label, 
  name, 
  type = "text", 
  defaultValue,
  step
}: { 
  label: string; 
  name: string; 
  type?: string; 
  defaultValue: string;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}