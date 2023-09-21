
import cron from "node-cron";
const redisService = async () => {
cron.schedule("*/30 * * * * *", function () {
// value.then(function (result) {
//     console.log(result) // "Some User token"
//   })
  console.log("---------------------");
  console.log("running a task every 30 seconds");
});
}
export default redisService
