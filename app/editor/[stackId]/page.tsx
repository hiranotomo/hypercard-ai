'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc, collection, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Stack, Card } from '@/types/hypercard';
import CardEditor from '@/components/CardEditor';

export default function EditorPage({ params }: { params: Promise<{ stackId: string }> }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [stack, setStack] = useState<Stack | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loadingStack, setLoadingStack] = useState(true);
  const [stackId, setStackId] = useState<string>('');

  useEffect(() => {
    params.then(p => setStackId(p.stackId));
  }, [params]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !stackId) return;

    const fetchStack = async () => {
      try {
        const stackDoc = await getDoc(doc(db, 'stacks', stackId));
        if (stackDoc.exists()) {
          const stackData = { id: stackDoc.id, ...stackDoc.data() } as Stack;
          if (stackData.ownerId !== user.uid) {
            router.push('/dashboard');
            return;
          }
          setStack(stackData);
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching stack:', error);
        router.push('/dashboard');
      } finally {
        setLoadingStack(false);
      }
    };

    fetchStack();
  }, [user, stackId, router]);

  useEffect(() => {
    if (!stack) return;

    const unsubscribe = onSnapshot(
      collection(db, 'stacks', stackId, 'cards'),
      (snapshot) => {
        const cardsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Card[];
        setCards(cardsData);
      }
    );

    return () => unsubscribe();
  }, [stack, stackId]);

  const handleCreateCard = async () => {
    if (!stack) return;

    const newCard: Omit<Card, 'id'> = {
      stackId: stack.id,
      name: `Card ${cards.length + 1}`,
      background: { type: 'color', value: '#ffffff' },
      elements: [],
      scripts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'stacks', stack.id, 'cards'), newCard);
      await updateDoc(doc(db, 'stacks', stack.id), {
        cardOrder: [...stack.cardOrder, docRef.id],
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleUpdateCard = async (updatedCard: Card) => {
    try {
      const { id, ...cardData } = updatedCard;
      await updateDoc(doc(db, 'stacks', stackId, 'cards', id), {
        ...cardData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!stack || cards.length <= 1) return;

    if (confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteDoc(doc(db, 'stacks', stackId, 'cards', cardId));
        await updateDoc(doc(db, 'stacks', stackId), {
          cardOrder: stack.cardOrder.filter((id) => id !== cardId),
          updatedAt: new Date(),
        });
        if (currentCardIndex >= cards.length - 1) {
          setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
        }
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  if (loading || loadingStack) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!stack) {
    return null;
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-white shadow-sm border-b">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h1 className="text-xl font-semibold">{stack.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCreateCard}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              New Card
            </button>
            {currentCard && (
              <button
                onClick={() => handleDeleteCard(currentCard.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete Card
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        {cards.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">This stack has no cards yet.</p>
              <button
                onClick={handleCreateCard}
                className="text-blue-600 hover:text-blue-800"
              >
                Create your first card
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1">
              {currentCard && (
                <CardEditor
                  card={currentCard}
                  onUpdate={handleUpdateCard}
                />
              )}
            </div>
            <div className="w-48 bg-gray-100 border-l p-4">
              <h3 className="font-semibold mb-4">Cards</h3>
              <div className="space-y-2">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      index === currentCardIndex
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {card.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}