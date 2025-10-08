import Navbar from "./_components/Navbar";

export default function Layout({children} : {children : React.ReactNode}){
  return(
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}