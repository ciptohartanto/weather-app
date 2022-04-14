import { useMemo } from 'react';

const Typography = ({ styleType, text }) => {
  // 1. h1, title -> 40px
  // 2. h2, subtitle -> 24px
  // 3. h3, caption -> 18px
  // 4. h4, subcaption -> 14px
  // 5. h5, text -> 12px
  const typoUI = useMemo(() => {
    if (styleType === 'h1') return <h1>{text}</h1>;
    return <h5>{text}</h5>;
  }, [styleType]);
  // styles:

  return typoUI;
};

export default Typography;
