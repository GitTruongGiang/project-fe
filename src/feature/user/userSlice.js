import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apisevice from "../../app/apisevice";
import { cloudinaryUpload } from "../../utills/cloudinaryUpload";

const initialState = {
  isLoading: false,
  updateUser: [],
};

export const updateUserProfile = createAsyncThunk(
  "user/updateUser",
  async (
    {
      userId,
      name,
      avatarUrl,
      coverUrl,
      aboutMe,
      city,
      country,
      facebookLink,
      instagramLink,
      linkedinLink,
      twitterLink,
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = {
        name,
        coverUrl,
        aboutMe,
        city,
        country,
        avatarUrl,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      };
      if (avatarUrl instanceof File) {
        const ImageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = ImageUrl;
      }
      const response = await apisevice.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload.data;
        state.updateUser = user;
        toast.success("Update Profile successfully ");
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = userSlice;
export const {} = actions;
export default reducer;
