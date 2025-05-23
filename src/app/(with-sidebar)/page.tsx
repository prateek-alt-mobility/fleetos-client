'use client';
import { useFetchUserPermissionsQuery } from '@/store/api/v1/modules/auth.api';
import Image from 'next/image';
import { useEffect } from 'react';

const Home = () => {
  const { data, isLoading, error } = useFetchUserPermissionsQuery({});
  useEffect(() => {
    // fetch('https://fleetos-dev-api.alt-mobility.com/v1/rolePerms.getUserPerms?input=%7B%7D', {
    //   headers: {
    //     accept: '*/*',
    //     'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    //     authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNlc3Npb25JZCI6IjgzOWNhZGUyLTIwZWQtNGY2Zi1iYmRlLWM3NDk4YzA5M2MxM3N1cGVyYWRtaW5AYWx0LW1vYmlsaXR5LmNvbSIsInBob25lTm8iOiJmODA3MDljOTY2NWMyMWUzOTZiZmVlMTQwMDhmN2UyMCIsImVtYWlsIjoic3VwZXJhZG1pbkBhbHQtbW9iaWxpdHkuY29tIiwiYWNjZXNzVHlwZSI6MSwiaWF0IjoxNzQ4MDA4NjYxLCJleHAiOjE3NDg2MTM0NjF9.gVcHFq-JF-x15GITv92RKJwokxmvAH3rOjTyx-028Vo',
    //     'content-type': 'application/json',
    //     'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    //     'sec-ch-ua-mobile': '?0',
    //     'sec-ch-ua-platform': '"macOS"',
    //     'sec-fetch-dest': 'empty',
    //     'sec-fetch-mode': 'cors',
    //     'sec-fetch-site': 'same-site',
    //   },
    //   referrer: 'https://fleetos-dev-ui.alt-mobility.com/',
    //   referrerPolicy: 'strict-origin-when-cross-origin',
    //   body: null,
    //   method: 'GET',
    //   mode: 'cors',
    //   credentials: 'include',
    // });
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default Home;
