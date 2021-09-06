import { AuthProvider } from "./Auth"

  const Provider = ({ children }) => {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    )
  }

export default Provider