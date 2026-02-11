import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      <main className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            TopoBol <span className="text-blue-600">Tree</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The institutional platform for managing professional profiles and digital connections.
            Centralized, scalable, and clean.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/admin/dashboard"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/profile/juan-perez"
              className="px-8 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              View Demo Profile
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
              <Link href="/profile/juan-perez" className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  JP
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Juan Pérez</p>
                  <p className="text-sm text-gray-500">Director General</p>
                </div>
              </Link>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-pink-200 transition-colors cursor-pointer group">
              <Link href="/profile/maria-lopez" className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                  ML
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">María López</p>
                  <p className="text-sm text-gray-500">Gerente de Marketing</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
