import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export const useUser = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [profileData, settingsData] = await Promise.all([
        userService.getProfile(),
        userService.getSettings(),
      ]);

      setProfile(profileData);
      setSettings(settingsData);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedProfile = await userService.updateProfile(profileData);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      const updatedSettings = await userService.updateSettings(settingsData);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const result = await userService.uploadAvatar(file);
      setProfile((prev) => ({ ...prev, avatar: result.avatarUrl }));
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const exportData = async () => {
    try {
      const blob = await userService.exportData();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mood-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await userService.deleteAccount();
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    profile,
    settings,
    isLoading,
    error,
    updateProfile,
    updateSettings,
    uploadAvatar,
    exportData,
    deleteAccount,
    refreshUserData: fetchUserData,
  };
};
