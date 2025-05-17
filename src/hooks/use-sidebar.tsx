
import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: (value: boolean) => void;
}

// Gunakan localStorage untuk mengingat state sidebar
const getSavedState = (): boolean => {
  const saved = localStorage.getItem('sidebar-collapsed');
  return saved ? JSON.parse(saved) : false;
};

const useSidebar = create<SidebarState>((set) => ({
  isCollapsed: getSavedState(),
  toggleCollapse: () => set((state) => {
    const newState = !state.isCollapsed;
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
    return { isCollapsed: newState };
  }),
  setCollapsed: (value: boolean) => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(value));
    set({ isCollapsed: value });
  },
}));

export default useSidebar;
