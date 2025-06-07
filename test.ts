function d(value: undefined, context: ClassFieldDecoratorContext) {
  console.log(context.name);
}
class A {
  @d
  public prop1: string = '';

  @d
  public prop2: string = '';
}
