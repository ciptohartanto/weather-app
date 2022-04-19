import { useMemo } from 'react';

import '../styles/typography.css';

export const TYPOGRAPHY_STYLES = {
  SUBTITLE: 'subtitle',
  TITLE: 'title',
  CAPTION: 'caption',
  SUBCAPTION: 'subcaption',
  TEXT: 'text',
};

const Typography = ({ styleType, text }) => {
  // 1. h1, title -> 40px
  // 2. h2, subtitle -> 24px
  // 3. h3, caption -> 18px
  // 4. h4, subcaption -> 14px
  // 5. h5, text -> 12px
  const typoUI = useMemo(() => {
    switch (styleType) {
      case TYPOGRAPHY_STYLES.TITLE:
        return <h1 className="typography typography--title">{text}</h1>;

      case TYPOGRAPHY_STYLES.SUBTITLE:
        return <h2 className="typography typography--subtitle">{text}</h2>;

      case TYPOGRAPHY_STYLES.CAPTION:
        return <h3 className="typography typography--caption">{text}</h3>;

      case TYPOGRAPHY_STYLES.SUBCAPTION:
        return <h4 className="typography typography--subcaption">{text}</h4>;

      default:
        return <h5 className="typography typography--text">{text}</h5>;
    }
  }, [styleType]);

  return typoUI;
};

export default Typography;
