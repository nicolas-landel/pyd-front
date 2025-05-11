import { useUserStore } from '~/stores/user'

export default function authMiddleware(to: any) {
  const userStore = useUserStore()

  console.log("MIIIIIIDLE", userStore.getCurrentUser);

  // Check if the user is logged in
  if (!userStore.getCurrentUser) {
    // Redirect to /home if not authenticated
    return '/home'
  }
}