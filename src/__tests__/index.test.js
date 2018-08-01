import MyModuleName from './../index';

/* global test */

test('Outputs hello world!', () => {
  const spy = jest.spyOn(console, 'log');

  MyModuleName.sayHelloWorld();
  expect(spy).toHaveBeenCalled();

  spy.mockRestore();
});