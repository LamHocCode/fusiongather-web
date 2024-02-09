export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <div className="min-h-screen h-full flex justify-center py-4 sm:px-0 px-4">
                <div className="my-auto sm:mx-auto w-full sm:w-[496px]">
                    <div className="bg-secondary shadow rounded-lg p-4 md:p-[50px]">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}