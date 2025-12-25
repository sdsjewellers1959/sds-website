import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';

const Care = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Jewelry Care Guide"
                description="Expert tips on how to clean and maintain your sterling silver jewelry. Keep your SDS treasures shining for a lifetime."
            />
            <div className="bg-website-primary text-white py-16 text-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Jewelry Care</h1>
                    <p className="text-gray-400">Preserving the brilliance of your silver treasures.</p>
                </FadeIn>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <FadeIn>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-website-primary">Daily Wear Tips</h2>
                        <ul className="space-y-4 text-gray-600 list-disc pl-5">
                            <li>Apply perfume, lotion, and hairspray before putting on your jewelry.</li>
                            <li>Remove jewelry before swimming, bathing, or exercising.</li>
                            <li>Avoid contact with household chemicals and harsh detergents.</li>
                            <li>Store each piece separately to prevent scratching.</li>
                        </ul>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-website-primary">Cleaning Guide</h2>
                        <p className="text-gray-600 mb-4">
                            Silver naturally tarnishes over time, but regular cleaning keeps it shining like new.
                        </p>
                        <ul className="space-y-4 text-gray-600 list-disc pl-5">
                            <li>Use a soft, lint-free cloth (like a microfiber jewelry cloth) for regular polishing.</li>
                            <li>For deeper cleaning, use mild soap and warm water with a soft-bristled toothbrush.</li>
                            <li>Dry thoroughly with a soft cloth before storing.</li>
                            <li>Avoid abrasive cleaners or silver dips unless specified for jewelry.</li>
                        </ul>
                    </FadeIn>
                </div>

                <FadeIn delay={0.4} className="mt-20 bg-gray-50 p-10 rounded-sm">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-center">Long-Term Storage</h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto">
                        Store your silver in a cool, dry place. Using airtight bags or anti-tarnish strips can significantly slow down the oxidation process and keep your pieces bright for years to come.
                    </p>
                </FadeIn>
            </div>
        </div>
    );
};

export default Care;
