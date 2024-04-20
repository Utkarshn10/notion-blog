import Link from "next/link";
import { Github } from 'lucide-react';

export default function Navbar(){
    return (
      <div className="h-10 my-4 flex flex-row space-x-6 bg-yellow-100 px-4 rounded-xl">
        <h2 className="hover:cursor-pointer flex items-center">
          <Link href="" className="text-xl font-semibold">Utkarsh Nagar</Link>
        </h2>
        <h2 className="hover:cursor-pointer flex space-x-1 text-lg">
          <Link href="https://github.com/Utkarshn10/notion-blog" className="flex items-center"> 
            <Github  className="h-5 w-5 mr-1"  />
            Source
          </Link>
        </h2>
        <h2 className="hover:cursor-pointer text-lg flex items-center">
          <Link href="https://sideprojectss.com/Utkarshn10">Projects</Link>
        </h2>
      </div>
    );
}