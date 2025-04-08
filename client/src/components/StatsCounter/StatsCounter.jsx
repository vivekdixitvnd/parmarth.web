// components/StatsCounter/StatsCounter.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './StatsCounter.module.css';

const StatsCounter = ({ end, title, description }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, hasAnimated]);

  // Split description by newlines and create paragraphs
  const descriptionLines = description.split('\n').filter(line => line.trim() !== '');

  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.statNumber}>{count}+</div>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statDescription}>
        {descriptionLines.map((line, index) => (
          <p key={index} className={styles.descriptionLine}>{line}</p>
        ))}
      </div>
    </div>
  );
};

import { useState, useEffect, useRef } from 'react';

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return [count, ref];
};

export default StatsCounter;