import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
 
  return (
    <main className={`${inter.className}`}>
      <div className="w-screen h-screen flex items-center justify-center">
        <h1>Not Found</h1>
      </div>
    </main>
  );
}

