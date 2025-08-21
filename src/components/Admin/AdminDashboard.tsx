import React, { useState } from 'react';
import { LogOut, Menu, Users, ShoppingBag, Plus, Settings, BarChart3, MessageSquare } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { MenuManagement } from './MenuManagement';
import { OrderManagement } from './OrderManagement';
import { CategoryManagement } from './CategoryManagement';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ReviewsManagement } from './ReviewsManagement';

export function AdminDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'categories' | 'analytics' | 'reviews'>('orders');
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_ADMIN' });
  };

  const tabs = [
    { id: 'orders' as const, name: t('admin.orders'), icon: ShoppingBag, count: state.orders.filter(o => o.status !== 'completed').length },
    { id: 'menu' as const, name: t('admin.menu'), icon: Menu, count: state.menuItems.length },
    { id: 'categories' as const, name: t('admin.categories'), icon: Settings, count: state.categories.length },
    ...(state.currentAdmin?.role === 'admin' ? [
      { id: 'analytics' as const, name: t('admin.analytics'), icon: BarChart3, count: 0 },
      { id: 'reviews' as const, name: t('admin.reviews'), icon: MessageSquare, count: state.reviews.length },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
                <p className="text-sm text-gray-600">{t('admin.welcomeBack')}, {state.currentAdmin?.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white p-1 rounded-xl shadow">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    activeTab === tab.id ? 'bg-amber-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'menu' && <MenuManagement />}
          {activeTab === 'categories' && <CategoryManagement />}
          {activeTab === 'analytics' && state.currentAdmin?.role === 'admin' && <AnalyticsDashboard />}
          {activeTab === 'reviews' && state.currentAdmin?.role === 'admin' && <ReviewsManagement />}
        </div>
      </div>
    </div>
  );
}