import {getFullDictionary} from "@/dictionaries";
import {Locale} from "@/i18n-config";

export default async function SoftPage({
    params,
}: {
    params: Promise<{ lang: Locale }>
}) {
    const {lang} = await params;
    const dict = await getFullDictionary(lang);

    // Access comprehensive locale data
    const {soft} = dict.locale;

    return (
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">
                    {soft?.solutions?.title || "3D Solutions"}
                </h1>

                <div className="prose dark:prose-invert mb-12">
                    <p className="text-lg leading-relaxed">
                        {soft?.solutions?.description}
                    </p>
                </div>

                {/* TeamViewer Frontline Section */}
                {soft?.teamViewerFrontline && (
                    <section className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">TeamViewer Frontline</h2>
                        <p className="leading-relaxed">{soft.teamViewerFrontline}</p>
                    </section>
                )}

                {/* xPick Product */}
                {soft?.xPick && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">xPick</h2>

                        {soft.xPick.resume && (
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-lg font-medium">{soft.xPick.resume}</p>
                            </div>
                        )}

                        {soft.xPick.modal?.general && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-3">Overview</h3>
                                <p className="leading-relaxed">{soft.xPick.modal.general}</p>
                            </div>
                        )}

                        {/* Display advantages, use cases, and benefits */}
                        {soft.xPick.modal?.advantages && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    {soft.xPick.modal.keys?.find((k) => k.key === 'advantages')?.title || 'Advantages'}
                                </h3>
                                <ul className="list-disc list-inside space-y-3">
                                    {soft.xPick.modal.advantages.map((advantage, index) => (
                                        <li key={index} className="leading-relaxed">{advantage}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {soft.xPick.modal?.useCases && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    {soft.xPick.modal.keys?.find((k) => k.key === 'useCases')?.title || 'Use Cases'}
                                </h3>
                                <ul className="list-disc list-inside space-y-3">
                                    {soft.xPick.modal.useCases.map((useCase, index) => (
                                        <li key={index} className="leading-relaxed">{useCase}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {soft.xPick.modal?.benefits && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    {soft.xPick.modal.keys?.find((k) => k.key === 'benefits')?.title || 'Benefits'}
                                </h3>
                                <ul className="list-disc list-inside space-y-3">
                                    {soft.xPick.modal.benefits.map((benefit, index) => (
                                        <li key={index} className="leading-relaxed">{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {soft.xPick.modal?.integration && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Integration</h3>
                                <p className="leading-relaxed">{soft.xPick.modal.integration}</p>
                            </div>
                        )}

                        {soft.xPick.modal?.summary && (
                            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Summary</h3>
                                <p className="leading-relaxed">{soft.xPick.modal.summary}</p>
                            </div>
                        )}
                    </section>
                )}

                {/* xMake Product */}
                {soft?.xMake && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">xMake</h2>

                        {soft.xMake.resume && (
                            <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <p className="text-lg font-medium">{soft.xMake.resume}</p>
                            </div>
                        )}

                        {soft.xMake.modal?.general && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-3">Overview</h3>
                                <p className="leading-relaxed">{soft.xMake.modal.general}</p>
                            </div>
                        )}
                    </section>
                )}

                {/* Navigation links */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <a
                        href={`/${lang}/`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        ← {dict.home.goToNextjs.replace('nextjs.org', 'Home')}
                    </a>
                </div>
            </main>
        </div>
    );
}
