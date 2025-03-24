import path from 'path';

export default ({
  env,
}: {
  env: {
    (key: string, defaultValue?: any): any;
    bool: (key: string, defaultValue?: boolean) => boolean;
  };
}) => {
  const client = env('DATABASE_CLIENT', 'sqlite') as 'sqlite' | 'postgres'; // 明确client类型
  
  const connections: Record<'sqlite' | 'postgres', any> = { // 让TS知道connections 只接受这两个值
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    postgres: {
      client: 'pg',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', ''),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  };

  return {
    connection: connections[client], 
  };
};
