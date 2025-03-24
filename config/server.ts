export default ({
  env,
}: {
  env: {
    (key: string, defaultValue?: any): any;
    int: (key: string, defaultValue?: number) => number;
    array: (key: string) => string[];
  };
}) => ({
  host: env('HOST', '0.0.0.0'), // 解析字符串值
  port: env.int('PORT', 1337),  // 解析整数值
  app: {
    keys: env.array('APP_KEYS'), // 解析数组
  },
});
