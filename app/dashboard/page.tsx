'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Stack } from '@/types/hypercard';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [showNewStackModal, setShowNewStackModal] = useState(false);
  const [newStackName, setNewStackName] = useState('');
  const [newStackDescription, setNewStackDescription] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'stacks'),
      where('ownerId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stacksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Stack[];
      setStacks(stacksData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreateStack = async () => {
    if (!user || !newStackName.trim()) return;

    try {
      await addDoc(collection(db, 'stacks'), {
        name: newStackName,
        description: newStackDescription,
        ownerId: user.uid,
        isPublic: false,
        cardOrder: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setShowNewStackModal(false);
      setNewStackName('');
      setNewStackDescription('');
    } catch (error) {
      console.error('Error creating stack:', error);
    }
  };

  const handleDeleteStack = async (stackId: string) => {
    if (confirm('Are you sure you want to delete this stack?')) {
      try {
        await deleteDoc(doc(db, 'stacks', stackId));
      } catch (error) {
        console.error('Error deleting stack:', error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">My Stacks</h1>
            <button
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => setShowNewStackModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create New Stack
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacks.map((stack) => (
            <div
              key={stack.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{stack.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStack(stack.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600 mb-4">{stack.description || 'No description'}</p>
              <button
                onClick={() => router.push(`/editor/${stack.id}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                Open in Editor →
              </button>
            </div>
          ))}
        </div>

        {stacks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You don't have any stacks yet.</p>
            <button
              onClick={() => setShowNewStackModal(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Create your first stack
            </button>
          </div>
        )}
      </div>

      {showNewStackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Stack</h2>
            <input
              type="text"
              placeholder="Stack name"
              value={newStackName}
              onChange={(e) => setNewStackName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              autoFocus
            />
            <textarea
              placeholder="Description (optional)"
              value={newStackDescription}
              onChange={(e) => setNewStackDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewStackModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateStack}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}