import { useState, useEffect } from "react";
import { profileService } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const profileData = await profileService.getProfile();

      setProfile(profileData);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedProfile = await profileService.updateProfile(profileData);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await profileService.deleteAccount();
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    deleteAccount,
    refreshUserData: fetchUserData,
  };
};
