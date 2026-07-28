export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  timezone: string;
  avatar: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Sterling',
  email: 'alex@kinetic.com',
  phone: '+1 (555) 000-0000',
  role: 'Lead Strategist at Kinetic Global',
  timezone: 'Pacific Time (PT)',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80',
};

const STORAGE_KEY = 'trackwise_user_profile';

export function getStoredProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch (e) {
    console.error('Failed to parse user profile', e);
  }
  return DEFAULT_PROFILE;
}

export function saveStoredProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('profile-updated'));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
}
