import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { MenuItem } from '../types';
import { MenuCard } from './Menu/MenuCard';
import { useLanguage } from '../contexts/LanguageContext';

interface RecommendedSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
}

export function RecommendedSection({ menuItems, onAddToCart }: RecommendedSectionProps) {
  const { t } = useLanguage();
  const recommendedItems = menuItems.filter(item => item.isRecommended && item.available).slice(0, 3);
  const specialItems = menuItems.filter(item => item.isSpecial && item.available).slice(0, 2);

  if (recommendedItems.length === 0 && specialItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {recommendedItems.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">{t('menu.recommended')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}

      {specialItems.length > 0 && (
        <div>
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-red-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">{t('menu.specials')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}