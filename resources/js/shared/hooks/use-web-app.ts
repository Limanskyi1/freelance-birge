import WebApp from '@twa-dev/sdk';

export const useWebApp = () => {
    const data = WebApp.initDataUnsafe;
    const user = data.user
        ? {
              telegram_id: data.user.id,
              username: data.user.username,
          }
        : {
              telegram_id: '525234234',
              username: 'Misha',
          };
    return {
        user,
    };
};
