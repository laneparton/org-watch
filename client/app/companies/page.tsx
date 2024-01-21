import { CompanyCard } from '@/components/company-card';
import PocketBase from 'pocketbase';

export default async function Home() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    // you can also fetch all records at once via getFullList
    const companies = await pb.collection('companies').getFullList({
        sort: '-created',
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl mb-12">Companies</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6">
                {companies.map(company => (
                    <CompanyCard key={company.name} {...company} />
                ))}
            </section>
        </main>
    )
}