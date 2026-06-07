import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (requests.length === 0)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 bg-gray-800 border border-white/10 rounded-full flex items-center justify-center text-4xl">
          📭
        </div>
        <h1 className="text-xl font-bold text-white">No pending requests</h1>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          When developers are interested in connecting with you, their requests will appear here.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Connection Requests</h1>
          <p className="text-gray-500 text-sm mt-1">
            {requests.length} pending request{requests.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Request Cards */}
        <div className="space-y-3">
          {requests.map((request) => {
            const { _id, fromUserId } = request;
            const { firstName, lastName, photoUrl, age, gender, about, skills } = fromUserId;

            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-900 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all duration-200"
              >
                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="shrink-0">
                    <img
                      src={photoUrl || "https://via.placeholder.com/64"}
                      alt={firstName}
                      className="w-14 h-14 rounded-xl object-cover ring-2 ring-orange-500/20"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-white font-bold text-base">
                        {firstName} {lastName}
                      </h2>
                      {age && gender && (
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                          {age} · {gender}
                        </span>
                      )}
                    </div>

                    {about && (
                      <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">{about}</p>
                    )}

                    {skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {skills.length > 3 && (
                          <span className="text-gray-600 text-xs py-0.5">
                            +{skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex gap-2 shrink-0 sm:flex-col">
                  <button
                    onClick={() => handleRequest("accepted", _id)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
                  >
                    <span>✓</span> Accept
                  </button>
                  <button
                    onClick={() => handleRequest("rejected", _id)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 text-rose-400 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
                  >
                    <span>✕</span> Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
