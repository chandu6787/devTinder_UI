import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const visibleFeed = (feed || []).filter((f) => f?._id !== user?._id);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error('Feed fetch failed', error.response?.status, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading profiles...</p>
        </div>
      </div>
    );

  if (visibleFeed.length === 0)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center text-4xl">
          🎉
        </div>
        <h1 className="text-2xl font-bold text-white">You're all caught up!</h1>
        <p className="text-gray-500 text-center max-w-xs">
          No more profiles to explore right now. Check back later for new
          developers!
        </p>
      </div>
    );

  return (
    <div className="min-h-[80vh] bg-gray-950 flex flex-col items-center justify-center py-10 px-4">
      {/* Subtle counter */}
      <p className="text-gray-600 text-xs mb-6 tracking-widest uppercase">
        {visibleFeed.length} developer{visibleFeed.length !== 1 ? "s" : ""} to
        explore
      </p>

      <UserCard user={visibleFeed[0]} />

      <p className="text-gray-700 text-xs mt-6">
        ✕ ignore &nbsp;·&nbsp; ♥ interested &nbsp;·&nbsp; → skip
      </p>
    </div>
  );
};

export default Feed;
