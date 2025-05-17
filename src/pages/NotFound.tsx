
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-gray-600 mb-6">Halaman tidak ditemukan</p>
        <p className="text-gray-500 mb-8">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan ke URL lain
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={handleGoBack} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Kembali
          </Button>
          <Button 
            onClick={handleGoHome}
            className="flex items-center gap-2"
          >
            <Home size={16} />
            Ke Halaman Utama
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;