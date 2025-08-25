export const useTheme = () => {
  const theme = useState('theme', () => {
    // Server-side: Check cookie first
    if (process.server) {
      const headers = useRequestHeaders(['cookie'])
      const cookieTheme = headers.cookie?.match(/theme=([^;]+)/)?.[1]
      if (cookieTheme) return cookieTheme
    }
    
    // Client-side: Check localStorage
    if (process.client) {
      return localStorage.getItem('theme') || 'dark' // Default to dark if no preference
    }
    
    // Fallback for other cases
    return 'dark'
  })

  const setTheme = (newTheme) => {
    theme.value = newTheme
    
    if (process.client) {
      // Update localStorage
      localStorage.setItem('theme', newTheme)
      
      // Update HTML attribute
      document.documentElement.setAttribute('data-theme', newTheme)
      
      // Set cookie for SSR consistency
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000` // 1 year expiry
    }
  }

  // Initialize on client side
  if (process.client) {
    // Apply the theme immediately
    document.documentElement.setAttribute('data-theme', theme.value)
    
    // Optional: Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme') && !document.cookie.includes('theme=')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleSystemChange)
    
    // Cleanup on unmount (for SPA navigation)
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleSystemChange)
    })
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    setTheme,
    toggleTheme
  }
}