export const middlewareMap: Record<string, () => Promise<any>> = {
  auth: () => import('./authMiddleware'), // Ensure the path is correct
}