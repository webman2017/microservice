
import { createClient } from 'redis';
const redisService = async () => {
const client = createClient({
    username: 'default',
    password: 'dtzUrw7ttOlE9uUrALENgAqdgcTe2zcw', 
    url: 'redis://redis-10365.c273.us-east-1-2.ec2.cloud.redislabs.com:10365'
  });
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.connect();
  client.set('cacheRedis', JSON.stringify('test'));
  client.setEx('cacheRedis', 10, JSON.stringify('trest')); //
  const value = client.get('cacheRedis');
  console.log(value)
// client.disconnect();
}
export default redisService;