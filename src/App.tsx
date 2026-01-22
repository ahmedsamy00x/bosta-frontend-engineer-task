import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useAuthStore } from "./stores/useAuthStore";

const queryClient = new QueryClient();
    
export function App() {
    const initAuth = useAuthStore(state => state.initAuth)
    
    useEffect(() => {
        initAuth()
    }, [initAuth])

    return (
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" />
        </QueryClientProvider>
    )
}

export default App;