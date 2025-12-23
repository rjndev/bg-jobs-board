import Navbar from "./_components/Navbar";
import ProtectedRoute from "../_providers/protected-route";

export default function Layout({children} : {children : React.ReactNode}){
  return(
    <ProtectedRoute requireApproval blockAdmin>
      {/* <Navbar /> */}
      {children}
    </ProtectedRoute>
  );
}