export default ({ env }) => ({
    app: {
      keys: env.array('APP_KEYS'),
    },
  });
  