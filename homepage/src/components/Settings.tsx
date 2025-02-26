import { useState, useEffect } from "react";
import { Bell, Trash2, User, Sun, Moon, Monitor } from "lucide-react";
import { auth } from "../firebase"; // Import Firebase auth
import { deleteUser } from "firebase/auth";

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "system");
  const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem("notifications") === "true"
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme: string) => {
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (selectedTheme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", darkMode);
      localStorage.setItem("theme", "system");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const user = auth.currentUser;

      if (user) {
        try {
          await deleteUser(user);
          localStorage.clear();
          alert("Your account has been deleted.");
          window.location.href = "/";
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("Failed to delete account. Please re-login and try again.");
        }
      } else {
        alert("No user logged in.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Settings</h1>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              localStorage.setItem("userName", e.target.value);
            }}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
            {theme === "dark" ? <Moon className="w-5 h-5" /> : theme === "light" ? <Sun className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Enable Notifications
          </label>
          <button
            onClick={() => {
              setNotificationsEnabled(!notificationsEnabled);
              localStorage.setItem("notifications", (!notificationsEnabled).toString());
            }}
            className={`p-2 rounded-lg ${notificationsEnabled ? "bg-green-500" : "bg-gray-500"} text-white`}
          >
            {notificationsEnabled ? "On" : "Off"}
          </button>
        </div>

        <div className="text-right">
          <button
            onClick={handleDeleteAccount}
            className="p-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
