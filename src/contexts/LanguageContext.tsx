import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'Grand Hotel',
    'header.admin': 'Admin',
    'header.welcome': 'Welcome',
    
    // Main page
    'main.title': 'Welcome to Grand Hotel',
    'main.subtitle': 'Discover our exquisite collection of culinary delights, crafted with passion and served with elegance',
    'main.menu': 'Our Menu',
    'main.search': 'Search menu items...',
    'main.allItems': 'All Items',
    
    // Menu items
    'menu.recommended': 'Recommended for You',
    'menu.specials': 'Chef\'s Specials',
    'menu.addToCart': 'Add to Cart',
    'menu.quantity': 'Quantity',
    'menu.specialNotes': 'Special Notes',
    'menu.specialNotesPlaceholder': 'Any special requests or dietary restrictions...',
    'menu.cancel': 'Cancel',
    'menu.unavailable': 'Currently Unavailable',
    'menu.prepTime': 'min prep time',
    
    // Cart
    'cart.title': 'Your Order',
    'cart.empty': 'Your cart is empty',
    'cart.emptySubtitle': 'Add some delicious items from our menu!',
    'cart.total': 'Total',
    'cart.proceedToOrder': 'Proceed to Order',
    'cart.tableNumber': 'Table Number',
    'cart.roomNumber': 'Room Number',
    'cart.contactInfo': 'Contact Information',
    'cart.tableNumberPlaceholder': 'e.g., Table 12',
    'cart.roomNumberPlaceholder': 'e.g., Room 305',
    'cart.contactInfoPlaceholder': 'Phone number or room extension',
    'cart.back': 'Back',
    'cart.placeOrder': 'Place Order',
    'cart.orderSuccess': 'Order placed successfully! You will receive updates on the status.',
    'cart.note': 'Note',
    'cart.each': 'each',
    
    // Order Review
    'review.title': 'Rate Your Experience',
    'review.subtitle': 'Help us improve by rating the items you ordered',
    'review.rateItem': 'Rate this item:',
    'review.comments': 'Comments (optional):',
    'review.commentsPlaceholder': 'Tell us what you thought about this item...',
    'review.skipReviews': 'Skip Reviews',
    'review.submitReviews': 'Submit Reviews',
    
    // Admin Login
    'admin.login': 'Admin Login',
    'admin.username': 'Username',
    'admin.password': 'Password',
    'admin.loginButton': 'Login',
    'admin.demoCredentials': 'Demo Credentials:',
    'admin.invalidCredentials': 'Invalid username or password',
    'admin.usernamePlaceholder': 'Enter your username',
    'admin.passwordPlaceholder': 'Enter your password',
    
    // Admin Dashboard
    'admin.dashboard': 'Admin Dashboard',
    'admin.welcomeBack': 'Welcome back',
    'admin.logout': 'Logout',
    'admin.orders': 'Orders',
    'admin.menu': 'Menu',
    'admin.categories': 'Categories',
    'admin.analytics': 'Analytics',
    'admin.reviews': 'Reviews',
    
    // Order Management
    'orders.title': 'Order Management',
    'orders.noOrders': 'No orders yet',
    'orders.noOrdersSubtitle': 'Orders will appear here when customers place them',
    'orders.activeOrders': 'Active Orders',
    'orders.completedOrders': 'Completed Orders',
    'orders.orderNumber': 'Order #',
    'orders.table': 'Table',
    'orders.room': 'Room',
    'orders.contact': 'Contact',
    'orders.estimatedTime': 'Estimated time',
    'orders.items': 'Items',
    'orders.startPreparing': 'Start Preparing',
    'orders.markReady': 'Mark Ready',
    'orders.completeOrder': 'Complete Order',
    'orders.requestReview': 'Request Review',
    'orders.completed': 'Completed',
    'orders.pending': 'Pending',
    'orders.preparing': 'Preparing',
    'orders.ready': 'Ready',
    'orders.min': 'min',
    
    // Menu Management
    'menuMgmt.title': 'Menu Management',
    'menuMgmt.addMenuItem': 'Add Menu Item',
    'menuMgmt.editMenuItem': 'Edit Menu Item',
    'menuMgmt.addNewMenuItem': 'Add New Menu Item',
    'menuMgmt.name': 'Name',
    'menuMgmt.price': 'Price',
    'menuMgmt.description': 'Description',
    'menuMgmt.category': 'Category',
    'menuMgmt.prepTime': 'Prep Time (minutes)',
    'menuMgmt.imageUrl': 'Image URL',
    'menuMgmt.recommended': 'Recommended',
    'menuMgmt.special': 'Chef\'s Special',
    'menuMgmt.available': 'Available',
    'menuMgmt.update': 'Update',
    'menuMgmt.add': 'Add',
    'menuMgmt.fillRequired': 'Please fill in all required fields',
    'menuMgmt.deleteConfirm': 'Are you sure you want to delete this menu item?',
    'menuMgmt.noItems': 'No menu items yet',
    'menuMgmt.noItemsSubtitle': 'Add your first menu item to get started',
    'menuMgmt.categoryLabel': 'Category',
    'menuMgmt.selectCategory': 'Select a category',
    
    // Category Management
    'categoryMgmt.title': 'Category Management',
    'categoryMgmt.addCategory': 'Add Category',
    'categoryMgmt.editCategory': 'Edit Category',
    'categoryMgmt.addNewCategory': 'Add New Category',
    'categoryMgmt.sortOrder': 'Sort Order',
    'categoryMgmt.deleteConfirm': 'Are you sure you want to delete this category?',
    'categoryMgmt.cannotDelete': 'Cannot delete category that contains menu items. Please move or delete the items first.',
    'categoryMgmt.noCategories': 'No categories yet',
    'categoryMgmt.noCategoriesSubtitle': 'Add your first category to organize your menu',
    'categoryMgmt.item': 'item',
    'categoryMgmt.items': 'items',
    
    // Analytics
    'analytics.title': 'Analytics Dashboard',
    'analytics.todaySales': 'Today\'s Sales',
    'analytics.weeklySales': 'Weekly Sales',
    'analytics.monthlySales': 'Monthly Sales',
    'analytics.averageRating': 'Average Rating',
    'analytics.dailySales': 'Daily Sales (Last 7 Days)',
    'analytics.mostPopular': 'Most Popular Items',
    'analytics.topRated': 'Top Rated Items',
    'analytics.sold': 'sold',
    'analytics.revenue': 'revenue',
    'analytics.noSalesData': 'No sales data available',
    'analytics.noReviews': 'No reviews available',
    'analytics.orders': 'orders',
    'analytics.reviews': 'reviews',
    
    // Reviews Management
    'reviewsMgmt.title': 'Customer Reviews',
    'reviewsMgmt.overallRating': 'Overall Rating',
    'reviewsMgmt.totalReviews': 'total reviews',
    'reviewsMgmt.ratingDistribution': 'Rating Distribution',
    'reviewsMgmt.allRatings': 'All Ratings',
    'reviewsMgmt.stars': 'Stars',
    'reviewsMgmt.newestFirst': 'Newest First',
    'reviewsMgmt.oldestFirst': 'Oldest First',
    'reviewsMgmt.highestRating': 'Highest Rating',
    'reviewsMgmt.lowestRating': 'Lowest Rating',
    'reviewsMgmt.noReviews': 'No reviews found',
    'reviewsMgmt.noReviewsSubtitle': 'Reviews will appear here when customers leave feedback',
    'reviewsMgmt.noReviewsFilter': 'No reviews with {rating} stars',
    'reviewsMgmt.unknownItem': 'Unknown Item',
    
    // Common
    'common.required': 'required',
    'common.optional': 'optional',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.est': 'Est.',
  },
  am: {
    // Header
    'header.title': 'ግራንድ ሆቴል',
    'header.admin': 'አስተዳዳሪ',
    'header.welcome': 'እንኳን ደህና መጡ',
    
    // Main page
    'main.title': 'ወደ ግራንድ ሆቴል እንኳን ደህና መጡ',
    'main.subtitle': 'በፍቅር የተዘጋጁ እና በጨዋነት የሚቀርቡ ልዩ ምግቦቻችንን ይዳስሱ',
    'main.menu': 'የእኛ ምናሌ',
    'main.search': 'ምግቦችን ይፈልጉ...',
    'main.allItems': 'ሁሉም ምግቦች',
    
    // Menu items
    'menu.recommended': 'ለእርስዎ የሚመከሩ',
    'menu.specials': 'የሼፍ ልዩ ምግቦች',
    'menu.addToCart': 'ወደ ጋሪ ጨምር',
    'menu.quantity': 'ብዛት',
    'menu.specialNotes': 'ልዩ ማስታወሻዎች',
    'menu.specialNotesPlaceholder': 'ማንኛውም ልዩ ጥያቄ ወይም የአመጋገብ ገደቦች...',
    'menu.cancel': 'ሰርዝ',
    'menu.unavailable': 'በአሁኑ ጊዜ አይገኝም',
    'menu.prepTime': 'ደቂቃ የዝግጅት ጊዜ',
    
    // Cart
    'cart.title': 'የእርስዎ ትዕዛዝ',
    'cart.empty': 'የእርስዎ ጋሪ ባዶ ነው',
    'cart.emptySubtitle': 'ከምናሌያችን አንዳንድ ጣፋጭ ምግቦችን ይጨምሩ!',
    'cart.total': 'ጠቅላላ',
    'cart.proceedToOrder': 'ወደ ትዕዛዝ ይቀጥሉ',
    'cart.tableNumber': 'የጠረጴዛ ቁጥር',
    'cart.roomNumber': 'የክፍል ቁጥር',
    'cart.contactInfo': 'የመገናኛ መረጃ',
    'cart.tableNumberPlaceholder': 'ለምሳሌ፣ ጠረጴዛ 12',
    'cart.roomNumberPlaceholder': 'ለምሳሌ፣ ክፍል 305',
    'cart.contactInfoPlaceholder': 'የስልክ ቁጥር ወይም የክፍል ቁጥር',
    'cart.back': 'ተመለስ',
    'cart.placeOrder': 'ትዕዛዝ ይስጡ',
    'cart.orderSuccess': 'ትዕዛዝ በተሳካ ሁኔታ ተሰጥቷል! ስለ ሁኔታው ዝማኔዎችን ይቀበላሉ።',
    'cart.note': 'ማስታወሻ',
    'cart.each': 'እያንዳንዱ',
    
    // Order Review
    'review.title': 'ተሞክሮዎን ይገምግሙ',
    'review.subtitle': 'ያዘዙትን ምግቦች በመገምገም እንድንሻሻል ይርዱን',
    'review.rateItem': 'ይህንን ምግብ ይገምግሙ:',
    'review.comments': 'አስተያየቶች (አማራጭ):',
    'review.commentsPlaceholder': 'ስለዚህ ምግብ ያሰቡትን ይንገሩን...',
    'review.skipReviews': 'ግምገማዎችን ዝለል',
    'review.submitReviews': 'ግምገማዎችን ላክ',
    
    // Admin Login
    'admin.login': 'የአስተዳዳሪ መግቢያ',
    'admin.username': 'የተጠቃሚ ስም',
    'admin.password': 'የይለፍ ቃል',
    'admin.loginButton': 'ግባ',
    'admin.demoCredentials': 'የማሳያ ምስክርነቶች:',
    'admin.invalidCredentials': 'ልክ ያልሆነ የተጠቃሚ ስም ወይም የይለፍ ቃል',
    'admin.usernamePlaceholder': 'የተጠቃሚ ስምዎን ያስገቡ',
    'admin.passwordPlaceholder': 'የይለፍ ቃልዎን ያስገቡ',
    
    // Admin Dashboard
    'admin.dashboard': 'የአስተዳዳሪ ዳሽቦርድ',
    'admin.welcomeBack': 'እንኳን ደህና ተመለሱ',
    'admin.logout': 'ውጣ',
    'admin.orders': 'ትዕዛዞች',
    'admin.menu': 'ምናሌ',
    'admin.categories': 'ምድቦች',
    'admin.analytics': 'ትንታኔዎች',
    'admin.reviews': 'ግምገማዎች',
    
    // Order Management
    'orders.title': 'የትዕዛዝ አስተዳደር',
    'orders.noOrders': 'ገና ምንም ትዕዛዝ የለም',
    'orders.noOrdersSubtitle': 'ደንበኞች ትዕዛዝ ሲሰጡ እዚህ ይታያሉ',
    'orders.activeOrders': 'ንቁ ትዕዛዞች',
    'orders.completedOrders': 'የተጠናቀቁ ትዕዛዞች',
    'orders.orderNumber': 'ትዕዛዝ #',
    'orders.table': 'ጠረጴዛ',
    'orders.room': 'ክፍል',
    'orders.contact': 'መገናኛ',
    'orders.estimatedTime': 'የሚገመተው ጊዜ',
    'orders.items': 'ምግቦች',
    'orders.startPreparing': 'ዝግጅት ጀምር',
    'orders.markReady': 'ዝግጁ አድርግ',
    'orders.completeOrder': 'ትዕዛዝ አጠናቅቅ',
    'orders.requestReview': 'ግምገማ ጠይቅ',
    'orders.completed': 'ተጠናቅቋል',
    'orders.pending': 'በመጠባበቅ ላይ',
    'orders.preparing': 'በዝግጅት ላይ',
    'orders.ready': 'ዝግጁ',
    'orders.min': 'ደቂቃ',
    
    // Menu Management
    'menuMgmt.title': 'የምናሌ አስተዳደር',
    'menuMgmt.addMenuItem': 'የምናሌ ምግብ ጨምር',
    'menuMgmt.editMenuItem': 'የምናሌ ምግብ አርም',
    'menuMgmt.addNewMenuItem': 'አዲስ የምናሌ ምግብ ጨምር',
    'menuMgmt.name': 'ስም',
    'menuMgmt.price': 'ዋጋ',
    'menuMgmt.description': 'መግለጫ',
    'menuMgmt.category': 'ምድብ',
    'menuMgmt.prepTime': 'የዝግጅት ጊዜ (በደቂቃ)',
    'menuMgmt.imageUrl': 'የምስል አድራሻ',
    'menuMgmt.recommended': 'የሚመከር',
    'menuMgmt.special': 'የሼፍ ልዩ',
    'menuMgmt.available': 'ይገኛል',
    'menuMgmt.update': 'አዘምን',
    'menuMgmt.add': 'ጨምር',
    'menuMgmt.fillRequired': 'እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ',
    'menuMgmt.deleteConfirm': 'ይህንን የምናሌ ምግብ መሰረዝ እርግጠኛ ነዎት?',
    'menuMgmt.noItems': 'ገና የምናሌ ምግቦች የሉም',
    'menuMgmt.noItemsSubtitle': 'ለመጀመር የመጀመሪያ የምናሌ ምግብዎን ይጨምሩ',
    'menuMgmt.categoryLabel': 'ምድብ',
    'menuMgmt.selectCategory': 'ምድብ ይምረጡ',
    
    // Category Management
    'categoryMgmt.title': 'የምድብ አስተዳደር',
    'categoryMgmt.addCategory': 'ምድብ ጨምር',
    'categoryMgmt.editCategory': 'ምድብ አርም',
    'categoryMgmt.addNewCategory': 'አዲስ ምድብ ጨምር',
    'categoryMgmt.sortOrder': 'የመደብ ቅደም ተከተል',
    'categoryMgmt.deleteConfirm': 'ይህንን ምድብ መሰረዝ እርግጠኛ ነዎት?',
    'categoryMgmt.cannotDelete': 'የምናሌ ምግቦች የያዘ ምድብ መሰረዝ አይቻልም። እባክዎ መጀመሪያ ምግቦቹን ያንቀሳቅሱ ወይም ይሰርዙ።',
    'categoryMgmt.noCategories': 'ገና ምድቦች የሉም',
    'categoryMgmt.noCategoriesSubtitle': 'ምናሌዎን ለማደራጀት የመጀመሪያ ምድብዎን ይጨምሩ',
    'categoryMgmt.item': 'ምግብ',
    'categoryMgmt.items': 'ምግቦች',
    
    // Analytics
    'analytics.title': 'የትንታኔ ዳሽቦርድ',
    'analytics.todaySales': 'የዛሬ ሽያጭ',
    'analytics.weeklySales': 'የሳምንት ሽያጭ',
    'analytics.monthlySales': 'የወር ሽያጭ',
    'analytics.averageRating': 'አማካይ ደረጃ',
    'analytics.dailySales': 'ዕለታዊ ሽያጭ (ባለፉት 7 ቀናት)',
    'analytics.mostPopular': 'በጣም ተወዳጅ ምግቦች',
    'analytics.topRated': 'ከፍተኛ ደረጃ ያላቸው ምግቦች',
    'analytics.sold': 'ተሽጧል',
    'analytics.revenue': 'ገቢ',
    'analytics.noSalesData': 'የሽያጭ መረጃ አይገኝም',
    'analytics.noReviews': 'ግምገማዎች አይገኙም',
    'analytics.orders': 'ትዕዛዞች',
    'analytics.reviews': 'ግምገማዎች',
    
    // Reviews Management
    'reviewsMgmt.title': 'የደንበኞች ግምገማዎች',
    'reviewsMgmt.overallRating': 'አጠቃላይ ደረጃ',
    'reviewsMgmt.totalReviews': 'ጠቅላላ ግምገማዎች',
    'reviewsMgmt.ratingDistribution': 'የደረጃ ስርጭት',
    'reviewsMgmt.allRatings': 'ሁሉም ደረጃዎች',
    'reviewsMgmt.stars': 'ኮከቦች',
    'reviewsMgmt.newestFirst': 'አዲሶቹ መጀመሪያ',
    'reviewsMgmt.oldestFirst': 'አሮጌዎቹ መጀመሪያ',
    'reviewsMgmt.highestRating': 'ከፍተኛ ደረጃ',
    'reviewsMgmt.lowestRating': 'ዝቅተኛ ደረጃ',
    'reviewsMgmt.noReviews': 'ምንም ግምገማዎች አልተገኙም',
    'reviewsMgmt.noReviewsSubtitle': 'ደንበኞች አስተያየት ሲሰጡ እዚህ ይታያሉ',
    'reviewsMgmt.noReviewsFilter': '{rating} ኮከቦች ያላቸው ግምገማዎች የሉም',
    'reviewsMgmt.unknownItem': 'ያልታወቀ ምግብ',
    
    // Common
    'common.required': 'አስፈላጊ',
    'common.optional': 'አማራጭ',
    'common.save': 'አስቀምጥ',
    'common.cancel': 'ሰርዝ',
    'common.edit': 'አርም',
    'common.delete': 'ሰርዝ',
    'common.close': 'ዝጋ',
    'common.loading': 'በመጫን ላይ...',
    'common.error': 'ስህተት',
    'common.success': 'ተሳክቷል',
    'common.est': 'ግምት',
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}