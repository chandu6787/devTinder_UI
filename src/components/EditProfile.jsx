import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const InputField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const inputClass = "w-full bg-gray-800 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skillsInput, setSkillsInput] = useState(user?.skills?.join(", ") || "");
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setGender(user.gender || "");
    setPhotoUrl(user.photoUrl || "");
    setSkillsInput(user.skills?.join(", ") || "");
    setAbout(user.about || "");
    setAge(user.age || "");
  }, [user]);

  const dispatch = useDispatch();
  if (!user) return null;

  const parseSkills = () =>
    skillsInput.split(",").map((s) => s.trim()).filter(Boolean);

  const previewUser = { firstName, lastName, gender, photoUrl, skills: parseSkills(), about, age };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const payload = { ...previewUser, skills: parseSkills() };
      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(addUser(res.status === 204 ? payload : res.data));
      setStatusMessage("✓ Profile updated successfully.");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setStatusMessage(`✗ Update failed: ${message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const isSuccess = statusMessage.startsWith("✓");

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      {/* Toast */}
      {statusMessage && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border text-sm font-medium shadow-2xl transition-all ${
          isSuccess
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-rose-500/10 border-rose-500/30 text-rose-400"
        }`}>
          {statusMessage}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Edit Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Update your developer profile and see the live preview</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Form */}
          <div className="w-full lg:flex-1 bg-gray-900 border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="First Name">
                <input type="text" className={inputClass} placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </InputField>
              <InputField label="Last Name">
                <input type="text" className={inputClass} placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </InputField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Age">
                <input type="number" className={inputClass} placeholder="25" value={age} min={18} max={100} onChange={(e) => setAge(e.target.value)} />
              </InputField>
              <InputField label="Gender">
                <select className={inputClass} value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="" className="bg-gray-800">Select gender</option>
                  <option value="male" className="bg-gray-800">Male</option>
                  <option value="female" className="bg-gray-800">Female</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </InputField>
            </div>

            <InputField label="Photo URL">
              <input type="text" className={inputClass} placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            </InputField>

            <InputField label="Skills (comma separated)">
              <input type="text" className={inputClass} placeholder="React, Node.js, MongoDB, Python" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />
              {parseSkills().length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {parseSkills().map((s, i) => (
                    <span key={i} className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </InputField>

            <InputField label="About">
              <textarea
                className={`${inputClass} resize-none h-24`}
                placeholder="Tell other developers about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </InputField>

            <button
              onClick={saveProfile}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-rose-500/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Saving...
                </span>
              ) : "Save Profile"}
            </button>
          </div>

          {/* Live Preview */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Live Preview</p>
            <UserCard user={previewUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
