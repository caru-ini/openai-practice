'use client';
import ToggleTheme from '@/components/toggletheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { ArrowUp, Bot, CircleStop, NotebookPen, PenLine, Terminal, User } from 'lucide-react';
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

const ideas = [
  {
    title: 'Create My Own Website',
    prompt: 'Please help me create a website for my portfolio.',
    icon: <Terminal />,
  },
  {
    title: 'Create a Blog Article',
    prompt: 'Can you help me write a blog article on the benefits of exercise?',
    icon: <PenLine />,
  },
  {
    title: 'Create a Short Story',
    prompt: 'Can you help me write a short story about a detective solving a crime?',
    icon: <NotebookPen />,
  },
  {
    title: 'Create a Poem',
    prompt: 'Can you help me write a poem about love and loss?',
    icon: <PenLine />,
  },
];

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setInput } = useChat();

  return (
    <div className='flex min-h-screen flex-col items-center py-2'>
      <div className='flex w-full items-center justify-start gap-3 p-5'>
        <h2 className='text-xl'>Hello</h2>
        <ToggleTheme />
      </div>
      {!messages.length && (
        <div id='welcome' className='fixed top-[45svh] z-10 grid gap-y-3'>
          <div id='motd' className='rounded-md bg-secondary p-3'>
            <h1 className='text-3xl'>OpenAI-Practice</h1>
            <p className='mt-1 text-lg text-muted-foreground'>Type something to get started.</p>
          </div>
          <p className='text-xl text-muted-foreground'>Ideas</p>
          <div className='grid grid-cols-2 gap-2'>
            {ideas.map((idea, i) => (
              <button
                key={i}
                className='flex flex-col gap-x-2 rounded-md border border-border p-3'
                onClick={() => setInput(idea.prompt)}
              >
                <div className='mt-1 h-full rounded-md text-white'>{idea.icon}</div>
                <p className='text-start text-xl'>{idea.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className='mx-auto my-16 flex min-w-[400px] max-w-[800px] flex-col px-2'>
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
                  className='markdown-body mt-1 max-w-[95%]'
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
