import React, { useMemo } from 'react';
import { TrendingUp, DollarSign, Star, Calendar, Award, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function AnalyticsDashboard() {
  const { state } = useApp();

  const analytics = useMemo(() => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Daily sales
    const todayOrders = state.orders.filter(order => 
      new Date(order.createdAt) >= startOfDay
    );
    const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);

    // Weekly sales
    const weeklyOrders = state.orders.filter(order => 
      new Date(order.createdAt) >= last7Days
    );
    const weeklySales = weeklyOrders.reduce((sum, order) => sum + order.total, 0);

    // Monthly sales
    const monthlyOrders = state.orders.filter(order => 
      new Date(order.createdAt) >= last30Days
    );
    const monthlySales = monthlyOrders.reduce((sum, order) => sum + order.total, 0);

    // Most popular items
    const itemSales = new Map<string, { count: number; revenue: number; name: string }>();
    
    state.orders.forEach(order => {
      order.items.forEach(item => {
        const current = itemSales.get(item.id) || { count: 0, revenue: 0, name: item.name };
        itemSales.set(item.id, {
          count: current.count + item.quantity,
          revenue: current.revenue + (item.price * item.quantity),
          name: item.name,
        });
      });
    });

    const popularItems = Array.from(itemSales.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Average rating per item
    const itemRatings = new Map<string, { totalRating: number; count: number; name: string }>();
    
    state.reviews.forEach(review => {
      const menuItem = state.menuItems.find(item => item.id === review.menuItemId);
      if (menuItem) {
        const current = itemRatings.get(review.menuItemId) || { totalRating: 0, count: 0, name: menuItem.name };
        itemRatings.set(review.menuItemId, {
          totalRating: current.totalRating + review.rating,
          count: current.count + 1,
          name: menuItem.name,
        });
      }
    });

    const topRatedItems = Array.from(itemRatings.entries())
      .map(([id, data]) => ({
        id,
        name: data.name,
        averageRating: data.totalRating / data.count,
        reviewCount: data.count,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    // Daily sales for the last 7 days
    const dailySalesData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      
      const dayOrders = state.orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= dayStart && orderDate < dayEnd;
      });
      
      const dayTotal = dayOrders.reduce((sum, order) => sum + order.total, 0);
      
      dailySalesData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        sales: dayTotal,
        orders: dayOrders.length,
      });
    }

    return {
      todaySales,
      weeklySales,
      monthlySales,
      todayOrders: todayOrders.length,
      weeklyOrders: weeklyOrders.length,
      monthlyOrders: monthlyOrders.length,
      popularItems,
      topRatedItems,
      dailySalesData,
      totalReviews: state.reviews.length,
      averageRating: state.reviews.length > 0 
        ? state.reviews.reduce((sum, review) => sum + review.rating, 0) / state.reviews.length 
        : 0,
    };
  }, [state.orders, state.reviews, state.menuItems]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Today's Sales</p>
              <p className="text-2xl font-bold">${analytics.todaySales.toFixed(2)}</p>
              <p className="text-green-100 text-sm">{analytics.todayOrders} orders</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Weekly Sales</p>
              <p className="text-2xl font-bold">${analytics.weeklySales.toFixed(2)}</p>
              <p className="text-blue-100 text-sm">{analytics.weeklyOrders} orders</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Monthly Sales</p>
              <p className="text-2xl font-bold">${analytics.monthlySales.toFixed(2)}</p>
              <p className="text-purple-100 text-sm">{analytics.monthlyOrders} orders</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100">Average Rating</p>
              <p className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</p>
              <p className="text-amber-100 text-sm">{analytics.totalReviews} reviews</p>
            </div>
            <Star className="h-8 w-8 text-amber-200" />
          </div>
        </div>
      </div>

      {/* Daily Sales Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales (Last 7 Days)</h3>
        <div className="space-y-4">
          {analytics.dailySalesData.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 w-20">{day.date}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 max-w-xs">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.max((day.sales / Math.max(...analytics.dailySalesData.map(d => d.sales))) * 100, 5)}%`
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">${day.sales.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{day.orders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Popular Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-600" />
            Most Popular Items
          </h3>
          <div className="space-y-4">
            {analytics.popularItems.length === 0 ? (
              <p className="text-gray-500">No sales data available</p>
            ) : (
              analytics.popularItems.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{item.count} sold</p>
                    <p className="text-xs text-gray-500">${item.revenue.toFixed(2)} revenue</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Rated Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-amber-600" />
            Top Rated Items
          </h3>
          <div className="space-y-4">
            {analytics.topRatedItems.length === 0 ? (
              <p className="text-gray-500">No reviews available</p>
            ) : (
              analytics.topRatedItems.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">
                        {item.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.reviewCount} reviews</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}