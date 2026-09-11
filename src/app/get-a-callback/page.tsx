import Header from '@/components/Header';
import CallbackForm from './_components/CallbackForm';
import CallbackTestimonials from './_components/CallbackTestimonials';

export default function GetACallbackPage() {
  return (
    <div className="min-h-dvh bg-[#F8F9FA]">
      <Header />
      <main className="pt-20">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
          <div id="callback-form" className="mx-auto max-w-3xl scroll-mt-28">
            <CallbackForm />
          </div>

          <CallbackTestimonials />
        </div>
      </main>
    </div>
  );
}
