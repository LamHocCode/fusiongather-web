import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <div className="text-lg mb-4">
        The page you are looking for might have been removed or is temporarily unavailable.
      </div>
      <Link href="/">
        <div className="text-blue-500 hover:underline">Go back to Home</div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
