import { Sidebar } from "./_components/Sidebar";
import ProtectedRoute from "../_providers/protected-route";

export default function Layout({children} : {children : React.ReactNode}){
  return(
    <ProtectedRoute checkAdmin={true}>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </ProtectedRoute>
  );
}