import { useMemo } from 'react';

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
    if (styleType === TYPOGRAPHY_STYLES.TITLE) return <h1>{text}</h1>;
    if (styleType === TYPOGRAPHY_STYLES.SUBTITLE) return <h2>{text}</h2>;
    if (styleType === TYPOGRAPHY_STYLES.CAPTION) return <h3>{text}</h3>;
    if (styleType === TYPOGRAPHY_STYLES.SUBCAPTION) return <h4>{text}</h4>;
    return <h5>{text}</h5>;
  }, [styleType]);

  return typoUI;
};

export default Typography;
