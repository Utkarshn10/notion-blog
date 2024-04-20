export default function Footer(){
    const currentYear = new Date().getFullYear();
    return (
      <div className="flex items-center justify-center text-gray-600 py-4">
        © {currentYear} Utkarsh Nagar
      </div>
    );
}