// components/UnauthorizedPage.js

import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <div className="text-lg mb-4">
        You are not authorized to access this page.
        <span className="inline-block">
          <Link href="/">
            <div className="text-blue-500 hover:underline">Back to HomePage</div>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
