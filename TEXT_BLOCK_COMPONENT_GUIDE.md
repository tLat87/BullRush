# TextBlockWithBackground Component Guide

## Описание

Универсальный компонент для текстовых блоков с фоновым изображением, который автоматически подстраивает размер под содержимое.

## Использование

```tsx
import TextBlockWithBackground from '../components/TextBlockWithBackground';

<TextBlockWithBackground
  imagePath="path/to/button_bg.png"
  width="100%"
  padding={20}
  textColor="#000"
  fontSize={16}
  fontWeight="normal"
  textAlign="center"
  backgroundColor="#FFD700"
  style={customStyles}
>
  <Text>Your text content here</Text>
</TextBlockWithBackground>
```

## Параметры

### Обязательные
- `children: React.ReactNode` - Содержимое блока (обычно Text компоненты)

### Опциональные
- `imagePath?: string` - Путь к фоновому изображению
- `width?: number | string` - Ширина блока (по умолчанию '100%')
- `height?: number | string` - Высота блока (по умолчанию 'auto')
- `padding?: number` - Внутренние отступы (по умолчанию 15)
- `margin?: number` - Внешние отступы (по умолчанию 0)
- `marginTop?: number` - Верхний отступ
- `marginBottom?: number` - Нижний отступ
- `marginLeft?: number` - Левый отступ
- `marginRight?: number` - Правый отступ
- `borderRadius?: number` - Радиус скругления (по умолчанию 15)
- `textColor?: string` - Цвет текста (по умолчанию '#333')
- `fontSize?: number` - Размер шрифта (по умолчанию 16)
- `fontWeight?: string` - Жирность шрифта (по умолчанию 'normal')
- `textAlign?: string` - Выравнивание текста (по умолчанию 'center')
- `backgroundColor?: string` - Цвет фона fallback (по умолчанию '#D7AA51')
- `disabled?: boolean` - Отключен ли блок (по умолчанию false)
- `style?: any` - Дополнительные стили

## Примеры использования

### Блок с заголовком и описанием
```tsx
<TextBlockWithBackground
  imagePath="path/to/button_bg.png"
  width="100%"
  padding={20}
  textColor="#000"
  fontSize={16}
  fontWeight="normal"
  textAlign="center"
  backgroundColor="#D7AA51"
  style={styles.descriptionBox}
>
  <Text style={styles.titleText}>Заголовок</Text>
  {'\n\n'}
  <Text style={styles.descriptionText}>Описание текста</Text>
</TextBlockWithBackground>
```

### Блок с результатами игры
```tsx
<TextBlockWithBackground
  imagePath="path/to/button_bg.png"
  width="100%"
  padding={20}
  textColor="#000"
  fontSize={18}
  fontWeight="bold"
  textAlign="center"
  backgroundColor="#FFD700"
  style={styles.resultContainer}
>
  <Text style={styles.resultTitle}>Поздравляем!</Text>
  {'\n\n'}
  <Text style={styles.scoreText}>Счет: 1000</Text>
  {'\n\n'}
  <Text style={styles.resultMessage}>Отличная работа!</Text>
</TextBlockWithBackground>
```

### Блок с автоматической шириной
```tsx
<TextBlockWithBackground
  imagePath="path/to/button_bg.png"
  width="auto"
  padding={15}
  textColor="#000"
  fontSize={18}
  fontWeight="bold"
  textAlign="center"
  backgroundColor="#FFD700"
  style={styles.scoreContainer}
>
  Счет: 500
</TextBlockWithBackground>
```

## Где используется

- ✅ **OnboardingScreen** - блоки описания панелей
- ✅ **GameScreen** - блок "Word to guess" и счет
- ✅ **GameOverScreen** - блок с результатами игры
- ✅ **StatisticsScreen** - блок со статистикой
- ✅ **ShareAppScreen** - блок предварительного просмотра сообщения

## Fallback

Если `imagePath` не указан или изображение не найдено, блок отобразится с указанным `backgroundColor`.

## Тени и эффекты

Компонент автоматически добавляет:
- Тень для блока
- Тень для текста
- Эффекты глубины

## Рекомендации по использованию

### Для заголовков
- `fontSize: 18-24`
- `fontWeight: 'bold'`
- `textAlign: 'center'`

### Для описаний
- `fontSize: 14-16`
- `fontWeight: 'normal'`
- `textAlign: 'center'`

### Для результатов
- `fontSize: 16-18`
- `fontWeight: 'bold'`
- `textAlign: 'center'`

### Цветовые схемы
- **Золотой**: `backgroundColor: '#FFD700'`, `textColor: '#000'`
- **Пергамент**: `backgroundColor: '#D7AA51'`, `textColor: '#333'`
- **Белый**: `backgroundColor: '#FFFFFF'`, `textColor: '#000'`

## Структура файлов

- `src/components/TextBlockWithBackground.tsx` - основной компонент
- `TEXT_BLOCK_COMPONENT_GUIDE.md` - это руководство

## Обновление существующих экранов

Все экраны уже обновлены для использования `TextBlockWithBackground`:

1. **OnboardingScreen** - блоки описания панелей
2. **GameScreen** - блок "Word to guess" и счет
3. **GameOverScreen** - блок с результатами игры
4. **StatisticsScreen** - блок со статистикой
5. **ShareAppScreen** - блок предварительного просмотра

Теперь все текстовые блоки в приложении имеют единообразный дизайн с фоновыми изображениями! 🎯✨

