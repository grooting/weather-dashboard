import sunny from "./sun.gif";
import styles from "./City.module.css";

// all weather icons are from https://www.flaticon.com/
export function City() {
  return (
    <div>
      <img src={sunny} alt="weather" className={styles.weatherIcon} />
    </div>
  );
}
