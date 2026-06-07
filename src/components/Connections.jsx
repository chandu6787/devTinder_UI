import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const getConnections = async () => {
    const res = await axios.get(BASE_URL + "user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res?.data));
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-bold text-base-content">
          You have no connections
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center my-10 gap-4 px-4">
      <h1 className="text-3xl font-bold mb-4 text-base-content">My Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;
        return (
          <div
            key={_id}
            className="flex items-center gap-6 bg-base-200 rounded-2xl shadow-md p-4 w-full max-w-2xl"
          >
            {/* Avatar */}
            <img
              src={photoUrl || "https://via.placeholder.com/80"}
              alt={firstName}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />

            {/* Info */}
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-base-content">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm text-base-content/60">
                  🎂 {age} yrs &nbsp;|&nbsp; {gender === "male" ? "👨" : "👩"} {gender}
                </p>
              )}

              {about && (
                <p className="text-sm text-base-content/50 max-w-md line-clamp-2">
                  📝 {about}
                </p>
              )}

              {skills?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-outline text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;