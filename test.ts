class Dog {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run() {
    console.log(this.name + "在跑");
  }
  static eat() {
    console.log("dog在吃");
  }
}

Dog.eat();

const dog = new Dog("wangwang");
dog.run();