export function createMockedRepository<T extends object>(methods: (keyof T)[]): jest.Mocked<T> {
    const repo: Partial<Record<keyof T, jest.Mock>> = {};
  
    methods.forEach((method) => {
      repo[method] = jest.fn();
    });
  
    return repo as jest.Mocked<T>;
  }