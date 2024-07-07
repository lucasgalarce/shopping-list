import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex h-screen flex-col justify-between">
      <Navbar />
      <main className="flex h-full flex-col justify-center">{children}</main>
    </div>
  );
};

export default Layout;
