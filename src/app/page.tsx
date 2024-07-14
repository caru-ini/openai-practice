import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OpenAI from 'openai';

export default async function Home() {
  const client = new OpenAI();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <h1 className='text-3xl'>OpenAI-Practice</h1>
      <div className='mt-4 flex'>
        <Input className='rounded-r-none' />
        <Button className='rounded-l-none'>Send</Button>
      </div>
      <div className='w-full rounded-md bg-secondary'>
        <p>Response</p>
        {
          (
            await client.chat.completions.create({
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: 'You are a helpful assistant.',
                },
                {
                  role: 'user',
                  content: 'こんにちは',
                },
              ],
            })
          ).choices[0].message.content
        }
      </div>
    </div>
  );
}
