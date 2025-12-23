"use client";

import { useState } from "react";
import { FiCheck, FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";
import { useUnapprovedDoctors } from "@/hooks/doctorsHooks";

interface PendingDoctor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  licenseNumber: string;
  location?: string;
  createdAt: string;
}

export function PendingDoctorsPanel() {
  const { doctors: rawDoctors, isLoading, error, refetch } = useUnapprovedDoctors();
  
  // Map database fields to display format
  const doctors: PendingDoctor[] = rawDoctors.map(doc => ({
    id: doc.id,
    name: `${doc.first_name} ${doc.last_name}`,
    email: doc.email,
    phone: doc.phone,
    licenseNumber: doc.dr_number,
    location: doc.location,
    createdAt: doc.created_at,
  }));
  const [selectedDoctor, setSelectedDoctor] = useState<PendingDoctor | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const handleApprove = async (doctorId: string) => {
    setActionInProgress(doctorId);
    try {
      const response = await fetch(`/api/doctors/${doctorId}/approve`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to approve doctor");
      }

      const result = await response.json();
      console.log("Doctor approved:", result);
      
      // Close detail panel and refresh list
      setSelectedDoctor(null);
      await refetch();
    } catch (error) {
      console.error("Error approving doctor:", error);
      alert(`Failed to approve doctor: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (doctorId: string) => {
    setActionInProgress(doctorId);
    try {
      // Replace with actual API call
      console.log("Rejecting doctor:", doctorId);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Remove from list
      // setDoctors(doctors.filter(d => d.id !== doctorId));
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    } finally {
      setActionInProgress(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Pending Doctors</h1>
          <p className="text-sm text-gray-600 mt-1">
            {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} awaiting approval
          </p>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Doctors List */}
        <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <p>Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No pending applications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedDoctor?.id === doctor.id
                      ? "bg-blue-50 border-l-4 border-blue-600"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiUser className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {doctor.email}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Applied: {formatDate(doctor.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctor Details Panel */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {selectedDoctor ? (
            <div className="p-8">
              {/* Doctor Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedDoctor.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {selectedDoctor.email}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Applied on {formatDate(selectedDoctor.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedDoctor.id)}
                    disabled={actionInProgress !== null}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiCheck size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedDoctor.id)}
                    disabled={actionInProgress !== null}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiX size={18} />
                    Reject
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Email */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMail className="text-blue-600" size={18} />
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                  </div>
                  <p className="text-gray-600">{selectedDoctor.email}</p>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiPhone className="text-blue-600" size={18} />
                    <p className="text-sm font-semibold text-gray-700">Phone</p>
                  </div>
                  <p className="text-gray-600">{selectedDoctor.phone || "Not provided"}</p>
                </div>

                {/* License Number */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    License Number
                  </p>
                  <p className="text-gray-600 font-mono">{selectedDoctor.licenseNumber}</p>
                </div>

                {/* Location */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="text-blue-600" size={18} />
                    <p className="text-sm font-semibold text-gray-700">Location</p>
                  </div>
                  <p className="text-gray-600">{selectedDoctor.location || "Not provided"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-lg text-gray-500">
                  Select a doctor to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
