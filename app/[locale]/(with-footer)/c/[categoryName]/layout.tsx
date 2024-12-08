export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className='flex-y-center mx-auto w-full max-w-pc px-3'>{children}</div>;
}
