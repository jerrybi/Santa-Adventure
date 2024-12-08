import Footer from '@/components/home/Footer';
import DecoratedContainer from '@/components/home/DecoratedContainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DecoratedContainer>
      <main className='mx-auto flex w-full flex-1'>{children}</main>
      <Footer />
    </DecoratedContainer>
  );
}
