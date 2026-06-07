import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeItemFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, photoUrl, firstName, lastName, gender, age, about, skills } = user || {};
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeItemFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Inside the component, has access to dispatch and _id
  const handleSkip = () => {
    dispatch(removeItemFromFeed(_id));
  };

  if (!user) {
    return (
      <div className="w-80 sm:w-96 bg-gray-900 border border-white/10 rounded-3xl p-8 text-center">
        <p className="text-gray-500 text-sm">No user data to display.</p>
      </div>
    );
  }

  return (
    <div className="w-80 sm:w-96 bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden group">
      {/* Photo */}
      <div className="relative h-80 sm:h-96 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={firstName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-6xl">
            👤
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-2xl font-black text-white">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-300 text-sm mt-0.5">
              {age} yrs · {gender}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        {about && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {about}
          </p>
        )}

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            title="Ignore"
            className="w-14 h-14 rounded-full bg-gray-800 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-gray-400 hover:text-red-400 text-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          >
            ✕
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            title="Interested"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg shadow-rose-500/30"
          >
            ♥
          </button>
          <button
            onClick={handleSkip}  // ✅ fixed: was calling handleSendRequest("ignored")
            title="Skip"
            className="w-14 h-14 rounded-full bg-gray-800 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 text-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;