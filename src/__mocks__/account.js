import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import mock from 'src/utils/mock';
import wait from 'src/utils/wait';

const JWT_SECRET = 'perez_talleres';
const JWT_EXPIRES_IN = '1 day';

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/images/avatars/avatar_1.png',
    canHire: false,
    country: 'Argentina',
    email: 'usuario1@gmail.com',
    isPublic: true,
    name: 'Leandro Diaz',
    password: '123456',
    phone: '+54 9 2615485621',
    role: 'admin',
    state: 'Mendoza'
  }
];

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    await wait(1000);

    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'Please check your email and password' }];
    }

    if (user.password !== password) {
      return [400, { message: 'Invalid password' }];
    }

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/account/me').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
