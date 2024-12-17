class User {
  constructor() {}
}

function ConstructorProxy(Class, ...propNames) {
  return new Proxy(Class, {
    construct(target, argumentsList) {
      const obj = Reflect.construct(target, argumentsList);
      propNames.forEach((name, i) => {
        obj[name] = argumentsList[i];
      });
      return obj;
    },
  });
}

const UserProxy = ConstructorProxy(User, 'firstName', 'lastName', 'age');

const user = new UserProxy('张', '三', 18);

console.log(user);
