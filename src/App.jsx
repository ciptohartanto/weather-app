import Typography, { TYPOGRAPHY_STYLES } from './components/Typography';

function App() {
  return (
    <div className="wrapper">
      <div className="app-top">
        <div className="app-text__fulldate">
          <Typography
            styleType={TYPOGRAPHY_STYLES.SUBCAPTION}
            text="Monday, 27th April"
          />
        </div>
        <div className="app-text__time">
          <Typography styleType={TYPOGRAPHY_STYLES.CAPTION} text="6:27am" />
        </div>
        <div className="app-text__city">
          <Typography styleType={TYPOGRAPHY_STYLES.SUBCAPTION} text="London" />
        </div>
      </div>
      <div className="app-middle">
        <div className="app-text__fulldate">{/* weather icon */}</div>
        <div className="app-text__temp">
          <Typography styleType={TYPOGRAPHY_STYLES.CAPTION} text="10*" />
        </div>
      </div>
      <div className="app-bottom">
        <div className="app-text__date">{/* weather icon */}</div>
        <div className="app-text__temp">
          <Typography styleType={TYPOGRAPHY_STYLES.CAPTION} text="10*" />
        </div>
      </div>
    </div>
  );
}

export default App;
