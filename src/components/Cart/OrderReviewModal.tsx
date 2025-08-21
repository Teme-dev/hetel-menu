import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Review } from '../../types';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export function OrderReviewModal({ isOpen, onClose, orderId }: OrderReviewModalProps) {
  const { state, dispatch } = useApp();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<{ [itemId: string]: { rating: number; comment: string } }>({});

  const order = state.orders.find(o => o.id === orderId);

  const handleRatingChange = (itemId: string, rating: number) => {
    setReviews(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], rating }
    }));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setReviews(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], comment }
    }));
  };

  const handleSubmitReviews = () => {
    if (!order) return;

    Object.entries(reviews).forEach(([itemId, reviewData]) => {
      if (reviewData.rating > 0) {
        const review: Review = {
          id: `${orderId}-${itemId}-${Date.now()}`,
          orderId,
          menuItemId: itemId,
          rating: reviewData.rating,
          comment: reviewData.comment || '',
          customerInfo: {
            tableNumber: order.customerInfo.tableNumber,
            roomNumber: order.customerInfo.roomNumber,
          },
          createdAt: new Date(),
        };
        dispatch({ type: 'ADD_REVIEW', payload: review });
      }
    });

    setReviews({});
    onClose();
  };

  const renderStars = (itemId: string, currentRating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        onClick={() => handleRatingChange(itemId, index + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`h-6 w-6 transition-colors ${
            index < currentRating
              ? 'text-amber-500 fill-current'
              : 'text-gray-300 hover:text-amber-400'
          }`}
        />
      </button>
    ));
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{t('review.title')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">{t('review.subtitle')}</p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {order.items.map((item) => {
              const currentReview = reviews[item.id] || { rating: 0, comment: '' };
              
              return (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">{t('review.rateItem')}</p>
                        <div className="flex space-x-1">
                          {renderStars(item.id, currentReview.rating)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('review.comments')}:
                        </label>
                        <textarea
                          value={currentReview.comment}
                          onChange={(e) => handleCommentChange(item.id, e.target.value)}
                          placeholder={t('review.commentsPlaceholder')}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {t('review.skipReviews')}
            </button>
            <button
              onClick={handleSubmitReviews}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {t('review.submitReviews')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}