# ButtonWithBackground Component Guide

## Описание

Универсальный компонент кнопки с фоновым изображением, который автоматически подстраивает ширину под текст.

## Использование

```tsx
import ButtonWithBackground from '../components/ButtonWithBackground';

<ButtonWithBackground
  text="BUTTON TEXT"
  onPress={() => console.log('Button pressed')}
  imagePath="path/to/button_bg.png"
  width="auto" // или конкретное значение
  height={50}
  textColor="#000"
  fontSize={18}
  fontWeight="bold"
  borderRadius={15}
  disabled={false}
  style={customStyles}
/>
```

## Параметры

### Обязательные
- `text: string` - Текст кнопки
- `onPress: () => void` - Функция при нажатии

### Опциональные
- `imagePath?: string` - Путь к фоновому изображению
- `width?: number | string` - Ширина кнопки ('auto' для автоматической)
- `height?: number` - Высота кнопки (по умолчанию 50)
- `textColor?: string` - Цвет текста (по умолчанию '#333')
- `fontSize?: number` - Размер шрифта (по умолчанию 16)
- `fontWeight?: string` - Жирность шрифта (по умолчанию 'bold')
- `borderRadius?: number` - Радиус скругления (по умолчанию 15)
- `disabled?: boolean` - Отключена ли кнопка (по умолчанию false)
- `style?: any` - Дополнительные стили

## Автоматическая ширина

Когда `width="auto"`, компонент автоматически рассчитывает ширину на основе:
- Длины текста
- Размера шрифта
- Минимальной ширины (120px)

Формула: `Math.max(text.length * (fontSize * 0.6) + 40, 120)`

## Примеры использования

### Кнопка с автоматической шириной
```tsx
<ButtonWithBackground
  text="NEXT"
  onPress={nextPanel}
  imagePath="path/to/button_bg.png"
  width="auto"
  height={50}
/>
```

### Кнопка на всю ширину
```tsx
<ButtonWithBackground
  text="START LEVEL 1"
  onPress={startLevel}
  imagePath="path/to/button_bg.png"
  width="100%"
  height={50}
/>
```

### Кнопка с кастомными стилями
```tsx
<ButtonWithBackground
  text="CUSTOM BUTTON"
  onPress={handlePress}
  imagePath="path/to/button_bg.png"
  width={200}
  height={60}
  textColor="#FFFFFF"
  fontSize={20}
  fontWeight="bold"
  borderRadius={20}
  style={{ marginTop: 20 }}
/>
```

## Fallback

Если `imagePath` не указан или изображение не найдено, кнопка отобразится с золотым фоном (#FFD700).

## Тени и эффекты

Компонент автоматически добавляет:
- Тень для кнопки
- Тень для текста
- Эффект нажатия (activeOpacity: 0.8)

## Где используется

- ✅ MainMenuScreen - все навигационные кнопки
- ✅ LevelsScreen - кнопка "START LEVEL"
- ✅ OnboardingScreen - кнопка "NEXT"
- ⏳ GameScreen - кнопки ответов
- ⏳ BullRushScreen - кнопки ответов
- ⏳ GameOverScreen - кнопки действий
- ⏳ BullRushSuccessScreen - кнопки действий
- ⏳ StatisticsScreen - кнопки навигации
- ⏳ ShareAppScreen - кнопки действий

## Добавление изображения

1. Поместите изображение кнопки в папку `assets/`
2. Обновите `imagePath` в компонентах:
   ```tsx
   imagePath="path/to/your/button_image.png"
   ```

## Рекомендации по изображению

- Формат: PNG (для прозрачности) или JPG
- Разрешение: достаточно высокое для четкости
- Стиль: должен соответствовать дизайну игры
- Размер: будет растягиваться под размер кнопки

