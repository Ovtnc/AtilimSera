# Assets Klasörü

Bu klasör projenin statik dosyalarını içerir.

## Klasör Yapısı

- **`images/`** - Görsel dosyalar (JPG, PNG, SVG, WebP)
- **`icons/`** - İkon dosyaları (SVG, ICO)
- **`logos/`** - Logo dosyaları (SVG, PNG)

## Kullanım

```javascript
// Örnek kullanım
import logo from '../assets/logos/logo.svg';
import heroImage from '../assets/images/hero-bg.jpg';
import icon from '../assets/icons/menu.svg';
```

## Dosya Türleri

- **Görseller**: JPG, PNG, SVG, WebP
- **İkonlar**: SVG, ICO
- **Logolar**: SVG, PNG (şeffaf arka plan önerilir)

## Optimizasyon

- Görseller optimize edilmiş boyutlarda olmalıdır
- SVG dosyaları tercih edilmelidir (ölçeklenebilir)
- WebP formatı modern tarayıcılar için kullanılabilir
