import { useMemo, useState } from 'react';

import '../styles/typography.css';

// 1. h1, title -> 50px
// 2. h2, subtitle -> 44px
// 3. h3, caption -> 35px
// 4. h4, subcaption -> 24px
// 5. h5, text -> 18px
// 6. span, pown -> 14px
export const TYPOGRAPHY_STYLES = {
  SUBTITLE: 'h1',
  TITLE: 'h2',
  CAPTION: 'h3',
  SUBCAPTION: 'h4',
  TEXT: 'h5',
  PAWN: 'span',
};

// 1. italic
// 2. bold

export const TYPOGRAPHY_ACCENTS = {
  ITALIC: 'italic',
  BOLD: 'bold',
};

const Typography = ({ styleType, text, accent }) => {
  const [cssClasses, setCssClasses] = useState(['typography']);

  const updateAccentCSS = () => {
    if (!accent) return;
    switch (accent) {
      case TYPOGRAPHY_ACCENTS.BOLD:
        setCssClasses(cssClasses.push('typography--bold'));
        break;
      case TYPOGRAPHY_ACCENTS.ITALIC:
        setCssClasses(cssClasses.push('typography--italic'));
        break;
      default:
    }
  };

  const updateStyleCSS = () => {
    switch (styleType) {
      case TYPOGRAPHY_STYLES.TITLE:
        setCssClasses(cssClasses.push('typography--title'));
        break;
      case TYPOGRAPHY_STYLES.SUBTITLE:
        setCssClasses(cssClasses.push('typography--subtitle'));
        break;

      case TYPOGRAPHY_STYLES.CAPTION:
        setCssClasses(cssClasses.push('typography--caption'));
        break;

      case TYPOGRAPHY_STYLES.SUBCAPTION:
        setCssClasses(cssClasses.push('typography--subcaption'));
        break;
      case TYPOGRAPHY_STYLES.PAWN:
        setCssClasses(cssClasses.push('typography--pawn'));
        break;
      default:
        setCssClasses(cssClasses.push('typography--text'));
    }
  };

  const typoUI = useMemo(() => {
    updateAccentCSS();
    updateStyleCSS();

    const TheTag = styleType;

    return <TheTag className={cssClasses.join(' ')}>{text}</TheTag>;
  }, []);

  return typoUI;
};

export default Typography;
