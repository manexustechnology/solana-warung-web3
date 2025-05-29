import { useState, useEffect } from 'react';

export const useCurrencyRates = () => {
  const [rates, setRates] = useState({
    solanaRate: 0.0333, // 1 USDC = 0.0333 SOL (example rate)
    idrRate: 15600,     // 1 USDC = 15600 IDR (example rate)
  });

  useEffect(() => {
    // In a real application, you would fetch real-time rates from an oracle
    // For example, using Pyth Network for Solana prices
    const fetchRates = async () => {
      try {
        // Fetch rates from your preferred price feed
        // const response = await fetch('your-price-feed-api');
        // const data = await response.json();
        // setRates({
        //   solanaRate: data.solanaRate,
        //   idrRate: data.idrRate,
        // });
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return rates;
}; 