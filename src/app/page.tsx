'use client';
import ToggleTheme from '@/components/toggletheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { ArrowUp, Bot, CircleStop, User } from 'lucide-react';
import markdownit from 'markdown-it';

const md = markdownit({
  html: true,
  linkify: true,
  langPrefix: 'language-',
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return `<pre><code class='hljs'>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: '```python\nprint("Hello, World!")\n```',
      },
    ],
  });

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <h1 className='text-3xl'>OpenAI-Practice</h1>
      <p className='mt-1 text-lg text-muted-foreground'>Type something to get started.</p>
      <ToggleTheme />
      <div className='mx-auto my-10 flex min-w-[400px] max-w-full flex-col'>
        <div className='rounded-md bg-secondary'>
          {messages.map((message, i) => (
            <div key={i} className='flex gap-x-2 p-2'>
              <div
                className={cn(
                  'aspect-square rounded-md p-2 text-white h-full mt-1',
                  message.role === 'user' ? 'bg-slate-600' : 'bg-green-600',
                )}
              >
                {message.role === 'user' ? <User /> : <Bot />}
              </div>
              <div className='flex-1'>
                <p className='text-xl'>{message.role}</p>
                <div
                  className='markdown-body mt-1'
                  dangerouslySetInnerHTML={{ __html: md.render(message.content) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        className='fixed bottom-0 z-50 mt-4 flex w-2/3 rounded-md rounded-b-none border border-border p-3'
        onSubmit={handleSubmit}
      >
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
  );
}
