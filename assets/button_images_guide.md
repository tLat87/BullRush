# Button Images Setup Guide

## Необходимые изображения кнопок

Для полной функциональности приложения нужно добавить следующие изображения в папку `assets/`:

### 1. Основная кнопка (button_bg.png)
- **Использование**: Все кнопки в приложении
- **Размер**: Рекомендуется 300x100px (будет растягиваться)
- **Стиль**: Золотая кнопка с закругленными углами
- **Формат**: PNG (для прозрачности)

### 2. Кнопка уровня (level_button_bg.png)
- **Использование**: Кнопки уровней 1-9
- **Размер**: 75x75px
- **Стиль**: Зеленая квадратная кнопка
- **Формат**: PNG

### 3. Кнопка уровня 10 (level_10_button_bg.png)
- **Использование**: Кнопка уровня 10
- **Размер**: 75x75px
- **Стиль**: Золотая квадратная кнопка с рамкой
- **Формат**: PNG

## Обновление путей к изображениям

После добавления изображений обновите пути в следующих файлах:

### MainMenuScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### LevelsScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### OnboardingScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### GameScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### BullRushScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### GameOverScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### BullRushSuccessScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### StatisticsScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

### ShareAppScreen.tsx
```tsx
imagePath="path/to/button_bg.png"
```

## Рекомендации по дизайну

### Основная кнопка (button_bg.png)
- Золотой цвет (#FFD700)
- Закругленные углы (borderRadius: 15)
- Тень для глубины
- Металлический блеск
- Градиент от светлого к темному

### Кнопка уровня (level_button_bg.png)
- Ярко-зеленый цвет (#66BB6A)
- Квадратная форма
- Тень для глубины
- Закругленные углы (borderRadius: 12)

### Кнопка уровня 10 (level_10_button_bg.png)
- Золотой цвет (#FFD700)
- Темная рамка (#333)
- Квадратная форма
- Тень для глубины
- Закругленные углы (borderRadius: 12)

## Fallback

Если изображения не найдены, компонент ButtonWithBackground автоматически использует:
- Золотой фон (#FFD700) для основной кнопки
- Стандартные цвета для кнопок уровней

## Тестирование

После добавления изображений:
1. Запустите приложение
2. Проверьте все экраны
3. Убедитесь, что кнопки отображаются корректно
4. Проверьте адаптивность на разных размерах экранов

