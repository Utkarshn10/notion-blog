import Link from "next/link";

export default function Navbar(){
    return <div className="h-10 my-4 flex row space-x-4">
        <h2 className="hover:cursor-pointer"><Link href="">Utkarsh Nagar</Link></h2>
        <h2 className="hover:cursor-pointer"><Link href="https://github.com/Utkarshn10/notion-blog">Source</Link></h2>
    </div>;
}