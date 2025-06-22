import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FiBookOpen, FiUsers, FiHeart, FiFeather } from "react-icons/fi";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-indigo-100">
      <Sidebar />
      <Topbar />

      <main className="pt-24 ml-20 px-6 pb-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800">About ReadersUniverse</h1>
          <p className="text-md text-gray-700 mt-2 max-w-2xl mx-auto">
            A space where your love for books meets community, connection, and creativity.
          </p>
        </div>

        {/* Section: What is ReadersUniverse */}
        <div className="bg-white shadow-md rounded-3xl px-8 py-10 mb-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🌌 What is ReadersUniverse?</h2>
          <p className="text-gray-700 leading-relaxed text-md">
            ReadersUniverse is not just a digital library — it’s a universe built for readers, by readers. 
            From discovering new genres to tracking your reading goals, from sharing reviews to meeting people who love the same stories as you — we’re here to make reading feel deeply personal and beautifully connected.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <FiBookOpen className="text-2xl text-indigo-600" />
              <h3 className="text-xl font-bold text-indigo-800">Personal Library</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Add, save, track and organize all your reads in one digital place.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <FiHeart className="text-2xl text-pink-600" />
              <h3 className="text-xl font-bold text-pink-800">Favourites & Notes</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Mark books you love, and jot down your thoughts and reflections as you read.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <FiUsers className="text-2xl text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">Reader Matches</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Connect with like-minded readers who share your genre interests and book taste.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <FiFeather className="text-2xl text-green-600" />
              <h3 className="text-xl font-bold text-green-800">Reviews & Reflections</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Share your perspective, write reviews, and inspire other readers on their journeys.
            </p>
          </div>
        </div>

        {/* Closing Section */}
        <div className="bg-white shadow-lg rounded-3xl p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-3">
            Our Vision 🌠
          </h2>
          <p className="text-gray-700 mb-4">
            We believe every book is a universe waiting to be explored. With ReadersUniverse, we aim to
            build not just a library, but a space that understands your reading personality, empowers
            your thoughts, and connects you to a thriving reader community.
          </p>
          <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition">
            Join the Universe
          </button>
        </div>
      </main>
    </div>
  );
}

export default About;
