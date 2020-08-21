import UserController from './useCases/userController';
import UserRepository from './repositories/user';

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

export default {
  user: userController,
};

// 启动用户域的服务
// 启动服务检查
// 初始化的动作
// 初始化缓存数据
