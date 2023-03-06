import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { token: "", base_url: "http://localhost:8000/api" },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState: {
    project_list: [],
    project: {},
  },
  reducers: {
    setProjectsData: (state, action) => {
      state.project_list = [];
      action.payload.map((project) => {
        state.project_list.push(project);
      });
    },
    setProjectData: (state, action) => {
      state.project = action.payload;
    }
  },
});

const notesSlice = createSlice({
  name: "notesSlice",
  initialState: {
    notes_list: [],
  },
  reducers: {
    setNotesData: (state, action) => {
      state.notes_list = [];
      action.payload.map((note) => {
        state.notes_list.push(note);
      });
    },
  },
});

const resetReducer = (state, action) => {
  if (action.type === "RESET") {
    return {
      auth: authSlice.reducer(undefined, action),
      user: userSlice.reducer(undefined, action),
      projects: projectsSlice.reducer(undefined, action),
      notes: notesSlice.reducer(undefined, action),
    };
  }
  return rootReducer(state, action);
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  projects: projectsSlice.reducer,
  notes: notesSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, resetReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const actions = {
  ...authSlice.actions,
  ...userSlice.actions,
  ...projectsSlice.actions,
  ...notesSlice.actions,
  reset: () => ({ type: "RESET" }),
};

export { actions, persistor };
export default store;
