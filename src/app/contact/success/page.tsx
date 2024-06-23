// @/app/contact/success
// Success page for the contact form.

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Thank You!
      </h1>
      <p className="text-lg mt-5 md:pl-8 text-center md:text-left max-w-2xl">
        Your message has been sent successfully. We will get back to you soon.
      </p>
      <a
        href="/"
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default SuccessPage;
