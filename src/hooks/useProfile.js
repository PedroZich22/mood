import { useState, useEffect } from "react";
import { userService } from "../services/userService";

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

      const profileData = await userService.getProfile();

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
      const updatedProfile = await userService.updateProfile(profileData);
      setProfile(updatedProfile);
      return updatedProfile;
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
    isLoading,
    error,
    updateProfile,
    deleteAccount,
    refreshUserData: fetchUserData,
  };
};
