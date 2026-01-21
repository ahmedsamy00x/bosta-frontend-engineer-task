import AppRouter from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
    
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" />
        </QueryClientProvider>
    )
}

export default App;