import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-5QSFK378CD';

export const initGA = () => {
  console.log('Attempting to initialize GA...');
  try {
    ReactGA.initialize(MEASUREMENT_ID, {
      debug: true,
      testMode: process.env.NODE_ENV === 'development'
    });
    console.log('✅ GA successfully initialized with ID:', MEASUREMENT_ID);
  } catch (error) {
    console.error('❌ Failed to initialize GA:', error);
  }
};

export const logPageView = () => {
  console.log('Attempting to log page view...');
  try {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search
    });
    console.log('✅ Page view logged:', window.location.pathname);
  } catch (error) {
    console.error('❌ Failed to log page view:', error);
  }
};

export const logEvent = (category, action, label) => {
  console.log('Attempting to log event...');
  try {
    ReactGA.event({
      category,
      action,
      label
    });
    console.log('✅ Event logged:', { category, action, label });
  } catch (error) {
    console.error('❌ Failed to log event:', error);
  }
};