export function StatusFlow() {
    const statuses = ["Pending", "In Review", "Assigned", "In Progress", "Resolved", "Closed"];

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-10">Issue Status Flow</h2>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {statuses.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow">
                            {index + 1}
                        </div>
                        <p className="mt-2 font-medium text-gray-700">{step}</p>

                        {index < statuses.length - 1 && (
                            <div className="hidden sm:block w-20 h-1 bg-gray-300"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
