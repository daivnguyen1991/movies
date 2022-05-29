import create from "zustand";

const useStore = create((set, get) => ({
  networkTracker: { open: false, message: null },
  setNetworkTracker: (networkTracker) => {
    set((s) => ({
      ...s,
      networkTracker: { ...s.networkTracker, ...networkTracker },
    }));
  },

  // Drawer Layout
  isOpen: false,
  setIsOpen: () => {
    set((s) => ({ ...s, isOpen: !s.isOpen }));
  },

  searchValue: "",
  setSearchValue: (value) => {
    set((s) => ({ ...s, searchValue: value }));
  },

  pageNewPlaying: 1,
  pageTopRated: 1,
  pageSearch: 1,
  setPage: (key, value) => {
    set((s) => ({ ...s, [key]: value }));
  },

  view: "grid", // list || grid
  setView: (view) => {
    set((s) => ({ ...s, view }));
  },

  activeId: null,
  setActiveId: (activeId) => {
    set((s) => ({ ...s, activeId }));
  },
}));

export default useStore;

export const api_key = "key_api";

export const linkUrlSearchKeyword = (query, page) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=true`;

export const linkUrlNowPlaying = (page) =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page}`;

export const linkUrlTopRated = (page) =>
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${page}`;

export const linkUrlGetDetail = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;

export const fetcher = (...args) => {
  return fetch(...args).then((res) => res.json());
};

export const getImgUrl = (tail) => `https://image.tmdb.org/t/p/w500${tail}`;

export const logoxData = {
  url: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg",
  info: "demo logo",
};

export const menus = [
  { id: "now-playing", path: "/now-playing", label: "Now Playing" },
  { id: "top-rated", path: "/top-rated", label: "Top Rated" },
];
