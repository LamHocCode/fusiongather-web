

export default function DisplayMap({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="shadow rounded-lg md:p-[25px]">
                {children}
              </div>
          </div>
        </div>
    </main>
  );
}
