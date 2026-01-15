import { Navbar } from "./components/navbar/navbar";

export default function menuLayout({children}: {children: React.ReactNode;}) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
}