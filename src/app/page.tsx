'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';
import { ArrowUp, Bot, CircleStop, User } from 'lucide-react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <h1 className='text-3xl'>OpenAI-Practice</h1>
      <div className='mt-10 flex min-w-[800px] flex-col'>
        <div className='container rounded-md bg-secondary'>
          {messages.map((message, i) => (
            <div key={i} className='flex items-center gap-x-2 p-2'>
              <div className='aspect-square rounded-md bg-blue-200 p-2'>
                {message.role === 'user' ? <User /> : <Bot />}
              </div>
              <div>
                <p className='text-xl'>{message.role}</p>
                <p>{message.content.replace(/\n/g, '<br />')}</p>
              </div>
            </div>
          ))}
        </div>
        <form className='mt-4 flex w-full' onSubmit={handleSubmit}>
          <Input
            className='rounded-r-none focus-visible:ring-1'
            value={input}
            onChange={handleInputChange}
          />
          {isLoading ? (
            <Button
              className='rounded-l-none'
              onClick={(e) => {
                e.preventDefault();
                stop();
              }}
            >
              <CircleStop />
            </Button>
          ) : (
            <Button className='rounded-l-none' disabled={!input}>
              <ArrowUp />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
