'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CounterData {
  total: number;
  countries: { [key: string]: number };
  lastUpdated: Date;
}

export default function AccessCounter() {
  const [counter, setCounter] = useState<CounterData | null>(null);
  const [userCountry, setUserCountry] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateCounter = async () => {
      try {
        // Get user's country from IP geolocation API
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();
        const countryCode = geoData.country_code || 'XX';
        const countryName = geoData.country_name || 'Unknown';
        setUserCountry(`${geoData.country_flag || '🌐'} ${countryName}`);

        // Update counter in Firestore
        const counterRef = doc(db, 'site-stats', 'counter');
        
        try {
          await setDoc(counterRef, {
            total: increment(1),
            [`countries.${countryCode}`]: increment(1),
            lastUpdated: new Date()
          }, { merge: true });
        } catch (error) {
          console.log('Counter update skipped - Firestore permissions');
        }

        // Get current counter data
        try {
          const counterDoc = await getDoc(counterRef);
          if (counterDoc.exists()) {
            setCounter(counterDoc.data() as CounterData);
          } else {
            // Initialize with default data
            setCounter({
              total: 1,
              countries: { [countryCode]: 1 },
              lastUpdated: new Date()
            });
          }
        } catch (error) {
          // Fallback to local counter
          const localCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
          localStorage.setItem('visitCount', localCount.toString());
          setCounter({
            total: localCount,
            countries: {},
            lastUpdated: new Date()
          });
        }
      } catch (error) {
        console.error('Error updating counter:', error);
        // Fallback to local storage
        const localCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
        localStorage.setItem('visitCount', localCount.toString());
        setCounter({
          total: localCount,
          countries: {},
          lastUpdated: new Date()
        });
      } finally {
        setLoading(false);
      }
    };

    updateCounter();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="inline-block bg-black text-green-400 px-3 py-1 font-mono text-xs">
          Loading...
        </div>
      </div>
    );
  }

  // Format counter with leading zeros (classic style)
  const formatCounter = (num: number) => {
    return num.toString().padStart(7, '0');
  };

  // Get top countries
  const topCountries = counter?.countries 
    ? Object.entries(counter.countries)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([code, count]) => ({
          code,
          count,
          flag: getCountryFlag(code)
        }))
    : [];

  return (
    <div className="text-center py-6 border-t-2 border-black">
      {/* Classic Counter Display */}
      <div className="mb-4">
        <div className="inline-block bg-black p-2 border-2 border-gray-600" style={{
          boxShadow: 'inset -2px -2px 0 #fff, inset 2px 2px 0 #000'
        }}>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">VISITORS:</span>
            <div className="flex">
              {formatCounter(counter?.total || 0).split('').map((digit, i) => (
                <div
                  key={i}
                  className="bg-gray-900 text-green-400 w-5 h-7 flex items-center justify-center font-mono text-sm border border-gray-700"
                  style={{
                    fontFamily: 'monospace',
                    textShadow: '0 0 3px #0f0'
                  }}
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Country Stats */}
      <div className="text-xs text-gray-600 mb-2">
        Your location: {userCountry}
      </div>

      {/* Top Countries */}
      {topCountries.length > 0 && (
        <div className="text-xs">
          <p className="mb-2 font-bold">Top Countries:</p>
          <div className="flex justify-center gap-3">
            {topCountries.map(({ code, count, flag }) => (
              <div key={code} className="flex items-center gap-1">
                <span className="text-lg">{flag}</span>
                <span className="font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classic "Since" text */}
      <div className="mt-4 text-xs text-gray-500">
        Since December 2024
      </div>
    </div>
  );
}

function getCountryFlag(code: string): string {
  // Convert country code to flag emoji
  const flagMap: { [key: string]: string } = {
    'US': '🇺🇸', 'JP': '🇯🇵', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
    'CA': '🇨🇦', 'AU': '🇦🇺', 'CN': '🇨🇳', 'KR': '🇰🇷', 'IN': '🇮🇳',
    'BR': '🇧🇷', 'MX': '🇲🇽', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱',
    'SE': '🇸🇪', 'NO': '🇳🇴', 'FI': '🇫🇮', 'DK': '🇩🇰', 'PL': '🇵🇱',
    'RU': '🇷🇺', 'TW': '🇹🇼', 'HK': '🇭🇰', 'SG': '🇸🇬', 'TH': '🇹🇭',
    'ID': '🇮🇩', 'MY': '🇲🇾', 'PH': '🇵🇭', 'VN': '🇻🇳', 'NZ': '🇳🇿'
  };
  
  return flagMap[code] || '🌐';
}