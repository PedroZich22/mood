import { useState, useEffect } from "react";
import { User, Bell, Camera, Save } from "lucide-react";
import { useUser as useUserHook } from "../hooks/useUser";
import { useAuth } from "../contexts/AuthContext";
import { useMoods } from "../hooks/useMoods";
import { useToast } from "../contexts/ToastContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

const Profile = () => {
  const { user } = useAuth();
  const {
    profile,
    settings,
    updateProfile,
    updateSettings,
    uploadAvatar,
    exportData,
    deleteAccount,
    isLoading,
  } = useUserHook();
  const { moods } = useMoods();
  const { showSuccess, showError } = useToast();
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    notifications: true,
    privacy: "private",
    theme: "brown",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || user.name || "",
        email: profile.email || user.email || "",
        notifications: settings?.notifications ?? true,
        privacy: settings?.privacy || "private",
        theme: settings?.theme || "brown",
      });
    }
  }, [profile, settings, user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
      });

      await updateSettings({
        notifications: profileData.notifications,
        privacy: profileData.privacy,
        theme: profileData.theme,
      });

      showSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadAvatar(file);
      showSuccess("Avatar updated successfully!");
    } catch (error) {
      showError(error);
    }
  };

  const handleExportData = async () => {
    try {
      await exportData();
      showSuccess("Data exported successfully!");
    } catch (error) {
      showError(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      await deleteAccount();
      showSuccess("Account deleted successfully!");
      // Redirect to landing page or logout
    } catch (error) {
      showError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-brown-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="h-32 bg-brown-100 rounded"></div>
            </Card>
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="h-64 bg-brown-100 rounded"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="heading-lg mb-2">Profile Settings</h1>
        <p className="text-brown-600 font-light">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <Card className="p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-brown-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-brown-800 text-white p-2 rounded-full hover:bg-brown-700 transition-colors cursor-pointer">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <h2 className="heading-md mb-1">{profileData.name}</h2>
            <p className="text-brown-600 font-light mb-4">
              {profileData.email}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-brown-600">Member since:</span>
                <span className="text-brown-800">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "January 2024"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brown-600">Mood entries:</span>
                <span className="text-brown-800">{moods.length}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Account Settings</CardTitle>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-brown-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-medium text-brown-800 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-brown-700">
                          Email Notifications
                        </label>
                        <p className="text-sm text-brown-600">
                          Receive reminders and updates via email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={profileData.notifications}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-brown-600 border-brown-300 rounded focus:ring-brown-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">
                        Privacy Level
                      </label>
                      <Select
                        name="privacy"
                        value={profileData.privacy}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full"
                      >
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                        <option value="public">Public</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">
                        Theme
                      </label>
                      <Select
                        name="theme"
                        value={profileData.theme}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full"
                      >
                        <option value="brown">Brown Theme</option>
                        <option value="blue">Blue Theme</option>
                        <option value="green">Green Theme</option>
                        <option value="purple">Purple Theme</option>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4 border-t border-brown-200">
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-brown-700">
                      Export Data
                    </h3>
                    <p className="text-sm text-brown-600">
                      Download all your mood data as a CSV file
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleExportData}
                    size="sm"
                  >
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-red-700">
                      Delete Account
                    </h3>
                    <p className="text-sm text-brown-600">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
