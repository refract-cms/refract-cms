export interface CreateAppOptions {
  name: string;
  template: 'blog' | 'default';
}

export function createApp(options: CreateAppOptions) {
  console.log('create using', options);
}
