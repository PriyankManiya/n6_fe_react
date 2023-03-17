import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Creating a slice of the redux store. */
const authSlice = createSlice({
  name: "authSlice",
  initialState: { token: "", base_url: "http://127.0.0.1:8000/api" },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

/* Creating a slice of the redux store. */
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {},
    userslist: [],
    userRoleslist: [],
    createUser: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUsersListData: (state, action) => {
      state.userslist = action.payload;
    },
    setUserRoleListData: (state, action) => {
      state.userRoleslist = action.payload;
    },
    setCreateUser: (state, action) => {
      state.createUser = { ...state.createUser, ...action.payload };
    },
    setDefaultCreateUser: (state, action) => {
      state.createUser = {};
    },
  },
});

/* Creating a slice of the redux store. */
const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState: {
    project_list: [],
    project: {},
    createProject: {}

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
    },
    setCreateProject: (state, action) => {
      state.createProject = { ...state.createProject, ...action.payload };
    },
    setDefaultCreateProject: (state, action) => {
      state.createProject = {};
    },
  },
});

/* Creating a slice of the redux store. */
const notesSlice = createSlice({
  name: "notesSlice",
  initialState: {
    notes_list: [],
    note: {},
  },
  reducers: {
    setNotesData: (state, action) => {
      state.notes_list = [];
      action.payload.map((note) => {
        state.notes_list.push(note);
      });
    },
    setNoteData: (state, action) => {
      state.note = action.payload;
    },
  },
});

/* Creating a slice of the redux store. */
const companiesSlice = createSlice({
  name: "companiesSlice",
  initialState: {
    companies_list: [],
  },
  reducers: {
    setComapniesData: (state, action) => {
      state.companies_list = [];
      action.payload.map((comp) => {
        state.companies_list.push(comp);
      });
    },
  },
});

/**
 * If the action type is RESET, then return a new state object with all the reducers reset to their
 * initial state
 * @param state - The current state of the Redux store.
 * @param action - The action object that was dispatched.
 * @returns The rootReducer is being returned.
 */
const resetReducer = (state, action) => {
  if (action.type === "RESET") {
    return {
      auth: authSlice.reducer(undefined, action),
      user: userSlice.reducer(undefined, action),
      projects: projectsSlice.reducer(undefined, action),
      notes: notesSlice.reducer(undefined, action),
      companies: companiesSlice.reducer(undefined, action),
    };
  }
  return rootReducer(state, action);
};

/* Combining all the reducers into one reducer. */
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  projects: projectsSlice.reducer,
  notes: notesSlice.reducer,
  companies: companiesSlice.reducer,
});

/* This is the configuration for the redux-persist library. */
const persistConfig = {
  key: "root",
  storage,
};

/* The `persistReducer` function is a function from the `redux-persist` library. It takes two
arguments, the first argument is the configuration object for the `redux-persist` library. The
second argument is the reducer that you want to persist. */
const persistedReducer = persistReducer(persistConfig, resetReducer);

/* This is the configuration for the redux store. */
const store = configureStore({
  reducer: persistedReducer,
});

/* The `persistStore` function is a function from the `redux-persist` library. It takes one
argument, the redux store. It returns a persistor object. The persistor object has a `purge`
function that can be used to clear the persisted state. */
const persistor = persistStore(store);

/* Exporting all the actions from the redux store. */
const actions = {
  ...authSlice.actions,
  ...userSlice.actions,
  ...projectsSlice.actions,
  ...notesSlice.actions,
  ...companiesSlice.actions,
  reset: () => ({ type: "RESET" }),
};

export { actions, persistor };
export default store;
