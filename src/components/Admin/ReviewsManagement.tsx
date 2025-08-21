import React, { useState } from 'react';
import { Star, MessageSquare, Calendar, MapPin, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function ReviewsManagement() {
  const { state } = useApp();
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating-high' | 'rating-low'>('newest');

  const filteredAndSortedReviews = state.reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const getMenuItemName = (menuItemId: string) => {
    const item = state.menuItems.find(item => item.id === menuItemId);
    return item?.name || 'Unknown Item';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-amber-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 bg-green-50';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const averageRating = state.reviews.length > 0 
    ? state.reviews.reduce((sum, review) => sum + review.rating, 0) / state.reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: state.reviews.filter(review => review.rating === rating).length,
    percentage: state.reviews.length > 0 
      ? (state.reviews.filter(review => review.rating === rating).length / state.reviews.length) * 100 
      : 0,
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Overall Rating</h3>
            <MessageSquare className="h-6 w-6 text-amber-600" />
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
          </div>
          <p className="text-gray-600">{state.reviews.length} total reviews</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reviews found</p>
            <p className="text-gray-400">
              {filterRating ? `No reviews with ${filterRating} stars` : 'Reviews will appear here when customers leave feedback'}
            </p>
          </div>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {getMenuItemName(review.menuItemId)}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(review.rating)}`}>
                      {review.rating}/5
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  {(review.customerInfo.tableNumber || review.customerInfo.roomNumber) && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {review.customerInfo.tableNumber && `Table ${review.customerInfo.tableNumber}`}
                        {review.customerInfo.roomNumber && `Room ${review.customerInfo.roomNumber}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {review.comment && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}