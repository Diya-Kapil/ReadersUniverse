import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    email: "sneha@example.com",
    username: "sneha_reader",
    password: "",
    theme: "light",
    notifications: true,
    autoBackup: false,
    language: "English",
    fontSize: "Medium",
    timeZone: "IST",
    linkedAccount: "",
    privacy: "Public",
    readingReminder: true,
    accessibility: false,
    securityAlerts: true,
    bookSuggestions: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  const Checkbox = ({ name, label }) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={settings[name]}
        onChange={handleChange}
        className="h-5 w-5 accent-indigo-600 rounded focus:ring-indigo-500 transition"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
      <Sidebar />
      <Topbar />

      <main className="pt-24 ml-20 px-8 pb-12">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10">⚙️ Settings</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Account Information */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h2>
              <div className="space-y-4">
                <input
                  name="username"
                  value={settings.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Username"
                />
                <input
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Email"
                />
                <input
                  name="password"
                  type="password"
                  value={settings.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="New Password"
                />
              </div>
            </div>

            {/* 2. Display Preferences */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Display Preferences</h2>
              <div className="space-y-4">
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
                <select
                  name="fontSize"
                  value={settings.fontSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>

            {/* 3. Notifications */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
              <div className="space-y-3">
                <Checkbox name="notifications" label="Email Notifications" />
                <Checkbox name="readingReminder" label="Reading Reminders" />
                <Checkbox name="autoBackup" label="Auto Backup Notes" />
                <Checkbox name="accessibility" label="Accessibility Mode" />
              </div>
            </div>

            {/* 4. Miscellaneous */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Miscellaneous</h2>
              <div className="space-y-4">
                <input
                  name="timeZone"
                  value={settings.timeZone}
                  onChange={handleChange}
                  placeholder="Time Zone"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="linkedAccount"
                  value={settings.linkedAccount}
                  onChange={handleChange}
                  placeholder="Link Account (Google, GitHub)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                  name="privacy"
                  value={settings.privacy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option>Public</option>
                  <option>Friends Only</option>
                  <option>Private</option>
                </select>
              </div>
            </div>

            {/* 5. Security Settings */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Security Settings</h2>
              <div className="space-y-4">
                <Checkbox name="securityAlerts" label="Send Security Alerts" />
                <p className="text-sm text-gray-600">
                  Get notified if a suspicious login is detected on your account.
                </p>
              </div>
            </div>

            {/* 6. Book Suggestions */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Book Discovery</h2>
              <div className="space-y-4">
                <Checkbox name="bookSuggestions" label="Enable Book Suggestions" />
                <p className="text-sm text-gray-600">
                  Get personalized recommendations based on your favorite genres and reading habits.
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="max-w-6xl mx-auto mt-12 text-center">
            <button
              type="submit"
              className="px-12 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Settings;
