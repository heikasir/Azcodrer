import create from 'zustand';

const useCodeStore = create((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (file) => set((state) => ({ files: state.files.filter(f => f !== file) })),
}));

export default useCodeStore;