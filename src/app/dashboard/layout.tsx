import Navbar from "./_components/Navbar";

export default function Layout({children} : {children : React.ReactNode}){
  return(
    <html lang="en">
      <body className="w-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}