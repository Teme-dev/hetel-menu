import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import { Header } from './components/Layout/Header';
import { CategoryFilter } from './components/Menu/CategoryFilter';
import { SearchBar } from './components/Menu/SearchBar';
import { MenuGrid } from './components/Menu/MenuGrid';
import { RecommendedSection } from './components/RecommendedSection';
import { Cart } from './components/Cart/Cart';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { MenuItem } from './types';
import { loadMenuItems, loadCategories, loadOrders, loadAdmins, loadReviews, saveMenuItems, saveCategories, saveOrders, saveAdmins, saveReviews } from './utils/storage';
import { initialMenuItems, initialCategories, initialAdmins } from './data/initialData';

function AppContent() {
  const { state, dispatch } = useApp();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Load initial data
  useEffect(() => {
    const menuItems = loadMenuItems();
    const categories = loadCategories();
    const orders = loadOrders();
    const admins = loadAdmins();
    const reviews = loadReviews();

    // Initialize with default data if empty
    const initializedMenuItems = menuItems.length > 0 ? menuItems : initialMenuItems;
    const initializedCategories = categories.length > 0 ? categories : initialCategories;
    const initializedAdmins = admins.length > 0 ? admins : initialAdmins;

    // Save initial data if it was empty
    if (menuItems.length === 0) saveMenuItems(initializedMenuItems);
    if (categories.length === 0) saveCategories(initializedCategories);
    if (admins.length === 0) saveAdmins(initializedAdmins);

    dispatch({
      type: 'LOAD_DATA',
      payload: {
        menuItems: initializedMenuItems,
        categories: initializedCategories,
        orders,
        reviews,
      },
    });
  }, [dispatch]);

  // Save data to localStorage when state changes
  useEffect(() => {
    saveMenuItems(state.menuItems);
  }, [state.menuItems]);

  useEffect(() => {
    saveCategories(state.categories);
  }, [state.categories]);

  useEffect(() => {
    saveOrders(state.orders);
  }, [state.orders]);

  useEffect(() => {
    saveReviews(state.reviews);
  }, [state.reviews]);

  const handleAddToCart = (item: MenuItem, quantity: number, notes?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { item, quantity, notes } });
  };

  const handleAdminClick = () => {
    if (state.currentAdmin) {
      dispatch({ type: 'LOGOUT_ADMIN' });
    } else {
      setShowAdminLogin(true);
    }
  };

  const filteredItems = state.menuItems.filter(item => {
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  if (state.isAdminMode && state.currentAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setShowCart(true)} onAdminClick={handleAdminClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('main.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('main.subtitle')}
          </p>
        </div>

        <RecommendedSection menuItems={state.menuItems} onAddToCart={handleAddToCart} />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('main.menu')}</h2>
          
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <CategoryFilter
            categories={state.categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <MenuGrid items={filteredItems} onAddToCart={handleAddToCart} />
        </div>
      </main>

      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      <AdminLogin isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;