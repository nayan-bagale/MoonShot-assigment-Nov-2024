import EmailBodyCard from './component/EmailBodyCard';
import EmailFilters from './component/EmailFilters';
import EmailShortCard from './component/EmailShortCards';
import { useEmail } from './context/EmailContextAPI';
import { cn } from './lib/utils';
function App() {
  const { selectedEmail } = useEmail()
  return (
    <main className=' bg-Background text-Text p-6 py-20 lg:p-20 min-h-screen transition-all'>
      <header className=' z-10 pt-6 pb-1 bg-Background w-full fixed top-0 flex gap-2 md:gap-6'>
        <EmailFilters />
      </header>
      <div className='relative'>
        {selectedEmail && <EmailBodyCard />}
        <div className={cn('flex flex-col gap-3 ', selectedEmail ? ' w-full lg:w-[32rem]' : ' ')}>
          <EmailShortCard />
        </div>
      </div>
      {/* <footer className=' bottom-0 z-10 bg-Background w-full fixed flex gap-2 md:gap-6'>
        <Pagination/>
      </footer> */}
    </main>
  )
}

export default App
