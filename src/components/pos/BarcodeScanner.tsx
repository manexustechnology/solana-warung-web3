
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera, Loader2 } from 'lucide-react';

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startScanning = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play();
            checkForBarcode();
          }
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
      setHasCamera(false);
      setIsScanning(false);
    }
  };

  const checkForBarcode = () => {
    if (!isScanning) return;
    
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas dimensions to match video
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // In a real implementation, we would use a barcode scanning library here
        // For this demo, we'll simulate detecting a barcode after a delay
        setTimeout(() => {
          // Simulating barcode detection
          // In a real app, we would scan the canvas image data for barcodes
          const fakeBarcodes = ['1234567890123', '2345678901234', '3456789012345', 
                               '4567890123456', '5678901234567', '6789012345678'];
          const detectedBarcode = fakeBarcodes[Math.floor(Math.random() * fakeBarcodes.length)];
          
          // Stop scanning
          stopScanning();
          
          // Notify parent component about the detected barcode
          onDetected(detectedBarcode);
        }, 2000);
      } else {
        // If video is not ready yet, check again in a moment
        requestAnimationFrame(checkForBarcode);
      }
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Handle manual barcode input for demo purposes
  const handleManualInput = () => {
    const barcode = prompt("Enter barcode number:");
    if (barcode) {
      onDetected(barcode);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
        {!isScanning && !hasCamera && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <p className="text-gray-500 mb-2">Camera access is required for barcode scanning.</p>
            <Button onClick={handleManualInput} variant="secondary">
              Enter Barcode Manually
            </Button>
          </div>
        )}
        
        {!isScanning && hasCamera && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <Camera className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500 mb-4">Position the barcode in front of your camera</p>
            <Button onClick={startScanning}>
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          </div>
        )}
        
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        
        <video 
          ref={videoRef} 
          className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`}
          playsInline
        />
        <canvas 
          ref={canvasRef} 
          className="hidden"
        />
      </div>
      
      {isScanning && (
        <Button onClick={stopScanning} variant="secondary">
          Cancel Scanning
        </Button>
      )}
      
      <p className="text-xs text-gray-500 text-center mt-2">
        Note: For this demo, the barcode scanner will simulate detecting a random barcode from the product list.
      </p>
    </div>
  );
};

export default BarcodeScanner;
