'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push('/')}
          className="mac-button text-xs mb-4"
        >
          ← Home
        </button>
        
        <div className="mac-window">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </span>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs block mb-1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mac-field w-full"
                  required
                />
              </div>
              <div>
                <label className="text-xs block mb-1">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mac-field w-full"
                  required
                />
              </div>
              
              {error && (
                <div className="text-xs text-red-600 text-center">{error}</div>
              )}
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="mac-button flex-1"
                >
                  {loading ? 'Processing...' : (isSignUp ? 'Create' : 'Sign In')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="mac-button"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}