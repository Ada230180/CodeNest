import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '../services/firebase';

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Check and restore user session
      checkSession: async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            set({ user });
            return user;
          }
          return null;
        } catch (error) {
          console.error('Session check error:', error);
          return null;
        }
      },
      
      // Theme state
      isDarkMode: true,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Current community and channel
      currentCommunity: null,
      currentChannel: null,
      setCurrentCommunity: (community) => set({ currentCommunity: community }),
      setCurrentChannel: (channel) => set({ currentChannel: channel }),
      
      // Sidebar state
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'codenest-storage', // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({
        user: state.user,
        isDarkMode: state.isDarkMode,
      }), // only persist these states
    }
  )
);

export default useStore;
