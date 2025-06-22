import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../services/api";

const trendingTags = [
  "#AtomicHabits",
  "#ColleenHoover",
  "#SelfHelp",
  "#ReadingChallenge2025",
  "#BookTok",
];

function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/user/feed");
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await API.get("/user/matches");
      setSuggestedUsers(res.data.matches);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchMatches();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      await API.post("/user/feed", { content: newPost });
      setNewPost("");
      fetchPosts();
    } catch (err) {
      console.error("Post error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/user/feed/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <Sidebar />
      <Topbar />

      <main className="pt-24 px-6 ml-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trending Tags */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-sky-700 mb-3">Trending Tags</h3>
            <ul className="space-y-2 text-sky-600 text-sm">
              {trendingTags.map((tag, index) => (
                <li key={index} className="hover:underline cursor-pointer">• {tag}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feed */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <textarea
              rows="3"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Turn the page, then tell the world.."
              className="w-full resize-none p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            ></textarea>
            <button
              onClick={handlePost}
              className="mt-3 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
            >
              Post
            </button>
          </div>

          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.profilePic || "https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt={post.user.username}
                    className="w-10 h-10 rounded-full object-cover border border-sky-400"
                  />
                  <span className="text-sm font-semibold text-sky-700">@{post.user.username}</span>
                </div>
                <span className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-700">{post.content}</p>
              <div className="flex gap-6 pt-2 text-sm text-gray-500">
                <button className="hover:text-sky-700">Like</button>
                <button className="hover:text-sky-700">Comment</button>
                <button className="hover:text-sky-700">Share</button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="hover:text-red-600 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-sky-700 mb-3">Suggested Users</h3>
            <ul className="space-y-4 text-sm text-gray-700">
              {suggestedUsers.map((user, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded hover:bg-sky-50 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-sky-300"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sky-800">@{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.genres?.[0] || "Reader"} 
                    </p>
                  </div>
                  <button
                    onClick={() => handleConnect(user.name)}
                    className="px-2 py-1 text-xs bg-sky-200 text-sky-800 rounded hover:bg-sky-300"
                  >
                    Match
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Feed;
