import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmarks: (state, action) => {
      state.value.push(action.payload);
    },
    removeBookmarks: (state, action) => {
      state.value = state.value.filter(
        (element) => element.title != action.payload.title
      );
    },
    removeAllBookmarks: (state, action) => {
      state.value = [];
    },
  },
});

export const { addBookmarks, removeBookmarks, removeAllBookmarks } =
  bookmarksSlice.actions;
export default bookmarksSlice.reducer;
